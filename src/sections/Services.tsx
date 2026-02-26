import {
  useEffect,
  useCallback,
  useState,
  useRef,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bglines from "../components/Bglines";
import SectionTitle from "../components/SectionTitle";
import servicesData from "../data/services.json";
import { useI18n } from "../providers/useI18n";

gsap.registerPlugin(ScrollTrigger);

/** * TYPES
 */
interface ServiceData {
  id: number;
  image: string;
  name: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  category?: string;
}

interface ServiceCardProps {
  service: ServiceData;
  active: boolean;
  locale: "fr" | "en";
}

/** * UTILITY: splitText
 * Returns ReactNode[] to be compatible with SectionTitle props
 */
const splitText = (text: string): ReactNode[] =>
  text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="inline-flex overflow-hidden pb-1 mr-[0.3em]"
    >
      <span className="service-reveal-word inline-block translate-y-full opacity-0">
        {word}
      </span>
    </span>
  ));

export default function NosServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useI18n();
  const currentLocale = locale as "fr" | "en";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(
        ".service-reveal-word",
      );
      const cards = sectionRef.current?.querySelectorAll(".service-card-mask");
      if (!words || !cards || words.length === 0) return;
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
        stagger: 0.02,
        ease: "expo.out",
      }).fromTo(
        cards,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          stagger: 0.1,
          ease: "expo.inOut",
        },
        "-=0.8",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full bg-[#E5E5DD] px-6 py-20 md:px-12 lg:px-20 overflow-hidden"
    >
      <Bglines />

      <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-[35%]">
          <SectionTitle
            // Now passing ReactNode instead of string
            small={splitText(t("Services.label")) as any}
            title={splitText(t("SectionTitle.our")) as any}
            accent={splitText(t("SectionTitle.services")) as any}
            className="mb-8 font-primary uppercase leading-[0.9] tracking-tighter text-6xl lg:text-7xl"
            smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
          />

          <div className="flex justify-end gap-4">
            <NavButton onClick={() => emblaApi?.scrollPrev()} rotate />
            <NavButton onClick={() => emblaApi?.scrollNext()} />
          </div>
        </div>

        <div
          className="w-full overflow-hidden lg:w-[65%] cursor-grab"
          ref={emblaRef}
        >
          <div className="flex">
            {servicesData.map((service: ServiceData, index: number) => (
              <ServiceCard
                key={service.id}
                service={service}
                active={index === selectedIndex}
                locale={currentLocale}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, active, locale }: ServiceCardProps) {
  return (
    <div className="flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_45%] px-4">
      <div className="service-card-mask relative h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden bg-[#1e3a8a]">
        <img
          src={service.image}
          alt={service.name.fr}
          className={`h-full w-full object-cover transition-all duration-[1.8s] ${
            active ? "scale-105 opacity-80" : "scale-100 opacity-40 grayscale"
          }`}
        />

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 md:p-10">
          <div className="bg-linear-to-t from-black/90 to to-transparent h-[50%] absolute bottom-0 left-0 w-full "/>
          <div className="flex items-start justify-between">
        
            <span className="font-primary text-4xl italic text-white/20 sm:text-5xl">
              0{service.id}
            </span>
          </div>

          <div
            className={`transition-all duration-700 ${active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <h3 className="mb-4 font-primary text-2xl uppercase leading-none text-white sm:text-3xl md:text-4xl">
              {service.name[locale]}
            </h3>
            <p className="mb-6 max-w-xs text-[0.7rem] uppercase tracking-widest leading-relaxed text-white/80">
              {service.description[locale]}
            </p>
            <div className="flex cursor-pointer items-center gap-4 text-[#C6A75E]">
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em]">
                Explorer
              </span>
              <div className="h-px w-12 bg-[#C6A75E]" />
            </div>
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 h-1 w-full origin-left bg-[#1e3a8a] transition-transform duration-1000 ${active ? "scale-x-100" : "scale-x-0"}`}
        />
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  rotate = false,
}: {
  onClick: () => void;
  rotate?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1e3a8a]/10 transition-all duration-500 hover:bg-[#1e3a8a] hover:text-white sm:h-14 sm:w-14 cursor-pointer"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className={rotate ? "rotate-180" : ""}
      >
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
