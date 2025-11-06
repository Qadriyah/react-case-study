import React from "react";

export const usePolling = (callback: () => Promise<void>, interval = 10000) => {
  React.useEffect(() => {
    const timerId = setInterval(callback, interval);
    return () => clearInterval(timerId);
  }, [callback, interval]);
};
