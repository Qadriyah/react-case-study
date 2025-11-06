import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAdmin } from "../constants/currentUser";
import { useFetchIssue } from "../hooks/useFetchIssue";
import { useIssuesStore } from "../store/useIssuesStore";

export const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { issues, fetchIssues, updateIssue } = useIssuesStore();

  const issue = useFetchIssue(id!, issues);

  React.useEffect(() => {
    (async () => {
      await fetchIssues();
    })();
  }, [fetchIssues]);

  return (
    <main style={{ padding: "1rem" }}>
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="">
          Back
        </button>
      </div>
      <div>
        <div className="flex space-between items-center">
          <h1>{issue.title}</h1>
          {isAdmin && issue.status !== "Done" && (
            <button onClick={() => updateIssue(issue.id, { status: "Done" })}>
              Mark as Resolved
            </button>
          )}
        </div>
        <p>Status: {issue.status}</p>
        <div className="flex">
          <p>Priority: </p>
          <p
            className={classNames(
              "priority",
              issue.priority === "high" && "priority-high",
              issue.priority === "medium" && "priority-medium",
              issue.priority === "low" && "priority-low"
            )}
          >
            {issue.priority}
          </p>
        </div>
        <p>Severity: {issue.severity}</p>
        <p>Assignee: {issue.assignee}</p>
        <p>
          Date Created: {dayjs(issue.createdAt).format("DD MMM, YYYY hh:mm A")}
        </p>
        <div className="flex">
          {issue.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
};
