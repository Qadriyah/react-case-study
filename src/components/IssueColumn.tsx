import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Issue, LastUpdatedIssueType } from "../types";
import IssueCard from "./IssueCard";

type IssueColumnProps = {
  title: string;
  issues: Issue[];
  counter: number;
  lastUpdatedIssue: LastUpdatedIssueType | null;
  undoUpdateIssue: () => void;
};

const IssueColumn: React.FC<IssueColumnProps> = ({
  title,
  issues,
  counter,
  lastUpdatedIssue,
  undoUpdateIssue,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: title });
  const style = {
    backgroundColor: isOver ? "lightblue" : "var(--background)",
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <div className="column-header">
        <h3>{title}</h3>
      </div>
      <div className="card-container">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            counter={counter}
            lastUpdatedIssue={lastUpdatedIssue}
            undoUpdateIssue={undoUpdateIssue}
          />
        ))}
      </div>
    </div>
  );
};

export default IssueColumn;
