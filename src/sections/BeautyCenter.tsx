import { useMemo, useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bglines from "../components/Bglines";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

/** * UTILITY: splitText
 */
const splitText = (text: string | undefined): ReactNode[] => {
  if (!text) return [];
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="inline-flex overflow-hidden pb-1 mr-[0.3em]"
    >
      <span className="beauty-reveal-word inline-block translate-y-[110%] opacity-0">
        {word}
      </span>
    </span>
  ));
};

export default function BeautyCenter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { locale } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(".beauty-reveal-word");
      const imageWrap = sectionRef.current?.querySelector(".beauty-image-wrap");
      const imageInner = sectionRef.current?.querySelector(
        ".beauty-image-inner",
      );
      const uiElements =
        sectionRef.current?.querySelectorAll(".beauty-ui-fade");

      if (!words || !imageWrap || !imageInner || !uiElements) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.015,
        ease: "expo.out",
      })
        .fromTo(
          imageWrap,
          { clipPath: "inset(0 0 100% 0)" }, // Reveals from top down
          { clipPath: "inset(0 0 0% 0)", duration: 1.6, ease: "expo.inOut" },
          "-=1.2",
        )
        .fromTo(
          imageInner,
          { scale: 1.2 },
          { scale: 1, duration: 2, ease: "expo.out" },
          "-=1.4",
        )
        .fromTo(
          uiElements,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=1.0",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 bg-[#E5E5DD] px-6 py-20 md:px-12 md:py-28 lg:px-24 lg:py-40 overflow-hidden"
    >
      <Bglines />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
          <TextContent />
          <ImageContent />
        </div>
      </div>
    </section>
  );
}

/* ---------------- TEXT SIDE ---------------- */

function TextContent() {
  const { t } = useI18n();

  return (
    <div className="order-2 w-full lg:order-1 lg:w-1/2">
      <SectionTitle
        small={splitText(t("Beauty.label")) as any}
        title={splitText(t("Beauty.title")) as any}
        accent={splitText(t("Beauty.titleSpan")) as any}
        className="mb-6 font-primary uppercase leading-[0.95] text-6xl lg:text-7xl"
        smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
      />

      <div className="max-w-lg space-y-6">
        <p className="text-sm leading-relaxed tracking-wide text-[#1a1a1a]/70 md:text-base">
          {splitText(t("Beauty.description"))}
        </p>

        <div className="beauty-ui-fade">
          <ServiceTags />
        </div>
      </div>

      <div className="beauty-ui-fade mt-10 flex flex-row items-center justify-between lg:mt-12">
        <OpeningHours />
        <CTAButton />
      </div>
    </div>
  );
}

/* ---------------- SERVICE TAGS ---------------- */

function ServiceTags() {
  const { t } = useI18n();
  const services = useMemo(() => t("Beauty.tags").split(","), [t]);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {services.map((service) => (
        <span
          key={service}
          className="border-r border-black/10 pr-4 text-[0.6rem] uppercase tracking-[0.2em] text-[#1a1a1a]/40 last:border-none"
        >
          {service}
        </span>
      ))}
    </div>
  );
}

/* ---------------- OPENING HOURS ---------------- */

function OpeningHours() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col border-l-2 border-brand-yellow pl-6">
      <span className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#1a1a1a]/40">
        {t("Beauty.open")}
      </span>
      <span className="font-primary text-md tracking-widest text-[#1a1a1a] sm:text-xl">
        {t("Beauty.hours")}
      </span>
    </div>
  );
}

/* ---------------- CTA BUTTON ---------------- */

function CTAButton() {
  const { t } = useI18n();
  return (
    <button className="group relative w-fit overflow-hidden border border-[#1a1a1a] px-8 py-4 transition-all duration-500 sm:px-10 cursor-pointer">
      <span className="relative z-10 text-[0.6rem] font-bold uppercase tracking-[0.5em] text-[#1a1a1a] transition-colors duration-500 group-hover:text-white">
        {t("Beauty.cta")}
      </span>
      <div className="absolute inset-0 translate-y-full bg-[#1a1a1a] transition-transform duration-500 ease-out group-hover:translate-y-0" />
    </button>
  );
}

/* ---------------- IMAGE SIDE ---------------- */

function ImageContent() {
  return (
    <div className="relative order-1 w-full lg:order-2 lg:w-1/2">
      <div className="beauty-ui-fade absolute -top-4 -left-4 hidden h-full w-full border border-brand-yellow/30 md:block lg:-top-6 lg:-left-6" />

      <div className="beauty-image-wrap relative z-10 aspect-[4/5] overflow-hidden bg-gray-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="group relative h-full w-full overflow-hidden">
          <img
            src="/salon1.jpeg"
            alt="Centre de Beauté Ziani"
            className="beauty-image-inner h-full w-full object-cover transition-transform duration-[3s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/5 transition-colors duration-700 group-hover:bg-transparent" />
        </div>
      </div>
    </div>
  );
}
