import dayjs from "dayjs";
import { create } from "zustand";
import { currentUser } from "../constants/currentUser";
import { UserRoles } from "../constants/enums";
import { Issue, IssueStatus } from "../types";
import { mockFetchIssues, mockUpdateIssue } from "../utils/api";
import { notify } from "../utils/helpers";

type LastUpdatedIssueType = {
  id: string;
  issue: Issue | null;
  timerId: ReturnType<typeof setTimeout> | null;
};

type IssueState = {
  issues: Issue[];
  isLoading: boolean;
  lastSyncedAt: string | null;
  lastUpdatedIssue: LastUpdatedIssueType | null;
  fetchIssues: () => Promise<void>;
  updateIssue: (id: string, status: IssueStatus) => void;
};

export const useIssuesStore = create<IssueState>((set, get) => ({
  issues: [],
  isLoading: false,
  lastSyncedAt: null,
  lastUpdatedIssue: null,
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
  updateIssue: (id, status) => {
    if (currentUser.role !== UserRoles.ADMIN) {
      notify("Only admins can move issues.");
      return;
    }

    const issueToUpdate = get().issues.find((issue) => issue.id === id);
    if (!issueToUpdate) return;

    const updatedIssue = { ...issueToUpdate, status };
    const updatedIssues = get().issues.map((issue) =>
      issue.id === id ? updatedIssue : issue
    );

    set({
      issues: updatedIssues,
      lastUpdatedIssue: {
        id,
        issue: issueToUpdate,
        timerId: null,
      },
    });

    const timerId = setTimeout(async () => {
      try {
        await mockUpdateIssue(id, { status });
        set({ lastUpdatedIssue: null });
      } catch (err) {
        notify("Failed to move issue. Reverting changes.");
        set({
          issues: get().issues.map((issue) =>
            issue.id === id ? issueToUpdate : issue
          ),
          lastUpdatedIssue: null,
        });
      }
    }, 5000);

    set((state) => {
      if (state.lastUpdatedIssue) {
        return {
          lastUpdatedIssue: {
            ...state.lastUpdatedIssue,
            timerId,
          },
        };
      }
      return state;
    });
  },
}));
