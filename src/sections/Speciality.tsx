import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerWithBg from "../components/ContainerWithBg";
import SpecialiteImg from "../assets/images/speciality.jpg";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

export default function Speciality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useI18n();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%", // Triggers when the top of the section hits 70% of the screen
          toggleActions: "play none none none",
        },
      });

      // 1. Image Reveal (ClipPath + Scale)
      tl.fromTo(
        ".spec-image-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.inOut" },
      )
        .fromTo(
          ".spec-image",
          { scale: 1.3 },
          { scale: 1, duration: 2, ease: "expo.out" },
          "-=1.4",
        )
        // 2. Text Content Reveal
        .from(
          ".spec-text-reveal",
          {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=1.2",
        )
        // 3. Border/Card Reveal
        .from(
          ".spec-card-border",
          {
            scaleX: 0,
            duration: 1,
            transformOrigin: "left",
            ease: "power4.inOut",
          },
          "-=1",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]); // Resets on language change

  return (
    <ContainerWithBg>
      <section
        ref={sectionRef}
        className="flex min-h-screen w-full flex-col items-center px-6 py-24 md:px-12 lg:flex-row lg:px-20 lg:py-0"
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
      <div className="spec-text-reveal">
        <SectionTitle
          small={t("Specialty.label")}
          title={t("SectionTitle.our")}
          accent={t("SectionTitle.specialty")}
          className="mb-10 font-primary uppercase leading-[0.85] tracking-tighter text-6xl lg:text-7xl"
          smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
        />
      </div>

      <div className="relative p-8 md:p-12">
        {/* Animated Left Border */}
        <div className="spec-card-border absolute bottom-0 left-0 top-0 w-px bg-white/20 origin-top" />

        {/* Background Overlay */}
        <div className="spec-text-reveal absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm" />

        {/* Corner Accent */}
        <div className="spec-text-reveal absolute right-0 top-0 h-8 w-8 border-r border-t border-brand-yellow/50" />

        <p className="spec-text-reveal mb-8 font-secondary text-lg uppercase leading-tight tracking-tight text-brand-yellow lg:text-xl">
          {t("Specialty.subtitle")}
        </p>

        <div className="spec-text-reveal max-w-lg space-y-6">
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
      <div className="spec-text-reveal absolute inset-0 translate-x-4 translate-y-4 border border-brand-yellow/20 transition-transform duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 lg:translate-x-8 lg:translate-y-8" />

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

function Paragraph({
  children,
  italic = false,
}: {
  children: React.ReactNode;
  italic?: boolean;
}) {
  return (
    <p
      className={`font-secondary text-sm md:text-base leading-relaxed tracking-wider uppercase ${italic ? "italic text-white/70" : "text-white/80"}`}
    >
      {children}
    </p>
  );
}
