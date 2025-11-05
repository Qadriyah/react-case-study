import dayjs from "dayjs";
import { toast, ToastOptions } from "react-toastify";
import { Issue } from "../types";

export const notify = (message: string, options?: ToastOptions) =>
  toast(message, options);

export const computePriorityScore = (issue: Issue): number => {
  const daysSinceCreated = dayjs().diff(dayjs(issue.createdAt), "days");
  return issue.severity * 10 - daysSinceCreated + (issue.rank ?? 0);
};
