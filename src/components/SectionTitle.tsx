export default function SectionTitle({
  small,
  title,
  accent,
  smallClass = "text-[0.65rem] uppercase tracking-[0.5em] font-bold text-brand-yellow",
  className = "font-primary text-4xl uppercase tracking-tighter text-white",
}: {
  small?: string;
  title: string;
  accent?: string;
  smallClass?: string;
  className?: string;
}) {
  return (
    <div className="mb-6 text-center md:mb-8 lg:mb-10">
      {small && (
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-brand-yellow" />
          <span className={smallClass}>{small}</span>
        </div>
      )}

      <h2 className={className}>
        {title}{" "}
        {accent && (
          <span className="italic font-light lowercase text-brand-yellow">
            {accent}
          </span>
        )}
      </h2>
    </div>
  );
}
