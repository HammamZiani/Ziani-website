interface SplitTextProps {
  text: string;
  className?: string;
  wordClass?: string;
}

export default function SplitText({
  text,
  className,
  wordClass = "reveal-word",
}: SplitTextProps) {
  if (!text) return null;

  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-flex overflow-hidden pb-1 mr-[0.3em] ${className ?? ""}`}
        >
          {/* Inline style hides words immediately on render — GSAP overrides this when animating */}
          <span
            className={`${wordClass} inline-block`}
            style={{ transform: "translateY(100%)", opacity: 0 }}
          >
            {word}
          </span>
        </span>
      ))}
    </>
  );
}
