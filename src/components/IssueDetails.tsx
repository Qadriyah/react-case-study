import classNames from "classnames";
import dayjs from "dayjs";
import React from "react";
import { isAdmin } from "../constants/currentUser";
import { useIssuesStore } from "../store/useIssuesStore";
import { Issue } from "../types";

type IssueDetailsProp = {
  issue: Issue;
};

const IssueDetails: React.FC<IssueDetailsProp> = ({ issue }) => {
  const { updateIssue } = useIssuesStore();

  return (
    <div className="card">
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
  );
};

export default IssueDetails;
