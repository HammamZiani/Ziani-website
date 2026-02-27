import { useRef, type ReactNode } from "react";
import ContainerWithBg from "../components/ContainerWithBg";
import SpecialiteImg from "../assets/images/speciality.jpg";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";
import SplitText from "../components/SplitText";
import { useSpecialityAnimation } from "../hooks/useSpecialityAnimation";

export default function Speciality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useI18n();

  useSpecialityAnimation(sectionRef, locale);

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

function TextSide({ t }: { t: (key: string) => string }) {
  return (
    <div className="z-20 flex w-full flex-col justify-center lg:w-1/2 lg:pr-16">
      <div className="mb-10">
        <SectionTitle
          small={<SplitText text={t("Specialty.label")} wordClass="spec-reveal-word" />}
          title={<SplitText text={t("SectionTitle.our")} wordClass="spec-reveal-word" />}
          accent={<SplitText text={t("SectionTitle.specialty")} wordClass="spec-reveal-word" />}
          className="font-primary uppercase leading-[0.85] tracking-tighter text-6xl lg:text-7xl"
          smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
        />
      </div>

      <div className="relative p-8 md:p-12">
        {/* Border — drawn down by GSAP */}
        <div className="spec-card-border absolute bottom-0 left-0 top-0 w-px bg-white/20" />

        {/* Card background overlay */}
        <div className="spec-overlay absolute inset-0 -z-10 bg-black/20 backdrop-blur-sm" />

        {/* Corner accent */}
        <div className="spec-corner absolute right-0 top-0 h-8 w-8 border-r border-t border-brand-yellow/50" />

        {/* Subtitle */}
        <p className="spec-subtitle mb-8 font-secondary text-lg uppercase leading-tight tracking-tight text-brand-yellow lg:text-xl">
          {t("Specialty.subtitle")}
        </p>

        {/* Body */}
        <div className="spec-body max-w-lg space-y-6">
          <Paragraph>{t("Specialty.description")}</Paragraph>
        </div>
      </div>
    </div>
  );
}

function ImageSide({ t }: { t: (key: string) => string }) {
  return (
    <div className="group relative mt-12 h-[50vh] w-full lg:mt-0 lg:h-[75vh] lg:w-1/2">
      {/* Floating frame */}
      <div className="spec-image-frame absolute inset-0 translate-x-4 translate-y-4 border border-brand-yellow/20 transition-transform duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 lg:translate-x-8 lg:translate-y-8" />

      <div className="spec-image-wrap relative h-full w-full overflow-hidden shadow-2xl shadow-black/50">
        <img
          src={SpecialiteImg}
          alt="Hammam Ziani Art"
          className="spec-image h-full w-full object-cover transition-all duration-[1500ms] ease-out lg:group-hover:grayscale lg:group-hover:scale-110"
        />

        {/* Label */}
        <div className="spec-image-label absolute bottom-6 left-6 bg-black/60 px-4 py-2 backdrop-blur-md">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-white/50">
            {t("Specialty.patrimoine")}
          </span>
        </div>
      </div>
    </div>
  );
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="font-secondary text-sm leading-relaxed tracking-wider uppercase text-white/80 md:text-base">
      {children}
    </p>
  );
}