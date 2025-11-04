import dayjs from "dayjs";
import { create } from "zustand";
import { currentUser } from "../constants/currentUser";
import { UserRoles } from "../constants/enums";
import { Issue, IssueStatus } from "../types";
import { mockFetchIssues, mockUpdateIssue } from "../utils/api";
import { notify } from "../utils/helpers";

type IssueState = {
  issues: Issue[];
  isLoading: boolean;
  lastSyncedAt: string | null;
  lastChangedIssue?: Issue | null;
  fetchIssues: () => Promise<void>;
  moveIssue: (id: string, status: IssueStatus) => Promise<void>;
};

export const useIssuesStore = create<IssueState>((set, get) => ({
  issues: [],
  isLoading: false,
  lastSyncedAt: null,
  lastChangedIssue: null,
  fetchIssues: async () => {
    set({ isLoading: true });

    try {
      const data = await mockFetchIssues();
      set({ issues: data, lastSyncedAt: dayjs().toISOString() });
    } catch (err) {
      console.log("Failed to fetch issues: ", err);
    } finally {
      set({ isLoading: false });
    }
  },
  moveIssue: async (id, status) => {
    if (currentUser.role !== UserRoles.ADMIN) {
      notify("Only admins can move issues.");
      return;
    }

    const issueToMove = get().issues.find((issue) => issue.id === id);
    if (!issueToMove) return;

    const updatedIssue = { ...issueToMove, status };
    const updatedIssues = get().issues.map((issue) =>
      issue.id === id ? updatedIssue : issue
    );

    set({
      issues: updatedIssues,
      lastChangedIssue: issueToMove,
    });

    try {
      await mockUpdateIssue(id, { status });
      set({ lastChangedIssue: null });
    } catch (err) {
      notify("Failed to move issue. Reverting changes.");
      set({
        issues: get().issues.map((issue) =>
          issue.id === id ? issueToMove : issue
        ),
        lastChangedIssue: null,
      });
    }
  },
}));
