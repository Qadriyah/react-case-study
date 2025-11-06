import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../constants/currentUser";
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
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${issue.id}-${issue.status}`,
      disabled: !isAdmin,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleClick = () => {
    if (!isDragging) {
      navigate(`/issue/${issue.id}`);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="issue-card"
      onClick={handleClick}
    >
      <>
        <div className="flex space-between items-center">
          <h4>{issue.title}</h4>
          {isAdmin && (
            <button
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              title="Drag to move"
              className="border-none btn"
            >
              :: ::
            </button>
          )}
        </div>
        <p>Priority: {issue.priority}</p>
        <p>Severity: {issue.severity}</p>
        <p>Assignee: {issue.assignee}</p>
      </>

      {lastUpdatedIssue && lastUpdatedIssue.id === issue.id && isAdmin && (
        <button onClick={undoUpdateIssue}>{`Undo in ${counter}`}</button>
      )}
    </div>
  );
};

export default IssueCard;
