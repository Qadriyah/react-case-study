import React from "react";

type Option = {
  isPolling?: boolean;
  interval?: number;
};

export const usePolling = (
  callback: (isPolling?: boolean) => Promise<void>,
  options: Option = { isPolling: true, interval: 10000 }
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
        options.interval
      );
      return () => clearInterval(timerId);
    }
  }, [options.interval, options.isPolling]);
};
