import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { Issue, LastUpdatedIssueType } from "../types";
import IssueCard from "./IssueCard";

type IssueColumnProps = {
  status: string;
  issues: Issue[];
  counter: number;
  lastUpdatedIssue: LastUpdatedIssueType | null;
  undoUpdateIssue: () => void;
};

const IssueColumn: React.FC<IssueColumnProps> = ({
  status,
  issues,
  counter,
  lastUpdatedIssue,
  undoUpdateIssue,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const style = {
    backgroundColor: isOver ? "lightblue" : "lightgray",
    minHeight: "100px",
    padding: "10px",
  };

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <div className="column-header">
        <h3>{status}</h3>
      </div>
      {issues
        .filter((issue) => issue.status === status)
        .map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            counter={counter}
            lastUpdatedIssue={lastUpdatedIssue}
            undoUpdateIssue={undoUpdateIssue}
          />
        ))}
    </div>
  );
};

export default IssueColumn;
