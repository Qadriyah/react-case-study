import { renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import mockIssues from "../data/issues.json";
import { useFilteredIssues } from "../hooks/useFilteredIssues";
import { useIssuesStore } from "../store/useIssuesStore";
import { Issue } from "../types";
import { computePriorityScore } from "../utils/helpers";

describe("useFilteredIssues", () => {
  beforeEach(async () => {
    await useIssuesStore.getState().fetchIssues();
  });

  it("should load all issues", async () => {
    const data = useIssuesStore.getState();
    expect(data.issues.length).toBe(5);
  });

  it("should return issues when no filters are applied", () => {
    const { issues } = useIssuesStore.getState();
    const { result } = renderHook(() => useFilteredIssues(issues, {}, ""));
    expect(result.current.length).toBe(5);
  });

  it("should search issues by title", () => {
    const { issues } = useIssuesStore.getState();
    const { result } = renderHook(() =>
      useFilteredIssues(issues, {}, "Fix login bug")
    );
    expect(result.current.length).toBe(1);
    expect(result.current[0].title).toBe("Fix login bug");
  });

  it("should search issues by tags", () => {
    const { issues } = useIssuesStore.getState();
    const { result } = renderHook(() =>
      useFilteredIssues(issues, {}, "performance")
    );
    expect(result.current.length).toBe(2);
    expect(
      result.current.every((issue) =>
        issue.tags.some((tag) => tag === "performance")
      )
    ).toBe(true);
  });

  it("should filter issues by assignee", () => {
    const { issues } = useIssuesStore.getState();
    const { result } = renderHook(() =>
      useFilteredIssues(issues, { assignee: "alice" }, "")
    );
    expect(result.current.length).toBe(1);
  });

  it("should filter issues by severity", () => {
    const { issues } = useIssuesStore.getState();
    const { result } = renderHook(() =>
      useFilteredIssues(issues, { severity: 3 }, "")
    );
    expect(result.current.length).toBe(2);
    expect(result.current.every((issue) => issue.severity === 3)).toBe(true);
  });

  it("should sort issues by computed priority score", () => {
    const { issues } = useIssuesStore.getState();
    const { result } = renderHook(() => useFilteredIssues(issues, {}, ""));
    const scores = result.current.map(computePriorityScore);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });

  it("should sort issues by date if scores match", () => {
    useIssuesStore.setState({
      issues: [
        {
          ...mockIssues[0],
          severity: 2,
          createdAt: dayjs().toISOString(),
        },
        {
          ...mockIssues[1],
          severity: 2,
          createdAt: dayjs().add(3, "days").toISOString(),
        },
      ] as Issue[],
    });
    const { issues } = useIssuesStore.getState();

    const { result } = renderHook(() => useFilteredIssues(issues, {}, ""));
    expect(new Date(result.current[0].createdAt).getTime()).toBeGreaterThan(
      new Date(result.current[1].createdAt).getTime()
    );
  });
});
