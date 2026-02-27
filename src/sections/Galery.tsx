import React, { useEffect, useRef, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContainerWithBg from "../components/ContainerWithBg";
import { galleryImages } from "../data/images";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

gsap.registerPlugin(ScrollTrigger);


/** * UTILITY: splitText */
const splitText = (text: string | undefined): ReactNode[] => {
  if (!text) return [];
  return text.split(" ").map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="inline-flex overflow-hidden py-2 -my-2 mr-[0.25em]"
    >
      <span className="gallery-reveal-word inline-block translate-y-[110%] opacity-0">
        {word}
      </span>
    </span>
  ));
};

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t, locale } = useI18n();

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true })],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current?.querySelectorAll(
        ".gallery-reveal-word",
      );
      const images = sectionRef.current?.querySelectorAll(
        ".gallery-card-reveal",
      );
      const bottomUi = sectionRef.current?.querySelector(".gallery-bottom-ui");

      if (!words || !images || !bottomUi) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "expo.out",
      })
        .fromTo(
          images,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.5,
            stagger: 0.1,
            ease: "expo.inOut",
          },
          "-=0.6",
        )
        .fromTo(
          bottomUi,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <ContainerWithBg>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-center"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

        {/* --- HEADER --- */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 mb-6">
          <SectionTitle
            small={splitText(t("Gallery.label")) as any}
            title={splitText(t("SectionTitle.our")) as any}
            accent={splitText(t("SectionTitle.gallery")) as any}
            /** * leading-[0.75]: Aggressively pulls Title and Accent together.
             * tracking-tighter: Keeps the horizontal edges compact.
             */
            className="font-primary uppercase leading-[0.75] tracking-tighter text-white text-6xl lg:text-7xl"
            smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow mb-1 block"
          />
        </div>

        {/* --- SLIDER --- */}
        <div
          className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_22%] min-w-0 px-4"
              >
                {/* Wrap the card in the reveal class */}
                <div className="gallery-card-reveal group relative aspect-[3/4] overflow-hidden transition-all duration-700 ease-out">
                  {/* Hover Effects */}
                  <div className="absolute inset-0 z-10 border-[0px] group-hover:border-[16px] border-[#1e3a8a]/40 transition-all duration-500 ease-out pointer-events-none" />
                  <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 border border-[#C6A75E]/50 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_50px_rgba(198,167,94,0.2)]" />

                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Glass Info Area */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-[#C6A75E] text-[0.5rem] tracking-widest uppercase font-bold">
                      Ziani — 0{item.id}
                    </p>
                    <div className="h-[1px] w-0 group-hover:w-12 bg-[#C6A75E] transition-all duration-700 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM UI --- */}
        <div className="gallery-bottom-ui relative z-10 px-6 md:px-12 lg:px-20 mt-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-white/20 text-[0.6rem] tracking-[0.5em] uppercase">
              {t("Gallery.scroll")}
            </span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#1e3a8a] animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-[#C6A75E]" />
              <div className="w-1 h-1 rounded-full bg-[#1e3a8a] animate-pulse" />
            </div>
          </div>
          <div className="text-brand-yellow font-primary italic text-xl">
            {t("Gallery.heritage")}
          </div>
        </div>
      </section>
    </ContainerWithBg>
  );
};

export default Gallery;
