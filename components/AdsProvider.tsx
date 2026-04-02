'use client';

import Script from 'next/script';
import { useEffect, useMemo, useState } from 'react';

const CONSENT_KEY = 'seedgen_cookie_consent';

function getConsent(): 'accepted' | 'rejected' | 'unset' {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'accepted' || v === 'rejected') return v;
    return 'unset';
  } catch {
    return 'unset';
  }
}

export default function AdsProvider({ children }: { children?: React.ReactNode }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const requireConsent = (process.env.NEXT_PUBLIC_REQUIRE_CONSENT ?? 'true') === 'true';

  const [consent, setConsent] = useState<'accepted' | 'rejected' | 'unset'>('unset');

  useEffect(() => {
    setConsent(getConsent());
    const onChange = () => setConsent(getConsent());
    window.addEventListener('storage', onChange);
    window.addEventListener('seedgen:consent', onChange as EventListener);
    return () => {
      window.removeEventListener('storage', onChange);
      window.removeEventListener('seedgen:consent', onChange as EventListener);
    };
  }, []);

  const canLoadAds = useMemo(() => {
    if (!client) return false;
    if (!requireConsent) return true;
    return consent === 'accepted';
  }, [client, consent, requireConsent]);

  return (
    <>
      {canLoadAds ? (
        <Script
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`}
          crossOrigin="anonymous"
        />
      ) : null}
      {children}
    </>
  );
}
