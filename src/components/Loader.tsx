import { useEffect, useState } from "react";
import Logo from "../assets/images/logo.webp";

const waitForCriticalImages = (): Promise<void> => {
  return new Promise((resolve) => {
    const criticalImages = document.querySelectorAll("img");
    
    if (criticalImages.length === 0) {
      resolve();
      return;
    }

    let loadedCount = 0;
    const total = criticalImages.length;

    const onLoad = () => {
      loadedCount++;
      if (loadedCount >= total) {
        resolve();
      }
    };

    criticalImages.forEach((img) => {
      if (img.complete && img.naturalHeight > 0) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });

    setTimeout(resolve, 3500);
  });
};

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const MIN_DURATION = 4000;
    const startTime = Date.now();
    let isComplete = false;

    const checkComplete = async (): Promise<boolean> => {
      if (isComplete) return true;
      
      if (document.readyState === "complete") {
        isComplete = true;
        await waitForCriticalImages();
        
        setProgress(100);
        
        setTimeout(() => {
          setIsLoading(false);
          onComplete?.();
        }, 300);
        return true;
      }
      return false;
    };

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / MIN_DURATION) * 100, 95);
      setProgress(timeProgress);
    };

    updateProgress();
    
    const interval = setInterval(() => {
      checkComplete().then((done) => {
        if (done) {
          clearInterval(interval);
        } else {
          updateProgress();
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  if (!isLoading) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black z-[9999]" />
      <div className="fixed inset-0 z-[10000] flex items-center justify-center">
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
              className="transition-all duration-100 ease-linear"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 ">
            <img
              src={Logo}
              alt="Hammam Ziani"
              className="w-24 h-24 object-contain"
            />
            <span className="text-2xl font-primary text-white tracking-wider">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
