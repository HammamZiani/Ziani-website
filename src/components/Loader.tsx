import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "../assets/images/logo.webp";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Lock Scroll & Initial State
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // UI Entrance
      tl.from(".loader-ui-item", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2. Direct DOM Counter Animation (No React State Lag)
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText =
              Math.floor(counterObj.value).toString() + "%";
          }
        },
        // 3. Trigger Exit Sequence automatically
        onComplete: () => playExit(),
      });

      const playExit = () => {
        const exitTl = gsap.timeline({
          onStart: () => {
            // UNLOCK SCROLL EARLY
            document.body.style.overflow = "auto";
            // Start Hero reveal 300ms before panels finish
            gsap.delayedCall(0.3, onComplete);
          },
        });

        exitTl
          .to(".loader-ui-item", {
            y: -30,
            opacity: 0,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.in",
          })
          .to(
            ".loader-panel",
            {
              scaleY: 0,
              stagger: 0.1,
              duration: 1.2,
              ease: "expo.inOut",
              transformOrigin: "top",
            },
            "-=0.3",
          )
          .set(containerRef.current, { display: "none" });
      };
    }, containerRef);

    return () => {
      ctx.revert();
      // Safety unlock if component unmounts unexpectedly
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none bg-black"
    >
      {/* Background Panels */}
      <div className="absolute inset-0 flex">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="loader-panel relative h-full w-full bg-[#0a0a0a] border-r border-white/[0.03] last:border-r-0"
          />
        ))}
      </div>

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
              0%
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

        <div className="loader-ui-item absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-30">
          <span className="text-[9px] uppercase tracking-widest">
            Heritage Experience
          </span>
          <span className="text-[9px] uppercase tracking-widest font-bold">
            ●
          </span>
          <span className="text-[9px] uppercase tracking-widest">
            Casablanca
          </span>
        </div>
      </div>
    </div>
  );
}
