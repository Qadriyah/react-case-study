import dayjs from "dayjs";
import { create } from "zustand";
import { currentUser } from "../constants/currentUser";
import { UserRoles } from "../constants/enums";
import { Issue, LastUpdatedIssueType, UpdateIssueDto } from "../types";
import { mockFetchIssues, mockUpdateIssue } from "../utils/api";
import { notify } from "../utils/helpers";

type IssueState = {
  issues: Issue[];
  isLoading: boolean;
  counter: number;
  lastSyncedAt: string | null;
  lastUpdatedIssue: LastUpdatedIssueType | null;
  fetchIssues: () => Promise<void>;
  updateIssue: (id: string, dto: UpdateIssueDto) => void;
  undoUpdateIssue: () => void;
};

export const useIssuesStore = create<IssueState>((set, get) => ({
  issues: [],
  isLoading: false,
  lastSyncedAt: null,
  counter: 0,
  lastUpdatedIssue: null,
  fetchIssues: async () => {
    set({ isLoading: true });

    try {
      const data = await mockFetchIssues();
      set({ issues: data, lastSyncedAt: dayjs().toISOString() });
    } catch (err) {
      notify("Failed to fetch issues", { type: "error" });
    } finally {
      set({ isLoading: false });
    }
  },
  updateIssue: (id, dto) => {
    if (currentUser.role !== UserRoles.ADMIN) {
      notify("Only admins can update issues", { type: "error" });
      return;
    }

    const issueToUpdate = get().issues.find((issue) => issue.id === id);
    if (!issueToUpdate) return;

    const updatedIssue = { ...issueToUpdate, ...dto };
    const updatedIssues = get().issues.map((issue) =>
      issue.id === id ? updatedIssue : issue
    );

    set({
      issues: updatedIssues,
      counter: 5,
      lastUpdatedIssue: {
        id,
        issue: issueToUpdate,
        timerId: null,
      },
    });

    const intervalId = setInterval(() => {
      const current = get().counter || 0;
      if (current <= 0) {
        clearInterval(intervalId);
        set({ counter: 0 });
      } else {
        set({ counter: current - 1 });
      }
    }, 1000);

    const timerId = setTimeout(async () => {
      let message = "Issue has been updated successfully";
      let messageType: "success" | "error" = "success";
      clearInterval(intervalId);
      set({ counter: 0 });

      try {
        await mockUpdateIssue(id, dto);
        set({ lastUpdatedIssue: null });
      } catch (err) {
        message = "Failed to move issue. Reverting changes.";
        messageType = "error";
        set({
          issues: get().issues.map((issue) =>
            issue.id === id ? issueToUpdate : issue
          ),
          lastUpdatedIssue: null,
        });
      } finally {
        notify(message, { type: messageType });
      }
    }, 5000);

    set((state) => ({
      lastUpdatedIssue: state.lastUpdatedIssue
        ? {
            ...state.lastUpdatedIssue,
            timerId,
          }
        : null,
    }));
  },
  undoUpdateIssue: () => {
    const lastUpdated = get().lastUpdatedIssue;
    if (!lastUpdated) return;

    if (lastUpdated.timerId) {
      clearTimeout(lastUpdated.timerId);
    }

    set({
      issues: get().issues.map((issue) =>
        issue.id === lastUpdated.id && lastUpdated.issue
          ? lastUpdated.issue
          : issue
      ),
      lastUpdatedIssue: null,
      counter: 0,
    });

    notify("Changes reverted successfully", { type: "info" });
  },
}));
