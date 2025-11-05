import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import React from "react";
import IssueCard from "../components/IssueCard";
import IssueColumn from "../components/IssueColumn";
import { useIssuesStore } from "../store/useIssuesStore";
import { Issue, IssueStatus } from "../types";

export const BoardPage = () => {
  const statuses = ["Backlog", "In Progress", "Done"];
  const [activeIssue, setActiveIssue] = React.useState<Issue | null>(null);
  const {
    fetchIssues,
    issues,
    counter,
    isLoading,
    lastSyncedAt,
    updateIssue,
    lastUpdatedIssue,
    undoUpdateIssue,
  } = useIssuesStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over?.id) {
      updateIssue(String(active.id), {
        status: over.id as IssueStatus,
      });
    }
    setActiveIssue(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    const issue = issues.find((issue) => issue.id === id);
    if (issue) {
      setActiveIssue(issue);
    }
  };

  React.useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div style={{ padding: "1rem" }}>
        <div className="grid">
          {statuses.map((status) => (
            <IssueColumn
              key={status}
              issues={issues}
              status={status}
              counter={counter}
              undoUpdateIssue={undoUpdateIssue}
              lastUpdatedIssue={lastUpdatedIssue}
            />
          ))}
          <DragOverlay>
            {activeIssue ? <IssueCard issue={activeIssue} /> : null}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  );
};
