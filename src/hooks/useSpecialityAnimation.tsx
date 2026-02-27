import { type RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSpecialityAnimation(
  ref: RefObject<HTMLDivElement | null>,
  locale: string,
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = (cls: string): Element | null =>
        ref.current?.querySelector(cls) ?? null;

      const words = ref.current?.querySelectorAll(".spec-reveal-word");
      const border = el(".spec-card-border");
      const overlay = el(".spec-overlay");
      const cornerAccent = el(".spec-corner");
      const subtitle = el(".spec-subtitle");
      const body = el(".spec-body");
      const imageFrame = el(".spec-image-frame");
      const imageWrap = el(".spec-image-wrap");
      const imageInner = el(".spec-image");
      const imageLabel = el(".spec-image-label");

      if (!words?.length || !border || !imageWrap || !imageInner) {
        if (import.meta.env.DEV) {
          console.warn("[Speciality] Missing animation targets");
        }
        return;
      }

      // GSAP owns all initial states — no Tailwind classes needed on these elements
      gsap.set(words, { y: "100%", opacity: 0 });
      gsap.set(imageInner, { scale: 1.15 });
      gsap.set(border, { scaleY: 0, transformOrigin: "top" });
      gsap.set(
        [overlay, cornerAccent, subtitle, body].filter(Boolean) as Element[],
        { opacity: 0, y: 16 },
      );
      gsap.set([imageFrame, imageLabel].filter(Boolean) as Element[], {
        opacity: 0,
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // 1. Title words reveal
      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.018,
        ease: "expo.out",
      })

        // 2. Border draws down
        .to(border, { scaleY: 1, duration: 1.2, ease: "power4.inOut" }, "-=0.5")

        // 3. Card overlay fades in
        .to(
          overlay,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.9",
        )

        // 4. Corner + subtitle
        .to(
          [cornerAccent, subtitle].filter(Boolean) as Element[],
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3",
        )

        // 5. Body text
        .to(
          body,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )

        // 6. Image reveal — runs in parallel with text from t=0.3s
        .fromTo(
          imageWrap,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.inOut" },
          0.3,
        )

        // 7. Image descale
        .to(
          imageInner,
          { scale: 1, duration: 2.2, ease: "expo.out", clearProps: "scale" },
          0.3,
        )

        // 8. Floating frame
        .to(
          imageFrame,
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )

        // 9. Label
        .to(
          imageLabel,
          { opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        );
    }, ref);

    return () => ctx.revert();
  }, [locale]);
}
