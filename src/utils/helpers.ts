import dayjs from "dayjs";
import { toast, ToastOptions } from "react-toastify";
import { Issue, Polling, Theme } from "../types";

export const notify = (message: string, options?: ToastOptions) =>
  toast(message, options);

export const computePriorityScore = (issue: Issue): number => {
  const daysSinceCreated = dayjs().diff(dayjs(issue.createdAt), "days");
  return issue.severity * 10 - daysSinceCreated + (issue.rank ?? 0);
};

export const addRecentIssue = (issue: Issue): void => {
  if (!issue || !Object.hasOwn(issue, "id")) return;

  let data = localStorage.getItem("recent");
  if (!data) data = "[]";

  const recents: Issue[] = JSON.parse(data);
  const updated = [issue, ...recents.filter((el) => el.id !== issue.id)].slice(
    0,
    5
  );
  localStorage.setItem("recent", JSON.stringify(updated));
};

export const getRecentIssues = (): Issue[] => {
  let data = localStorage.getItem("recent");
  if (!data) data = "[]";

  return JSON.parse(data);
};

export const setPollingSettings = (settings: Polling) => {
  localStorage.setItem("polling", JSON.stringify(settings));
};

export const getPollingSettings = () => {
  let data = localStorage.getItem("polling");
  if (!data) data = "{}";

  return JSON.parse(data);
};

export const getTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const theme = localStorage.getItem("theme") as Theme;
  if (theme) return theme;

  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return darkTheme ? "dark" : "light";
};
