'use client';

import { useCallback, useState } from 'react';

export default function CodeBlock({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  }, [code]);

  return (
    <div className="code-block-wrap">
      <div className="code-block-header">
        <span>{title}</span>
        <button className={copied ? 'copy-btn copied' : 'copy-btn'} onClick={onCopy}>
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>
      <div className="code-block">{code}</div>
    </div>
  );
}
