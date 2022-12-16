import GetCommitResponse from '../../src/typings/commit/get-commit.response.dto';
import Constants from '../constants';

export const getCommitResponseMock: GetCommitResponse[] = [
  {
    user: Constants.anyGitHubUser,
    commitsByDate: [
      {
        date: Constants.anyDateString,
        commits: [Constants.anyCommitMessage],
      },
    ],
  },
];
