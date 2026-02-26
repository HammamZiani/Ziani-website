import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const MIN_DURATION = 3000;
    const startTime = Date.now();
    let interval: ReturnType<typeof setInterval>;

    const checkComplete = () => {
      const elapsed = Date.now() - startTime;
      if (document.readyState === "complete" && elapsed >= MIN_DURATION) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
        return true;
      }
      return false;
    };

    if (!checkComplete()) {
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const timeProgress = Math.min((elapsed / MIN_DURATION) * 85, 85);

        setProgress(timeProgress);

        if (checkComplete()) {
          clearInterval(interval);
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative flex items-center justify-center">
        <svg
          className="w-68 h-68 -rotate-90 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]"
          viewBox="0 0 180 180"
        >
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="oklch(0.2 0 0)"
            strokeWidth="6"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="var(--brand-yellow)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-75 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 ">
          <img
            src="/src/assets/images/logo.webp"
            alt="Hammam Ziani"
            className="w-24 h-24 object-contain"
          />
          <span className="text-2xl font-primary text-white tracking-wider">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
