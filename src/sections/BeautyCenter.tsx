import { useMemo } from "react";
import Bglines from "../components/Bglines";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

export default function BeautyCenter() {
  return (
    <section className="relative z-30 bg-[#E5E5DD] px-6 py-20 md:px-12 md:py-28 lg:px-24 lg:py-40">
      <Bglines />

      <div className="mx-auto max-w-350">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-24">
          {/* LEFT */}
          <TextContent />

          {/* RIGHT */}
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
      {/* Label */}
      <SectionTitle
        small={t("Beauty.label")}
        title={t("Beauty.title")}
        accent={t("Beauty.titleSpan")}
        className="mb-6 font-primary  uppercase leading-[0.95] text-6xl lg:text-7xl"
        smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
      />

      {/* Description */}
      <div className="max-w-lg space-y-6">
        <p className="text-sm leading-relaxed tracking-wide text-[#1a1a1a]/70 md:text-base">
          {t("Beauty.description")}
        </p>

        <ServiceTags />
      </div>

      {/* Info + CTA */}
      <div className="mt-10 flex  gap-8 flex-row items-center justify-between lg:mt-12">
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
      <span className="font-primary text-lg tracking-widest text-[#1a1a1a] sm:text-xl">
        {t("Beauty.hours")}
      </span>
    </div>
  );
}

/* ---------------- CTA BUTTON ---------------- */

function CTAButton() {
  const { t } = useI18n();
  return (
    <button className="group relative w-fit overflow-hidden border border-[#1a1a1a] px-8 py-4 transition-all duration-500 sm:px-10">
      <span className="relative z-10 text-[0.6rem] font-bold uppercase tracking-[0.5em] text-[#1a1a1a] transition-colors duration-500 group-hover:text-white">
        {t("Beauty.cta")}
      </span>

      <div className="absolute inset-0 translate-y-full bg-[#1a1a1a] transition-transform duration-500 ease-out group-hover:translate-y-0" />
    </button>
  );
}

/* ---------------- IMAGE SIDE ---------------- */

function ImageContent() {
  const { t } = useI18n();

  return (
    <div className="relative order-1 w-full lg:order-2 lg:w-1/2">
      {/* Decorative Frame */}
      <div className="absolute -top-4 -left-4 hidden h-full w-full border border-brand-yellow/30 md:block lg:-top-6 lg:-left-6" />

      <div className="relative z-10 aspect-4/5 overflow-hidden bg-gray-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        <div className="group relative h-full w-full overflow-hidden">
          <img
            src="/salon1.jpeg"
            alt="Centre de Beauté Ziani"
            className="h-full w-full object-cover transition-transform duration-3000 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/5 transition-colors duration-700 group-hover:bg-transparent" />
        </div>
      </div>

      {/* Floating Label */}
      <div className="absolute -bottom-6 right-6 hidden bg-white border border-black/5 p-6 shadow-xl lg:block">
        <div className="flex flex-col items-center gap-1">
          <span className="font-primary text-3xl italic leading-none text-brand-yellow">
            S
          </span>
          <span className="whitespace-nowrap text-[0.5rem] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]/40">
            {t("Beauty.premiumLabel")}
          </span>
        </div>
      </div>
    </div>
  );
}
