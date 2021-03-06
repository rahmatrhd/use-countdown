import { useEffect, useState } from 'react';

export interface CountdownOptions {
  readonly targetTime: number;
  readonly interval?: number;
}

export const useCountdown: (options: CountdownOptions) => number = ({ targetTime, interval = 1000 }) => {
  const [ms, setMs] = useState<number>(targetTime - Date.now());
  const [countdownIntervalId, setCountdoiwnIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMs(targetTime - Date.now());
    const intervalId = setInterval(() => {
      setMs(targetTime - Date.now());
    }, interval);
    setCountdoiwnIntervalId(intervalId);

    return () => {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
    };
  }, [targetTime, interval]);

  useEffect(() => {
    if (ms < 0) {
      if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
      }
      setMs(0);
    }
  }, [ms]);

  return ms;
};

export interface FormattedCountdownOptions extends CountdownOptions {
  readonly includeSymbols?: Array<'d' | 'h' | 'm' | 's'>;
  readonly separator?: string;
}

export const useFormattedCountdown: (options: FormattedCountdownOptions) => string = ({
  includeSymbols = ['d', 'h', 'm', 's'],
  separator = '',
  ...options
}) => {
  const countdown = useCountdown(options);

  const calcDelta = (ms: number) => ({
    d: Math.floor(ms / (1000 * 60 * 60 * 24)),
    h: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((ms % (1000 * 60)) / 1000),
  });

  return includeSymbols.map(symbol => calcDelta(countdown)[symbol] + symbol).join(separator);
};
