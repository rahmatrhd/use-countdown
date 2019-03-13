import { useEffect, useState } from 'react';

export interface CountdownOptions {
  readonly targetTime: number;
  readonly interval?: number;
}

export const useCountdown: (options: CountdownOptions) => number = ({ targetTime, interval = 1000 }) => {
  const [ms, setMs] = useState<number>(targetTime - Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const delta = targetTime - Date.now();
      if (delta > 0) {
        setMs(delta);
      } else {
        setMs(0);
        clearInterval(intervalId);
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetTime, interval]);

  return ms;
};
