import React from "react";
import { Issue } from "../types";
import { getRecentIssues } from "../utils/helpers";

export function useGetRecent() {
  const [recent, setRecent] = React.useState<Issue[]>([]);

  React.useEffect(() => {
    const data = getRecentIssues();
    setRecent(data);
  }, []);

  return recent;
}
