import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { Issue, LastUpdatedIssueType } from "../types";
import DragIcon from "./DragIcon";

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
  const { isAdmin } = useUserStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${issue.id}-${issue.status}`,
    disabled: !isAdmin,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="issue-card"
      onClick={() => navigate(`/issue/${issue.id}`)}
    >
      <>
        <div className="flex space-between items-center">
          <div className="ellipsize">
            <h4>{issue.title}</h4>
          </div>
          {isAdmin && (
            <button
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              title="Drag to move"
              className="clear-btn"
              aria-label="Drag handle"
            >
              <DragIcon />
            </button>
          )}
        </div>
        <p>Priority: {issue.priority}</p>
        <p>Severity: {issue.severity}</p>
        <p>Assignee: {issue.assignee}</p>
      </>

      {lastUpdatedIssue && lastUpdatedIssue.id === issue.id && isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            undoUpdateIssue && undoUpdateIssue();
          }}
        >
          {`Undo in ${counter}`}
        </button>
      )}
    </div>
  );
};

export default IssueCard;
