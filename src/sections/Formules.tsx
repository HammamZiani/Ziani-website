import ContainerWithBg from "../components/ContainerWithBg";
import formules from "../data/formules.json";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

interface FormulaData {
  id: number;
  color: string;
  name: {
    fr: string;
    en: string;
  };
  descriptions: {
    fr: string[];
    en: string[];
  };
  price: number;
  isPopular?: boolean;
}

interface PackageCardProps {
  pkg: FormulaData;
  locale: "fr" | "en";
  t: (k: string) => string;
}

export default function Formules() {
  const { t, locale } = useI18n();
  const currentLocale = locale as "fr" | "en";

  return (
    <ContainerWithBg>
      <section className="px-6 py-24 md:px-12 lg:px-24 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          {/* HEADER */}
          <div className="mb-16 text-center md:mb-20 lg:mb-24">
            <SectionTitle
              small={t("Formulas.label")}
              title={t("SectionTitle.our")}
              accent={t("SectionTitle.formulas")}
              className="font-primary uppercase leading-tight text-white text-6xl lg:text-7xl"
              smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
            />
          </div>

          {/* GRID */}
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

/* ---------------- PACKAGE CARD ---------------- */

function PackageCard({ pkg, locale, t }: PackageCardProps) {
  const popular = pkg.isPopular;

  return (
    <div
      className={`
        relative flex w-full flex-col border p-8 backdrop-blur-xl transition-all duration-500
        bg-[#0a1a2f]/40
        ${
          popular
            ? "border-brand-yellow md:-translate-y-6 md:scale-105 z-20 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            : "border-white/10"
        }
      `}
    >
      {/* POPULAR BADGE */}
      {popular && (
        <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow px-5 py-1.5 shadow-lg">
          <span className="whitespace-nowrap text-[0.55rem] font-bold uppercase tracking-[0.3em] text-black">
            {t("Formulas.popular")}
          </span>
        </div>
      )}

      {/* HEADER */}
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

      {/* LIST */}
      <div className="relative z-10 flex-grow">
        <ul className="space-y-4">
          {pkg.descriptions[locale]?.map((item: string) => (
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

      {/* BUTTON */}
      <div className="relative z-10 mt-10">
        <button
          className={`
            w-full cursor-pointer border py-4 text-[0.65rem] uppercase tracking-[0.4em] font-bold transition-all duration-300
            ${
              popular
                ? "bg-brand-yellow text-black border-brand-yellow hover:bg-transparent hover:text-brand-yellow"
                : "border-white/20 text-white hover:text-white "
            }
          `}
          style={!popular ? { borderColor: "rgba(255,255,255,0.2)" } : {}}
        >
          {t("Booking.submit")}
        </button>
      </div>
    </div>
  );
}
