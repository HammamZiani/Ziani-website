import { useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Bath1 from "@/assets/images/bath1.jpeg";
import Bath2 from "@/assets/images/bath2.jpeg";
import Bath3 from "@/assets/images/bath3.jpeg";
import Bath4 from "@/assets/images/bath4.jpeg";
import Bglines from "../components/Bglines";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

type BathItem = {
  img: string;
  title: string;
  desc: string;
  num: string;
};

export default function About() {
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  const ITEMS: BathItem[] = useMemo(
    () => [
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
    ],
    [t],
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 2. Animate Section Title
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // 3. Animate Cards via clipPath
      const cards = gsap.utils.toArray<HTMLElement>(".bath-card");

      // Removed 'i' here to fix TS6133
      cards.forEach((card) => {
        const imageWrap = card.querySelector(".card-image-wrap");
        const imageInner = card.querySelector(".card-image-inner");
        const contentItems = card.querySelectorAll(".card-content-item");

        if (!imageWrap || !imageInner) return;

        gsap.set(imageWrap, { clipPath: "inset(100% 0 0 0)" });
        gsap.set(imageInner, { scale: 1.2 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.to(imageWrap, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "expo.inOut",
        })
          .to(
            imageInner,
            {
              scale: 1,
              duration: 1.8,
              ease: "expo.out",
            },
            "-=1.1",
          )
          .from(
            contentItems,
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=1.0",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#E5E5DD] relative flex min-h-screen w-full flex-col items-center px-6 py-20 md:px-12 lg:px-20 overflow-hidden"
    >
      <Bglines />

      <div className="about-title mb-16 w-full max-w-screen-2xl lg:mb-24">
        <SectionTitle
          small={t("About.label")}
          title={t("Baths.our")}
          accent={t("Baths.baths")}
          className="font-primary uppercase tracking-tighter leading-none text-6xl lg:text-7xl"
          smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-black/40"
        />
      </div>

      <div className="grid w-full max-w-screen-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <BathCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function BathCard({ img, title, desc, num }: BathItem) {
  return (
    <article className="bath-card group flex h-full flex-col">
      <div className="card-image-wrap relative mb-6 aspect-[3/4] max-h-[550px] overflow-hidden bg-gray-100 shadow-sm">
        <img
          src={img}
          alt={title}
          className="card-image-inner h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 z-20 font-secondary text-[0.5rem] tracking-[0.3em] text-white mix-blend-difference">
          {num}
        </span>
      </div>

      <div className="flex flex-grow flex-col">
        <h3 className="card-content-item mb-2 font-primary text-2xl uppercase tracking-tighter text-blue-900 lg:text-3xl">
          {title}
        </h3>
        <p className="card-content-item max-w-[200px] font-secondary text-[0.7rem] uppercase leading-relaxed tracking-[0.15em]">
          {desc}
        </p>
        <div className="card-content-item relative mt-6 h-px w-full overflow-hidden bg-blue-900/10">
          <div className="absolute inset-0 -translate-x-full bg-brand-yellow transition-transform duration-700 ease-in-out lg:group-hover:translate-x-0" />
        </div>
      </div>
    </article>
  );
}
