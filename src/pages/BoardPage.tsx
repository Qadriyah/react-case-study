import React from "react";
import { useIssuesStore } from "../store/useIssuesStore";

export const BoardPage = () => {
  const {
    fetchIssues,
    issues,
    isLoading,
    lastSyncedAt,
    updateIssue,
    lastUpdatedIssue,
  } = useIssuesStore();
  console.log(issues, ">>>>>", lastUpdatedIssue);

  React.useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <div style={{ padding: "1rem" }}>
      <div>TODO: Implement Board View</div>
      <button onClick={() => updateIssue("1", "In Progress")}>
        Move issue
      </button>
    </div>
  );
};
