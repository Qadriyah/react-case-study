import { useDraggable } from "@dnd-kit/core";
import React from "react";
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
    id: issue.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} className="issue-card">
      <div style={style} {...attributes} {...listeners}>
        <h4>{issue.title}</h4>
        <p>Priority: {issue.priority}</p>
        <p>Severity: {issue.severity}</p>
        <p>Assignee: {issue.assignee}</p>
      </div>

      {lastUpdatedIssue && lastUpdatedIssue.id === issue.id && (
        <button onClick={undoUpdateIssue}>{`Undo in ${counter}`}</button>
      )}
    </div>
  );
};

export default IssueCard;
