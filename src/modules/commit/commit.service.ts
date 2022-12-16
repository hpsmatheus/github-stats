import GetCommitParamsDto from '../../typings/commit/get-commit.params.dto';
import GitHubClient from '../../clients/github.client';
import GetCommitResponse from '../../typings/commit/get-commit.response.dto';
import {
  GitHubClientCommit,
  GitHubClientCommitResponse,
} from '../../typings/github-client/github-client-commit.response.dto';
import _ from 'lodash';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CommitService {
  constructor(private readonly gitHubClient: GitHubClient) {}

  public async getCommits(
    params: GetCommitParamsDto,
  ): Promise<GetCommitResponse[]> {
    const commits = await this.gitHubClient.getCommits(params);
    return this.formatCommitsResponse(commits);
  }

  private formatCommitsResponse(
    commits: GitHubClientCommitResponse,
  ): GetCommitResponse[] {
    this.formatCommitDates(commits);
    const response: GetCommitResponse[] = [];

    const groupByUser = _.groupBy(commits.data, 'author.login');
    Object.entries(groupByUser).map((commitsByUser) => {
      const user = commitsByUser[0];
      const userCommits = commitsByUser[1];
      const commitResponse: GetCommitResponse = {
        user,
        commitsByDate: [],
      };

      const groupByDate = _.groupBy(userCommits, 'commit.author.date');
      Object.entries(groupByDate).map((commitsByDate) => {
        const date = commitsByDate[0];
        const userCommitsByDate = commitsByDate[1];

        commitResponse.commitsByDate.push({
          date,
          commits: (userCommitsByDate as GitHubClientCommit[]).map(
            (item) => item.commit.message,
          ),
        });
      });
      response.push(commitResponse);
    });
    return response;
  }

  private formatCommitDates(commits: GitHubClientCommitResponse): void {
    commits.data.map(
      (item) =>
        (item.commit.author.date = item.commit.author.date.split('T')[0]),
    );
  }
}
