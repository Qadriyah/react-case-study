export type IssueStatus = "Backlog" | "In Progress" | "Done";
export type IssuePriority = "low" | "medium" | "high";

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: number;
  createdAt: string;
  assignee: string;
  tags: string[];
  rank?: number;
}

export type LastUpdatedIssueType = {
  id: string;
  issue: Issue | null;
  timerId: ReturnType<typeof setTimeout> | null;
};

export type UpdateIssueDto = {
  status?: IssueStatus;
  priority?: IssuePriority;
  rank?: number;
};

export type FilterType = {
  assignee?: string;
  severity?: number | string;
};

export type Polling = {
  isPolling: boolean;
  interval: number | string;
};
