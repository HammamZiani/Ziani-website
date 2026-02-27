import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "../assets/images/logo.webp";

gsap.registerPlugin(useGSAP);

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  // Store elements safely (no mutation issues)
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const uiItemsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      document.body.style.overflow = "hidden";

      const progressObj = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Entrance
      tl.from(uiItemsRef.current, {
        y: 32,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
      });

      // Smooth progress animation (no React state)
      tl.to(progressObj, {
        value: 100,
        duration: 2.4,
        ease: "power2.out",
        onUpdate: () => {
          counterRef.current!.textContent = `${Math.floor(progressObj.value)}%`;
        },
      });

      // Exit UI
      tl.to(
        uiItemsRef.current,
        {
          y: -24,
          opacity: 0,
          stagger: 0.05,
          duration: 0.45,
          ease: "power2.in",
          onComplete: () => {
            document.body.style.overflow = "auto";
          },
        },
        "+=0.2",
      );

      // Panel shutter animation
      tl.to(
        panelsRef.current,
        {
          scaleY: 0,
          transformOrigin: "top",
          stagger: 0.08,
          duration: 1.1,
          ease: "expo.inOut",
          onComplete: () => {
            onComplete();
          },
        },
        "-=0.2",
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
    >
      {/* Panels */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) panelsRef.current[i] = el;
            }}
            className="h-full w-full bg-[#0a0a0a] border-r border-white/[0.03] last:border-r-0"
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white">
        {/* Logo */}
        <div
          ref={(el) => {
            if (el) uiItemsRef.current[0] = el;
          }}
          className="mb-10"
        >
          <img
            src={Logo}
            alt="Logo"
            className="h-16 lg:h-20 w-auto object-contain grayscale brightness-125"
          />
        </div>

        {/* Counter */}
        <div
          ref={(el) => {
            if (el) uiItemsRef.current[1] = el;
          }}
          className="flex flex-col items-center"
        >
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

        {/* Footer */}
        <div
          ref={(el) => {
            if (el) uiItemsRef.current[2] = el;
          }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-30"
        >
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
