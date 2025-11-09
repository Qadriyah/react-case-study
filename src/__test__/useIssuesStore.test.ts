import { currentUser } from "../constants/currentUser";
import { useIssuesStore } from "../store/useIssuesStore";
import { Issue, User } from "../types";

jest.useFakeTimers();

const clearSpy = jest.spyOn(global, "clearTimeout");
const mockApi = {
  mockUpdateIssue: jest.fn().mockResolvedValue(true),
};

jest.mock("../utils/api.ts", () => ({
  mockFetchIssues: jest.fn().mockResolvedValue([]),
  mockUpdateIssue: jest.fn(() => mockApi.mockUpdateIssue()),
}));

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Fix login bug",
    status: "Backlog",
    priority: "high",
    severity: 3,
    createdAt: "2025-07-09T10:00:00Z",
    assignee: "alice",
    tags: ["auth", "bug"],
  },
];

describe("useIssuesStore", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    useIssuesStore.setState({
      issues: mockIssues,
      lastUpdatedIssue: null,
      counter: 5,
    });
  });

  it("should update issue state optimisticall", () => {
    const { updateIssue, issues } = useIssuesStore.getState();
    expect(issues[0].status).toBe("Backlog");

    updateIssue("1", { status: "In Progress" });

    const updated = useIssuesStore.getState().issues[0];
    expect(updated.status).toBe("In Progress");
    expect(useIssuesStore.getState().lastUpdatedIssue?.id).toBe("1");
    expect(
      useIssuesStore.getState().issues.filter((el) => el.status === "Backlog")
        .length
    ).toBe(0);
  });

  it("should undo change before save", () => {
    const { updateIssue, undoUpdateIssue } = useIssuesStore.getState();

    updateIssue("1", { status: "In Progress" });
    expect(useIssuesStore.getState().issues[0].status).toBe("In Progress");

    undoUpdateIssue();
    const reverted = useIssuesStore.getState().issues[0];
    expect(reverted.status).toBe("Backlog");
    expect(useIssuesStore.getState().lastUpdatedIssue).toBeNull();
  });

  it("should cancel pending timer on undo", () => {
    const { updateIssue, undoUpdateIssue } = useIssuesStore.getState();

    updateIssue("1", { status: "In Progress" });

    undoUpdateIssue();
    jest.advanceTimersByTime(5000);

    expect(mockApi.mockUpdateIssue).not.toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(useIssuesStore.getState().lastUpdatedIssue).toBeNull();
  });

  it("should not allow non-admin users to move issues", () => {
    (currentUser as User).role = "contributor";
    const { updateIssue } = useIssuesStore.getState();

    updateIssue("1", { status: "Done" });

    const issue = useIssuesStore.getState().issues[0];
    expect(issue.status).toBe("Backlog");
  });
});
