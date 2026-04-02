'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'seedgen_cookie_consent';

function readConsent(): 'accepted' | 'rejected' | 'unset' {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    if (v === 'accepted' || v === 'rejected') return v;
    return 'unset';
  } catch {
    return 'unset';
  }
}

function writeConsent(v: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(CONSENT_KEY, v);
    window.dispatchEvent(new Event('seedgen:consent'));
  } catch {
    // ignore
  }
}

export default function CookieConsent() {
  const requireConsent = (process.env.NEXT_PUBLIC_REQUIRE_CONSENT ?? 'true') === 'true';
  const [consent, setConsent] = useState<'accepted' | 'rejected' | 'unset'>('unset');

  useEffect(() => {
    if (!requireConsent) return;
    setConsent(readConsent());
  }, [requireConsent]);

  if (!requireConsent) return null;
  if (consent !== 'unset') return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div>
        <div className="cookie-title">Cookies & ads</div>
        <div className="cookie-text">
          We use cookies for ads (AdSense) and basic measurement. You can accept or refuse — the generator still works.
          <span style={{ marginLeft: 8 }}>
            <Link href="/privacy">Learn more</Link>
          </span>
        </div>
      </div>
      <div className="cookie-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            writeConsent('rejected');
            setConsent('rejected');
          }}
        >
          Reject
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            writeConsent('accepted');
            setConsent('accepted');
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
