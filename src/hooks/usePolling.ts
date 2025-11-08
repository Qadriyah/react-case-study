import React from "react";
import { Polling } from "../types";

export const usePolling = (
  callback: (isPolling?: boolean) => Promise<void>,
  options: Polling = { isPolling: false, interval: 10000 }
) => {
  const cbRef = React.useRef(callback);
  cbRef.current = callback;

  React.useEffect(() => {
    (async () => {
      await cbRef.current();
    })();

    if (options.isPolling) {
      const timerId = setInterval(
        async () => await cbRef.current(options.isPolling),
        options.interval as number
      );
      return () => clearInterval(timerId);
    }
  }, [options.interval, options.isPolling]);
};
