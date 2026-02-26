import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ContainerWithBg from "../components/ContainerWithBg";
import { galleryImages } from "../data/images";
import { useI18n } from "../providers/useI18n";
import SectionTitle from "../components/SectionTitle";

const Gallery: React.FC = () => {
  // 1. FIX: Use a single instance of Autoplay directly in the hook
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true, // Internal loop: No need to duplicate galleryData
      align: "start",
      dragFree: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true })],
  );

  const { t } = useI18n();

  return (
    <ContainerWithBg>
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Subtle Overlay to make White/Blue/Yellow pop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

        {/* --- HEADER --- */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 mb-12">
          <SectionTitle
            small={t("Gallery.label")}
            title={t("SectionTitle.our")}
            accent={t("SectionTitle.gallery")}
            className=" font-primary uppercase leading-none tracking-tighter text-white text-6xl lg:text-7xl"
            smallClass="text-[0.65rem] uppercase tracking-[0.3em] text-brand-yellow"
          />
        </div>

        {/* --- SLIDER --- */}
        <div
          className="relative z-10 w-full overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex">
            {/* 2. FIX: Map the ORIGINAL galleryData. Embla handles the loop. */}
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_22%] min-w-0 px-4"
              >
                {/* --- IMPROVED CARD DESIGN --- */}
                <div className="group relative aspect-[3/4] overflow-hidden transition-all duration-700 ease-out">
                  {/* The Royal Blue Inner Frame (visible on hover) */}
                  <div className="absolute inset-0 z-10 border-[0px] group-hover:border-[16px] border-[#1e3a8a]/40 transition-all duration-500 ease-out pointer-events-none" />

                  {/* The Golden Glow Accent */}
                  <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 border border-[#C6A75E]/50 transition-opacity duration-700 pointer-events-none shadow-[inset_0_0_50px_rgba(198,167,94,0.2)]" />

                  {/* Image with zoom and slight desaturation reset */}
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-cover  group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Glass Card Info (Bottom) */}
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

        {/* --- PROGRESS ACCENT (Yellow/Blue) --- */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 mt-16 flex items-center justify-between">
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
