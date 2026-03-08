import BusinessCase from "@/components/BusinessCase";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Solutions from "@/components/Solutions";
import Stats from "@/components/Stats";

const page = () => {
  return (
    <main>
      <Hero />
      <Stats />
      <BusinessCase />
      <Solutions />
      <Partners />
    </main>
  );
};
export default page;
