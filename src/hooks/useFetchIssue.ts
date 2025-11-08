import React from "react";
import { Issue } from "../types";

export function useFetchIssue(id: string, issues: Issue[]) {
  const issue = React.useMemo(() => {
    return issues.find((el) => el.id === id);
  }, [id, issues]);

  if (!issue) return {} as Issue;

  return issue;
}
