import { useEffect, useState } from 'react';

const useInitialFetch = <T>({
  initialValue,
  asyncAction,
}: {
  initialValue: T;
  asyncAction: () => Promise<T>;
}) => {
  const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('loading');
  const [data, setData] = useState<T | null>(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setStatus('loading');
      try {
        const payload = await asyncAction();
        setData(payload);
        setStatus('idle');
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setStatus('error');
        }
      }
    })();
  }, []);

  return {
    isLoading: status === 'loading',
    isIdle: status === 'idle',
    isError: status === 'error',
    error,
    data,
    setData,
  };
};

export default useInitialFetch;
