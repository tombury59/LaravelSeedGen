import AdSenseAd from '@/components/AdSenseAd';

type Props = {
  label: string;
  note?: string;
  adsenseSlot?: string;
};

export default function AdSlot({ label, note, adsenseSlot }: Props) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';
  const canShowAds = Boolean(client && adsenseSlot);

  if (canShowAds) {
    return <AdSenseAd slot={adsenseSlot!} />;
  }

  return (
    <div className="ad-inline">
      <div className="ad-label">Advertisement</div>
      <div style={{ opacity: 0.55, fontSize: 11 }}>{label}</div>
      {note ? <div style={{ opacity: 0.45, fontSize: 11 }}>{note}</div> : null}
      <div style={{ opacity: 0.35, fontSize: 10 }}>
        Configure `NEXT_PUBLIC_ADSENSE_CLIENT` and provide `adsenseSlot`
      </div>
    </div>
  );
}

