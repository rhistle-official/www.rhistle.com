"use client";

import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import ScrollDown from "./ScrollDown";

const HeroSection = () => {
  const t = useTranslations("home");
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <main className="relative h-screen w-full">
      <div className="absolute bottom-0 z-10 flex h-screen w-full items-center justify-between bg-linear-to-b from-80% from-transparent via-90% via-transparent to-100% to-black text-white" />
      <div
        ref={ref}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 text-white transition-opacity duration-1000 md:gap-6 lg:gap-8 ${inView ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="font-black text-md md:text-4xl lg:text-7xl">
          {t("hero.title")}
        </h1>
        <h2 className="font-extrabold text-[0.5rem] md:text-lg lg:text-4xl">
          {t("hero.subtitle")}
        </h2>
      </div>
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <ScrollDown />
      </div>
      <video
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        className="h-full w-full object-cover brightness-75"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </main>
  );
};
export default HeroSection;
