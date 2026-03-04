import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import SolutionsSection from "@/components/SolutionsSection";
import StatsSection from "@/components/StatsSection";

const page = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <SolutionsSection />
      <PartnersSection />
    </main>
  );
};
export default page;
