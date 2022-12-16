import GitHubClient from '../../../src/clients/github.client';
import GetCommitParamsDto from '../../../src/typings/commit/get-commit.params.dto';
import Constants from '../../constants';
import axios from 'axios';
import { gitHubClientCommitResponseMock } from '../../mocks/clients/github-client-commit.response.mock';
import DateUtil from '../../../src/core/util/date.util';
import { authorization } from '../../../src/clients/github-authorization';

jest.setTimeout(900000);
describe('GitHub Client', () => {
  const gitHubClient = new GitHubClient();
  beforeEach(() => {
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce(gitHubClientCommitResponseMock);
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] });
  });

  it('should call GitHub api to get commits', async () => {
    const params: GetCommitParamsDto = {
      initialDate: Constants.anyDateString,
      finalDate: Constants.anyDateString,
      repoPath: Constants.anyRepoPath,
    };

    const result = await gitHubClient.getCommits(params);
    expect(result).toStrictEqual(gitHubClientCommitResponseMock);
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
      `https://api.github.com/repos/${Constants.anyRepoPath}/commits`,
      {
        headers: { authorization },
        params: {
          page: 2,
          per_page: 100,
          since: DateUtil.toString(Constants.anyDateString),
          until: DateUtil.toString(Constants.anyDateString),
        },
      },
    );
  });
});
