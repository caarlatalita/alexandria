import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export function useToast() {
  const { toasts, removeToast } = useAppStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const last = toasts[toasts.length - 1];
    const timer = setTimeout(() => removeToast(last.id), 3000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return { toasts, removeToast };
}
