export default function AdSlot({ label, note }: { label: string; note?: string }) {
  return (
    <div className="ad-inline">
      <div className="ad-label">Advertisement</div>
      <div style={{ opacity: 0.55, fontSize: 11 }}>{label}</div>
      {note ? <div style={{ opacity: 0.45, fontSize: 11 }}>{note}</div> : null}
    </div>
  );
}
