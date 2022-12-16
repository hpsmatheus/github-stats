class CommitsByDate {
  date: string;

  commits: string[];
}

export default class GetCommitResponse {
  user: string;

  commitsByDate: CommitsByDate[];
}
