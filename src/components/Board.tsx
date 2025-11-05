import { DragOverlay } from "@dnd-kit/core";
import React from "react";
import { Issue, LastUpdatedIssueType } from "../types";
import IssueCard from "./IssueCard";
import IssueColumn from "./IssueColumn";

const statuses = ["Backlog", "In Progress", "Done"];

type BoardProps = {
  issues: Issue[];
  counter: number;
  activeIssue: Issue | null;
  lastUpdatedIssue: LastUpdatedIssueType | null;
  undoUpdateIssue: () => void;
};

const Board: React.FC<BoardProps> = ({
  issues,
  counter,
  undoUpdateIssue,
  lastUpdatedIssue,
  activeIssue,
}) => {
  return (
    <div className="grid">
      {statuses.map((status) => (
        <IssueColumn
          key={status}
          issues={issues.filter((issue) => issue.status === status)}
          title={status}
          counter={counter}
          undoUpdateIssue={undoUpdateIssue}
          lastUpdatedIssue={lastUpdatedIssue}
        />
      ))}
      <DragOverlay>
        {activeIssue ? <IssueCard issue={activeIssue} /> : null}
      </DragOverlay>
    </div>
  );
};

export default Board;
