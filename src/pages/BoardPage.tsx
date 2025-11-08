import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import React from "react";
import Board from "../components/Board";
import PageHeader from "../components/PageHeader";
import SideBar from "../components/SideBar";
import { useFilteredIssues } from "../hooks/useFilteredIssues";
import { usePolling } from "../hooks/usePolling";
import { useIssuesStore } from "../store/useIssuesStore";
import { FilterType, Issue, IssueStatus } from "../types";

export const BoardPage = () => {
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
  usePolling((isPolling) => fetchIssues(isPolling));
  const [activeIssue, setActiveIssue] = React.useState<Issue | null>(null);
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState<FilterType>({});

  const filteredIssues = useFilteredIssues(issues, filters, search);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeIds = (active.id as string).split("-");
    if (over && activeIds[1] !== over?.id) {
      updateIssue(String(activeIds[0]), {
        status: over.id as IssueStatus,
      });
    }
    setActiveIssue(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = (active.id as string).split("-")[0];

    const issue = filteredIssues.find((issue) => issue.id === id);
    if (issue) {
      setActiveIssue(issue);
    }
  };

  return (
    <main style={{ padding: "1rem" }}>
      <PageHeader
        search={search}
        lastSyncedAt={lastSyncedAt}
        filters={filters}
        onSearch={setSearch}
        onSetFilter={setFilters}
      />
      <div className="board">
        <SideBar />
        <div className="board-wrapper">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
              <Board
                issues={filteredIssues}
                activeIssue={activeIssue}
                counter={counter}
                lastUpdatedIssue={lastUpdatedIssue}
                undoUpdateIssue={undoUpdateIssue}
              />
            </DndContext>
          )}
        </div>
      </div>
    </main>
  );
};
