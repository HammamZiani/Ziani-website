import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerWithBg from "../components/ContainerWithBg";
import formules from "../data/formules.json";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";
import SplitText from "../components/SplitText";

gsap.registerPlugin(ScrollTrigger);

interface FormulaData {
  id: number;
  color: string;
  name: { fr: string; en: string };
  descriptions: { fr: string[]; en: string[] };
  price: number;
  isPopular?: boolean;
}

export default function Formules() {
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const currentLocale = locale as "fr" | "en";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(
        ".formula-reveal-word",
      );
      if (words?.length) gsap.set(words, { y: "100%", opacity: 0 });
      const cards = sectionRef.current?.querySelectorAll(
        ".formula-card-entrance",
      );

      if (!words?.length || !cards?.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "expo.out",
      }).fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power4.out",
          clearProps: "transform",
        },
        "-=0.6",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <ContainerWithBg>
      <section
        ref={sectionRef}
        className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 text-center md:mb-20 lg:mb-24">
            <SectionTitle
              small={
                <SplitText
                  text={t("Formulas.label")}
                  wordClass="formula-reveal-word"
                />
              }
              title={
                <SplitText
                  text={t("SectionTitle.our")}
                  wordClass="formula-reveal-word"
                />
              }
              accent={
                <SplitText
                  text={t("SectionTitle.formulas")}
                  wordClass="formula-reveal-word"
                />
              }
              className="font-primary uppercase leading-tight text-white text-6xl lg:text-7xl"
              smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
              smallDevClass="justify-center"
            />
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:justify-center lg:gap-8">
            {formules.map((pkg: FormulaData) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                locale={currentLocale}
                t={t}
              />
            ))}
          </div>
        </div>
      </section>
    </ContainerWithBg>
  );
}

interface PackageCardProps {
  pkg: FormulaData;
  locale: "fr" | "en";
  t: (k: string) => string;
}

function PackageCard({ pkg, locale, t }: PackageCardProps) {
  const popular = pkg.isPopular;

  return (
    <div
      className={`
        formula-card-entrance
        opacity-0 will-change-transform
        relative flex w-full flex-col border p-8 backdrop-blur-xl transition-all duration-500
        bg-[#0a1a2f]/40 group
        ${
          popular
            ? "border-brand-yellow md:-translate-y-6 md:scale-105 z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            : "border-white/10"
        }
      `}
    >
      {popular && (
        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow px-5 py-1.5 shadow-lg">
          <span className="whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.3em] text-black">
            {t("Formulas.popular")}
          </span>
        </div>
      )}

      <div className="relative z-10 mb-8 text-center md:mb-10">
        <h3 className="mb-3 font-primary text-xl uppercase text-white sm:text-2xl lg:text-3xl">
          {pkg.name[locale]}
        </h3>

        <div
          className="mx-auto mb-6 h-px w-12 transition-all duration-500 group-hover:w-20"
          style={{ backgroundColor: pkg.color }}
        />

        <span className="block font-primary text-3xl tracking-widest text-white sm:text-4xl">
          {pkg.price}
        </span>
      </div>

      <div className="relative z-10 grow">
        <ul className="space-y-4">
          {(pkg.descriptions[locale] || []).map((item: string) => (
            <li
              key={item}
              className="flex items-start gap-4 text-[0.68rem] uppercase tracking-[0.15em] leading-relaxed text-white/90 lg:text-[0.75rem]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-1 flex-shrink-0"
                style={{ color: pkg.color }}
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-10">
        <button
          className={`
            w-full cursor-pointer border py-4 text-[0.65rem] uppercase tracking-[0.4em] font-bold transition-all duration-300
            ${
              popular
                ? "bg-brand-yellow text-black border-brand-yellow hover:bg-transparent hover:text-brand-yellow"
                : "border-white/20 text-white hover:border-white"
            }
          `}
        >
          {t("Booking.submit")}
        </button>
      </div>
    </div>
  );
}
