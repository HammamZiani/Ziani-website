import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import Certificate from "../components/Certificate";
import ContainerWithBg from "../components/ContainerWithBg";
import Logo from "../assets/images/logo.webp";
import HeroImage from "../assets/images/bath1.jpeg";
import { useI18n } from "../providers/useI18n";
import SplitText from "../components/SplitText";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const { locale, t } = useI18n();

  const animateHero = useCallback(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = containerRef.current?.querySelectorAll(".reveal-word");
      const heroImage = containerRef.current?.querySelector(".hero-image");

      if (!words?.length || !heroImage) return;

      gsap.set(words, { y: "100%", opacity: 0 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(words, {
        y: "0%",
        opacity: 1,
        duration: 1.1,
        stagger: 0.02,
        ease: "expo.out",
      }).fromTo(
        heroImage,
        { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.6,
          opacity: 1,
          ease: "expo.inOut",
        },
        "-=0.9",
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      const cleanup = animateHero();
      return cleanup;
    }

    if (locale) {
      hasAnimatedRef.current = true;
      const cleanup = animateHero();
      return cleanup;
    }
  }, [isLoaded, locale, animateHero]);

  return (
    <ContainerWithBg>
      <section
        ref={containerRef}
        className="relative flex min-h-screen w-full flex-col overflow-hidden"
      >
        <header className="absolute top-6 left-1/2 z-50 w-full max-w-400 -translate-x-1/2 px-6 lg:top-10 lg:px-12">
          <div className="text-center ">
            <img src={Logo} alt="Logo" className="mx-auto h-24" />
          </div>
          <nav className="mt-6 hidden lg:block">
            <ul className="flex justify-center gap-8 font-secondary text-[0.85rem] uppercase tracking-wide">
              {[
                "Navigation.home",
                "Navigation.baths",
                "Navigation.specialty",
                "Navigation.services",
                "Navigation.formulas",
                "Navigation.salon",
                "Navigation.gallery",
                "Navigation.booking",
              ].map((key) => (
                <li
                  key={key}
                  className="group relative cursor-pointer transition-all hover:text-white"
                >
                  {t(key)}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand-yellow transition-all duration-300 group-hover:w-full" />
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="grid grow grid-cols-1 gap-12 px-6 py-32 md:py-36 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:px-16 xl:px-24 lg:mt-8">
          <div className="lg:col-start-1">
            <div className="flex flex-col justify-center space-y-10">
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-brand-yellow" />
                <span className="text-[0.65rem] uppercase tracking-[0.5em] text-brand-yellow">
                  {t("Hero.founded")}
                </span>
              </div>
              <h1 className="font-primary text-4xl uppercase leading-[0.92] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-[4vw]">
                <SplitText text={t("Hero.h1.part1")} />
                <br />
                <span className="italic font-light lowercase text-brand-yellow">
                  <SplitText text={t("Hero.h1.part2")} />
                </span>
                <SplitText text={t("Hero.h1.part3")} />
              </h1>
              <p className="max-w-2xl font-primary text-base uppercase leading-relaxed tracking-wide text-white/90 sm:text-lg lg:text-[1.05vw]">
                <SplitText text={t("Hero.tagline")} />
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:col-start-2 lg:row-span-2 lg:justify-end">
            <div className="relative aspect-4/5 w-full max-w-90 sm:max-w-120 md:max-w-137.5 lg:max-w-none lg:w-[92%] xl:w-[88%] hero-image opacity-0">
              <div className="relative h-full w-full overflow-hidden shadow-[0_50px_120px_rgba(0,0,0,0.85)]">
                <img
                  src={HeroImage}
                  alt="Hammam Ziani"
                  className="h-full w-full object-cover transition-all duration-[3s] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center lg:gap-10 lg:col-start-1 ">
            <Certificate
              topTitle="Excellence"
              bottomTitle="Tripadvisor"
              label="tripadvisor"
            />
            <Certificate bottomTitle="Google" label="google" />
          </div>
        </main>
      </section>
    </ContainerWithBg>
  );
}
