import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "../assets/images/logo.webp";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Lock Scroll & Set Initial State
    document.body.style.overflow = "hidden";
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance of UI elements
      tl.from(".loader-ui-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Simulated Progress Logic
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const step = Math.floor(Math.random() * 15) + 1;
          return Math.min(prev + step, 100);
        });
      }, 150);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Trigger Exit only when progress hits 100
  useEffect(() => {
    if (progress === 100) {
      const exitCtx = gsap.context(() => {
        const exitTl = gsap.timeline({
          delay: 0.5,
          onComplete: () => {
            document.body.style.overflow = "auto";
            onComplete(); // This tells the App/Hero we are officially done
          }
        });

        exitTl
          .to(".loader-ui-item", {
            y: -20,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.in"
          })
          .to(".loader-panel", {
            scaleY: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: "expo.inOut",
            transformOrigin: "top",
          }, "-=0.2");
      }, containerRef);

      return () => exitCtx.revert();
    }
  }, [progress, onComplete]);

  return (
    <div
      ref={containerRef}
      data-loader-active={progress < 100 ? "true" : "false"}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Background Panels (Vertical Shutter) */}
      <div ref={panelsRef} className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="loader-panel relative h-full w-full bg-[#0a0a0a] border-r border-white/[0.03] last:border-r-0"
          />
        ))}
      </div>

      {/* UI Content */}
      <div className="relative z-10 flex flex-col items-center text-white">
        <div className="loader-ui-item mb-10">
          <img 
            src={Logo} 
            alt="Logo" 
            className="h-16 lg:h-20 w-auto object-contain grayscale brightness-125" 
          />
        </div>

        <div className="loader-ui-item flex flex-col items-center">
          <div className="overflow-hidden">
            <span 
              ref={counterRef}
              className="block text-[12vw] font-primary leading-none tabular-nums font-bold tracking-tighter italic text-brand-yellow"
            >
              {progress}%
            </span>
          </div>
          
          <div className="mt-6 flex items-center gap-4">
             <div className="w-8 h-px bg-white/20" />
             <span className="text-[10px] uppercase tracking-[0.8em] text-white/50">
               Wellness Rituals
             </span>
             <div className="w-8 h-px bg-white/20" />
          </div>
        </div>

        {/* Decorative footer details */}
        <div className="loader-ui-item absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-30">
           <span className="text-[9px] uppercase tracking-widest">Heritage Experience</span>
           <span className="text-[9px] uppercase tracking-widest font-bold">●</span>
           <span className="text-[9px] uppercase tracking-widest">Casablanca</span>
        </div>
      </div>
    </div>
  );
}