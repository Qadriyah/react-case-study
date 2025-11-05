import dayjs from "dayjs";
import React from "react";
import { FilterType, Issue } from "../types";
import { computePriorityScore } from "../utils/helpers";

export function useFilteredIssues(
  issues: Issue[],
  filters: FilterType,
  search: string
) {
  const filteredIssues = React.useMemo(() => {
    return issues
      .filter(
        (issue) =>
          issue.title.toLowerCase().includes(search.toLowerCase()) ||
          issue.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      )
      .filter(
        (issue) => !filters.assignee || issue.assignee === filters.assignee
      )
      .filter(
        (issue) => !filters.severity || issue.severity === filters.severity
      )
      .sort((a, b) => {
        const scoreDiff = computePriorityScore(b) - computePriorityScore(a);
        if (scoreDiff !== 0) return scoreDiff;
        return dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix();
      });
  }, [filters.assignee, filters.severity, issues, search]);

  return filteredIssues;
}
