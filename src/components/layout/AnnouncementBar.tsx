const MESSAGE = 'NEW DROP: CLASSIC TEE IN STOCK  —  FREE SHIPPING OVER $99  —  ';

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden border-b border-line bg-fg py-2 text-bg" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <span key={i} className="flex shrink-0 items-center font-mono text-[0.7rem] font-medium uppercase tracking-widest2">
            {MESSAGE.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  );
}
