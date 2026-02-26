import { useMemo } from "react";
import Bath1 from "@/assets/images/bath1.jpeg";
import Bath2 from "@/assets/images/bath2.jpeg";
import Bath3 from "@/assets/images/bath3.jpeg";
import Bath4 from "@/assets/images/bath4.jpeg";
import Bglines from "../components/Bglines";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

type BathItem = {
  img: string;
  title: string;
  desc: string;
  num: string;
};

export default function About() {
  const { t } = useI18n();

  const ITEMS: BathItem[] = useMemo(() => [
    {
      img: Bath1,
      title: t("Baths.salam"),
      desc: t("Baths.salamDesc"),
      num: "01",
    },
    {
      img: Bath2,
      title: t("Baths.istanbul"),
      desc: t("Baths.istanbulDesc"),
      num: "02",
    },
    {
      img: Bath3,
      title: t("Baths.orient"),
      desc: t("Baths.orientDesc"),
      num: "03",
    },
    {
      img: Bath4,
      title: t("Baths.individuel"),
      desc: t("Baths.individuelDesc"),
      num: "04",
    },
  ], [t]);

  return (
    <section className="bg-[#E5E5DD] relative flex min-h-screen w-full flex-col items-center px-6 py-20 md:px-12 lg:px-20">
      <Bglines />

      {/* Header */}
      <div className="mb-16 w-full max-w-screen-2xl lg:mb-24">
        <SectionTitle
          small={t("About.label")}
          title={t("Baths.our")}
          accent={t("Baths.baths")}
          className="font-primary uppercase tracking-tighter leading-none text-6xl lg:text-7xl"
          smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
        />
      </div>

      {/* Grid */}
      <div className="grid w-full max-w-screen-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <BathCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */

function BathCard({ img, title, desc, num }: BathItem) {
  return (
    <article className="group flex h-full flex-col">
      {/* Image */}
      <div className="relative mb-6 aspect-[3/4] max-h-[550px] overflow-hidden bg-gray-50 shadow-sm">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] lg:group-hover:scale-105 lg:group-hover:grayscale"
        />

        <span className="absolute left-4 top-4 font-secondary text-[0.5rem] tracking-[0.3em] text-white opacity-50 mix-blend-difference">
          {num}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col">
        <h3 className="mb-2 font-primary text-2xl uppercase tracking-tighter text-blue-900 transition-colors duration-500 group-hover:text-brand-yellow lg:text-3xl">
          {title}
        </h3>

        <p className="max-w-[200px] font-secondary text-[0.7rem] uppercase leading-relaxed tracking-[0.15em]">
          {desc}
        </p>

        <div className="relative mt-6 h-px w-full overflow-hidden bg-blue-900/5">
          <div className="absolute inset-0 -translate-x-full bg-brand-yellow transition-transform duration-700 ease-in-out lg:group-hover:translate-x-0" />
        </div>
      </div>
    </article>
  );
}
