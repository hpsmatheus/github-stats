import { Injectable } from '@nestjs/common';
import axios from 'axios';
import DateUtil from '../core/util/date.util';
import GetCommitParamsDto from '../typings/commit/get-commit.params.dto';
import { GitHubClientCommitResponse } from '../typings/github-client/github-client-commit.response.dto';
import { authorization } from './github-authorization';
@Injectable()
export default class GitHubClient {
  private get baseUrl(): string {
    return 'https://api.github.com';
  }

  public async getCommits(
    params: GetCommitParamsDto,
  ): Promise<GitHubClientCommitResponse> {
    const commits: GitHubClientCommitResponse = { data: [] };
    let partialResult: GitHubClientCommitResponse;
    let counter = 1;
    const filter = this.buildGetCommitFilter(params);

    do {
      partialResult = (await axios.get(
        `${this.baseUrl}/repos/${params.repoPath}/commits`,
        {
          headers: {
            authorization,
          },
          params: {
            ...filter,
            page: counter++,
          },
        },
      )) as GitHubClientCommitResponse;

      commits.data.push(...partialResult.data);
    } while (partialResult.data.length > 0);

    return commits;
  }

  private buildGetCommitFilter(
    params: GetCommitParamsDto,
  ): Record<string, unknown> {
    return {
      since: DateUtil.toString(params.initialDate),
      until: DateUtil.toString(params.finalDate),
      per_page: 100,
    };
  }
}
