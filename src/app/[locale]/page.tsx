import { useTranslations } from "next-intl";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import BusinessCases from "@/components/sections/BusinessCases";
import CtaBand from "@/components/sections/CtaBand";
import PartnerGrid from "@/components/sections/PartnerGrid";
import ScrollDown from "@/components/sections/ScrollDown";
import SolutionShowcase from "@/components/sections/SolutionShowcase";
import StatsBand from "@/components/sections/StatsBand";
import GridLines from "@/components/ui/GridLines";

const HomePage = () => {
  const home = useTranslations("home");

  return (
    <main>
      <section className="relative h-screen w-full">
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

        <GridLines tone="onDark" className="z-10" />

        <div className="absolute bottom-0 z-10 flex h-screen w-full items-center justify-between bg-linear-to-b from-80% from-transparent via-90% via-transparent to-100% to-black text-white" />

        <Stagger className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-white md:gap-4 xl:gap-6">
          <StaggerItem>
            <h1 className="font-extrabold text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
              {home("hero.title")}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              {home("hero.subtitle")}
            </p>
          </StaggerItem>
        </Stagger>

        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
          <ScrollDown />
        </div>
      </section>

      <StatsBand />
      <BusinessCases />
      <SolutionShowcase />
      <PartnerGrid />

      <CtaBand href="/pdf/RHISTLE_Brochure.pdf" name="company" />
    </main>
  );
};

export default HomePage;
