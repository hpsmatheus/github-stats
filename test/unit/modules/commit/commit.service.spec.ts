import { mock } from 'jest-mock-extended';
import GitHubClient from '../../../../src/clients/github.client';
import CommitService from '../../../../src/modules/commit/commit.service';
import GetCommitParamsDto from '../../../../src/typings/commit/get-commit.params.dto';
import Constants from '../../../constants';
import { gitHubClientCommitResponseMock } from '../../../mocks/clients/github-client-commit.response.mock';
import { getCommitResponseMock } from '../../../mocks/get-commit.response.mock';

describe('Commit Service', () => {
  const githubClient = mock<GitHubClient>();
  githubClient.getCommits.mockResolvedValueOnce(gitHubClientCommitResponseMock);
  const commitService = new CommitService(githubClient);
  it('should return formatted commits', async () => {
    const params: GetCommitParamsDto = {
      initialDate: Constants.anyDateString,
      finalDate: Constants.anyDateString,
      repoPath: Constants.anyRepoPath,
    };
    const result = await commitService.getCommits(params);
    expect(result).toStrictEqual(getCommitResponseMock);
    expect(githubClient.getCommits).toHaveBeenCalledWith(params);
  });
});
