import {
  Boxes,
  Crosshair,
  Layers,
  PackageSearch,
  Route,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import BenefitCard from "@/components/cards/BenefitCard";
import FeatureCard from "@/components/cards/FeatureCard";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import FeatureAccordion from "@/components/ui/FeatureAccordion";
import SectionHeading from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nexumm" });

  return buildMetadata({
    locale,
    path: "/solutions/lx",
    description: t("lx.description"),
  });
}

const features = [
  { id: "accurate", badge: "Accurate", icon: <Crosshair className="size-6" /> },
  { id: "traceable", badge: "Traceable", icon: <Route className="size-6" /> },
  { id: "scalable", badge: "Scalable", icon: <Layers className="size-6" /> },
];

const functionalityIds = ["01", "02", "03", "04", "05"];

const benefits = [
  { id: "packageSearch", icon: <PackageSearch className="size-7" /> },
  { id: "trendingUp", icon: <TrendingUp className="size-7" /> },
  { id: "boxes", icon: <Boxes className="size-7" /> },
];

const NexummLxPage = () => {
  const t = useTranslations("nexumm.lx");

  const functionalities = functionalityIds.map((id) => ({
    id,
    title: t(`functionalities.${id}.title`),
    desc: t.raw(`functionalities.${id}.desc`) as string[],
  }));

  return (
    <main>
      <PageHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        description={t("hero.description")}
      />

      <div className="container-page section space-y-28">
        {/* Overview + Highlights */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow={t("sections.overview.eyebrow")}
              title={t("sections.overview.title")}
              description={t("sections.overview.description")}
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw("highlights.items") as Array<{ title: string; detail: string }>).map(
              (item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="card card-hover h-full p-6">
                    <p className="font-bold text-lg text-rhistle">{item.title}</p>
                    <p className="mt-3 text-graphite">{item.detail}</p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow={t("sections.keyFeatures.eyebrow")}
              title={t("sections.keyFeatures.title")}
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, i) => (
              <FeatureCard
                key={item.id}
                badge={item.badge}
                title={t(`features.${item.id}.title`)}
                descriptions={t.raw(`features.${item.id}.descriptions`) as string[]}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Functionalities */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow={t("sections.functionalities.eyebrow")}
              title={t("sections.functionalities.title")}
              description={t("sections.functionalities.description")}
            />
          </Reveal>
          <Reveal>
            <FeatureAccordion items={functionalities} />
          </Reveal>
        </section>

        {/* Business Benefits */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow={t("sections.benefits.eyebrow")}
              title={t("sections.benefits.title")}
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item, i) => (
              <BenefitCard
                key={item.id}
                title={t(`benefits.${item.id}.title`)}
                highlight={t(`benefits.${item.id}.highlight`)}
                descriptions={t.raw(`benefits.${item.id}.descriptions`) as string[]}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow={t("sections.applications.eyebrow")}
              title={t("sections.applications.title")}
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(t.raw("applications.items") as string[]).map((app, i) => (
              <Reveal key={app} delay={i * 0.08}>
                <div className="card card-hover flex h-full items-center gap-3 p-6">
                  <Warehouse className="size-6 shrink-0 text-rhistle" />
                  <span className="font-medium">{app}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <CtaBand />
    </main>
  );
};
export default NexummLxPage;
