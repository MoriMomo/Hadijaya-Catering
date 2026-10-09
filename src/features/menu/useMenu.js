import { useState, useEffect, useCallback, useRef } from 'react';
import { MenuResponseSchema } from './menu.schema';

const DEFAULT_MENU_ENDPOINT = '/data/menu.json';

export function useMenu(endpoint = DEFAULT_MENU_ENDPOINT) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);
  const activeControllerRef = useRef(null);

  const load = useCallback(async (signal) => {
    setStatus('loading');
    setError(null);

    try {
      const res = await fetch(endpoint, { signal });
      if (!res.ok) {
        throw new Error(`Gagal memuat data menu (HTTP ${res.status})`);
      }

      const json = await res.json();

      // Safe parse validation against Zod API contract
      const parsed = MenuResponseSchema.safeParse(json);
      if (!parsed.success) {
        if (import.meta.env?.DEV) {
          console.error('Menu schema mismatch:', parsed.error.flatten());
        }
        throw new Error('Format data menu tidak valid sesuai skema');
      }

      setData(parsed.data);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err);
      setStatus('error');
    }
  }, [endpoint]);

  const refetch = useCallback(() => {
    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }
    const controller = new AbortController();
    activeControllerRef.current = controller;
    return load(controller.signal);
  }, [load]);

  useEffect(() => {
    const controller = new AbortController();
    activeControllerRef.current = controller;
    load(controller.signal);

    return () => {
      controller.abort();
    };
  }, [load]);

  return {
    data,
    status,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    refetch,
  };
}
