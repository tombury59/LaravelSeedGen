'use client';

import { useEffect, useId, useMemo } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Props = {
  slot: string;
  format?: 'auto' | 'fluid';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function AdSenseAd({ slot, format = 'auto', responsive = true, className, style }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const requireConsent = (process.env.NEXT_PUBLIC_REQUIRE_CONSENT ?? 'true') === 'true';
  const id = useId();

  const canRender = useMemo(() => {
    if (!client || !slot) return false;
    if (!requireConsent) return true;
    try {
      return localStorage.getItem('seedgen_cookie_consent') === 'accepted';
    } catch {
      return false;
    }
  }, [client, requireConsent, slot]);

  useEffect(() => {
    if (!canRender) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // ignored: adblockers often throw here
    }
  }, [canRender, id]);

  if (!canRender) return null;

  return (
    <ins
      key={id}
      className={['adsbygoogle', 'ad-inline', className].filter(Boolean).join(' ')}
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
