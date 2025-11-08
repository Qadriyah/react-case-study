import React from "react";
import { Issue } from "../types";
import { addRecentIssue } from "../utils/helpers";

export function useAddRecent(issue: Issue) {
  React.useEffect(() => {
    addRecentIssue(issue);
  }, [issue]);
}
