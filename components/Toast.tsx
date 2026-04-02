'use client';

import { useEffect } from 'react';

export type ToastState = { message: string; type: 'ok' | 'err' } | null;

export default function Toast({ toast, onClear }: { toast: ToastState; onClear: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => onClear(), 3000);
    return () => clearTimeout(t);
  }, [toast, onClear]);

  return (
    <div className={toast ? `toast show ${toast.type}` : 'toast'} role="status" aria-live="polite">
      {toast?.message ?? ''}
    </div>
  );
}
