import { Issue } from "../types";

export const mockFetchIssues = (): Promise<Issue[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      import("../data/issues.json").then((module) =>
        resolve(module.default as Issue[])
      );
    }, 500);
  });
};

export const mockUpdateIssue = (issueId: string, updates: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve({ id: issueId, ...updates });
      } else {
        reject(new Error("Failed to update issue"));
      }
    }, 500);
  });
};
