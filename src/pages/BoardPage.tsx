import React from "react";
import { useIssuesStore } from "../store/useIssuesStore";

export const BoardPage = () => {
  const {
    fetchIssues,
    issues,
    isLoading,
    lastSyncedAt,
    moveIssue,
    lastChangedIssue,
  } = useIssuesStore();
  console.log(issues, ">>>>>", lastChangedIssue);

  React.useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <div style={{ padding: "1rem" }}>
      <div>TODO: Implement Board View</div>
      <button onClick={() => moveIssue("1", "In Progress")}>Move issue</button>
    </div>
  );
};
