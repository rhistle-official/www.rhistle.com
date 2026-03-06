import { useTranslations } from "next-intl";
import ScrollDown from "./ScrollDown";

const HeroSection = () => {
  const t = useTranslations("home");

  return (
    <section className="relative h-screen w-full">
      <div className="absolute bottom-0 z-10 flex h-screen w-full items-center justify-between bg-linear-to-b from-80% from-transparent via-90% via-transparent to-100% to-black text-white" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-white md:gap-4 xl:gap-6">
        <h2 className="font-extrabold text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
          {t("hero.subtitle")}
        </h2>
        <h1 className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          {t("hero.title")}
        </h1>
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
        className="h-full w-full object-cover brightness-70"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </section>
  );
};
export default HeroSection;
