import {
  GitHubClientCommit,
  GitHubClientCommitResponse,
} from '../../../src/typings/github-client/github-client-commit.response.dto';
import Constants from '../../constants';

const gitHubClientCommit: GitHubClientCommit = {
  author: {
    login: Constants.anyGitHubUser,
  },
  commit: {
    author: {
      date: Constants.anyDateString,
    },
    message: Constants.anyCommitMessage,
  },
};

export const gitHubClientCommitResponseMock: GitHubClientCommitResponse = {
  data: [gitHubClientCommit],
};
