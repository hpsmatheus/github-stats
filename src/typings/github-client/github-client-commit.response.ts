export class GitHubClientCommit {
  commit: {
    author: {
      date: string;
    };
    message: string;
  };

  author: { login: string };
}
export class GitHubClientCommitResponse {
  data: GitHubClientCommit[];
}
