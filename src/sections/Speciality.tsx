import ContainerWithBg from "../components/ContainerWithBg";
import SpecialiteImg from "../assets/images/speciality.jpg";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

export default function Speciality() {
  return (
    <ContainerWithBg>
      <section className="flex min-h-screen w-full flex-col items-center px-6 py-24 md:px-12 lg:flex-row lg:px-20 lg:py-0">
        <TextSide />
        <ImageSide />
      </section>
    </ContainerWithBg>
  );
}

/* ---------------- LEFT SIDE ---------------- */

function TextSide() {
  const { t } = useI18n();
  return (
    <div className="z-20 flex w-full flex-col justify-center lg:w-1/2 lg:pr-16">
      <SectionTitle
        small={t("Specialty.label")}
        title={t("SectionTitle.our")}
        accent={t("SectionTitle.specialty")}
        className="mb-10 font-primary uppercase leading-[0.85] tracking-tighter text-6xl lg:text-7xl"
        smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
      />

      {/* Content Card */}
      <div className="relative border-l border-white/10 bg-black/20 p-8 backdrop-blur-sm md:p-12">
        {/* Corner Accent */}
        <div className="absolute right-0 top-0 h-8 w-8 border-t border-r border-brand-yellow/50" />

        <p className="mb-8 font-secondary text-lg uppercase leading-tight tracking-tight text-brand-yellow lg:text-xl">
          {t("Specialty.subtitle")}
        </p>

        <div className="max-w-lg space-y-6">
          <Paragraph>{t("Specialty.description")}</Paragraph>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RIGHT SIDE ---------------- */

function ImageSide() {
  const { t } = useI18n();
  return (
    <div className="group relative mt-12 h-[50vh] w-full lg:mt-0 lg:h-[75vh] lg:w-1/2">
      {/* Floating Frame */}
      <div className="absolute inset-0 translate-x-4 translate-y-4 border border-brand-yellow/20 transition-transform duration-1000 group-hover:translate-x-0 group-hover:translate-y-0 lg:translate-x-8 lg:translate-y-8" />

      <div className="relative h-full w-full overflow-hidden shadow-2xl shadow-black/50">
        <img
          src={SpecialiteImg}
          alt="Hammam Ziani Art"
          className="h-full w-full scale-110 object-cover transition-all duration-[1500ms] ease-out group-hover:scale-100 lg:group-hover:grayscale"
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

/* ---------------- Reusable Paragraph ---------------- */

function Paragraph({
  children,
  italic = false,
}: {
  children: React.ReactNode;
  italic?: boolean;
}) {
  return (
    <p
      className={`font-secondary text-sm md:text-base leading-relaxed tracking-wider uppercase ${
        italic ? "italic text-white/70" : "text-white/80"
      }`}
    >
      {children}
    </p>
  );
}
