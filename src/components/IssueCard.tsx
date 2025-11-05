import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { currentUser } from "../constants/currentUser";
import { UserRoles } from "../constants/enums";
import { Issue, LastUpdatedIssueType } from "../types";

type IssueCardProps = {
  issue: Issue;
  counter?: number;
  lastUpdatedIssue?: LastUpdatedIssueType | null;
  undoUpdateIssue?: () => void;
};

const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  counter,
  lastUpdatedIssue,
  undoUpdateIssue,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${issue.id}-${issue.status}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} className="issue-card" style={style}>
      <div {...attributes} {...listeners}>
        <h4>{issue.title}</h4>
        <p>Priority: {issue.priority}</p>
        <p>Severity: {issue.severity}</p>
        <p>Assignee: {issue.assignee}</p>
      </div>

      {lastUpdatedIssue &&
        lastUpdatedIssue.id === issue.id &&
        currentUser.role === UserRoles.ADMIN && (
          <button onClick={undoUpdateIssue}>{`Undo in ${counter}`}</button>
        )}
    </div>
  );
};

export default IssueCard;
