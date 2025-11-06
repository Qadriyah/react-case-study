import React from "react";

export const usePolling = (callback: () => Promise<void>, interval = 10000) => {
  const cbRef = React.useRef(callback);
  cbRef.current = callback;

  React.useEffect(() => {
    (async () => {
      await cbRef.current();
    })();

    const timerId = setInterval(async () => await cbRef.current(), interval);
    return () => clearInterval(timerId);
  }, [interval]);
};
