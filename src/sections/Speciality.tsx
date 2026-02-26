import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerWithBg from "../components/ContainerWithBg";
import SpecialiteImg from "../assets/images/speciality.jpg";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

/** * UTILITY: splitText  */
const splitText = (text: string | undefined): ReactNode[] => {
  if (!text) return [];
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="inline-flex overflow-hidden pb-1 mr-[0.3em]"
    >
      <span className="spec-reveal-word inline-block translate-y-[110%] opacity-0">
        {word}
      </span>
    </span>
  ));
};

export default function Speciality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(".spec-reveal-word");
      const textBlocks =
        sectionRef.current?.querySelectorAll(".spec-text-fade");
      const imageWrap = sectionRef.current?.querySelector(".spec-image-wrap");
      const imageInner = sectionRef.current?.querySelector(".spec-image");
      const border = sectionRef.current?.querySelector(".spec-card-border");

      if (!words || !textBlocks || !imageWrap || !imageInner || !border) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // 1. ANNOUNCE TEXT FIRST
      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "expo.out",
      })
        .fromTo(
          border,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            transformOrigin: "top",
            ease: "power4.inOut",
          },
          "-=0.4",
        )
        .fromTo(
          textBlocks,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6",
        )
        // 2. IMAGE REVEAL FOLLOWS
        .fromTo(
          imageWrap,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.inOut" },
          "-=0.4",
        )
        .fromTo(
          imageInner,
          { scale: 1.3 },
          { scale: 1, duration: 1.8, ease: "expo.out", clearProps: "scale" },
          "-=1.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <ContainerWithBg>
      <section
        ref={sectionRef}
        className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-6 py-24 md:px-12 lg:flex-row lg:px-20 lg:py-0"
      >
        <TextSide t={t} />
        <ImageSide t={t} />
      </section>
    </ContainerWithBg>
  );
}

/* ---------------- LEFT SIDE ---------------- */

function TextSide({ t }: { t: any }) {
  return (
    <div className="z-20 flex w-full flex-col justify-center lg:w-1/2 lg:pr-16">
      <div className="mb-10">
        <SectionTitle
          small={splitText(t("Specialty.label")) as any}
          title={splitText(t("SectionTitle.our")) as any}
          accent={splitText(t("SectionTitle.specialty")) as any}
          className="font-primary uppercase leading-[0.85] tracking-tighter text-6xl lg:text-7xl"
          smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
        />
      </div>

      <div className="relative p-8 md:p-12">
        {/* Animated Left Border */}
        <div className="spec-card-border absolute bottom-0 left-0 top-0 w-px bg-white/20" />

        {/* Background Overlay */}
        <div className="spec-text-fade absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm" />

        {/* Corner Accent */}
        <div className="spec-text-fade absolute right-0 top-0 h-8 w-8 border-r border-t border-brand-yellow/50" />

        <p className="spec-text-fade mb-8 font-secondary text-lg uppercase leading-tight tracking-tight text-brand-yellow lg:text-xl">
          {t("Specialty.subtitle")}
        </p>

        <div className="spec-text-fade max-w-lg space-y-6">
          <Paragraph>{t("Specialty.description")}</Paragraph>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RIGHT SIDE ---------------- */

function ImageSide({ t }: { t: any }) {
  return (
    <div className="group relative mt-12 h-[50vh] w-full lg:mt-0 lg:h-[75vh] lg:w-1/2">
      {/* Floating Frame */}
      <div className="spec-text-fade absolute inset-0 translate-x-4 translate-y-4 border border-brand-yellow/20 transition-transform duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 lg:translate-x-8 lg:translate-y-8" />

      <div className="spec-image-wrap relative h-full w-full overflow-hidden shadow-2xl shadow-black/50">
        <img
          src={SpecialiteImg}
          alt="Hammam Ziani Art"
          className="spec-image h-full w-full object-cover transition-all duration-[1500ms] ease-out lg:group-hover:grayscale lg:group-hover:scale-110"
        />

        {/* Label */}
        <div className="absolute bottom-6 left-6 bg-black/60 px-4 py-2 backdrop-blur-md">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
            {t("Specialty.patrimoine")}
          </span>
        </div>
      </div>
    </div>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-secondary text-sm leading-relaxed tracking-wider uppercase text-white/80 md:text-base">
      {children}
    </p>
  );
}
