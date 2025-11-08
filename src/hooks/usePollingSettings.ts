import React from "react";
import { Polling } from "../types";
import { getPollingSettings } from "../utils/helpers";

export function usePollingSettings() {
  const [settings, setSettings] = React.useState<Polling>({
    isPolling: false,
    interval: "",
  });

  React.useEffect(() => {
    const data = getPollingSettings();
    if (Object.hasOwn(data, "isPolling") && Object.hasOwn(data, "interval")) {
      setSettings(data);
    }
  }, []);

  return { settings, setSettings };
}
