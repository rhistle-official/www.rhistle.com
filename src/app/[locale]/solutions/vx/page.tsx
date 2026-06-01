import {
  ArrowRight,
  Cable,
  Eye,
  LayoutDashboard,
  ShieldAlert,
  Siren,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import BenefitCard from "@/components/cards/BenefitCard";
import FeatureCard from "@/components/cards/FeatureCard";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import SolutionHero from "@/components/sections/SolutionHero";
import FeatureAccordion from "@/components/ui/FeatureAccordion";
import SectionHeading from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nexumm" });

  return {
    title: t("vx.title"),
    description: t("vx.description"),
  };
}

const features = [
  { id: "visible", badge: "Visible", icon: <Eye className="size-6" /> },
  { id: "connected", badge: "Connected", icon: <Cable className="size-6" /> },
  { id: "proactive", badge: "Proactive", icon: <Siren className="size-6" /> },
];

const functionalityIds = ["01", "02", "03", "04", "05"];

const benefits = [
  { id: "layoutDashboard", icon: <LayoutDashboard className="size-7" /> },
  { id: "shieldAlert", icon: <ShieldAlert className="size-7" /> },
  { id: "trendingUp", icon: <TrendingUp className="size-7" /> },
];

const NexummVxPage = () => {
  const t = useTranslations("nexumm.vx");

  const functionalities = functionalityIds.map((id) => ({
    id,
    title: t(`functionalities.${id}.title`),
    desc: t.raw(`functionalities.${id}.desc`) as string[],
  }));

  return (
    <main>
      <SolutionHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        description={t("hero.description")}
      />

      <div className="mx-auto max-w-7xl space-y-28 px-8 py-24">
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
                  <div className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="font-bold text-lg text-rhistle">{item.title}</p>
                    <p className="mt-3 text-gray-600">{item.detail}</p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </section>

        {/* CoreCode synergy band */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-linear-to-br from-rhistle to-[#070d3d] p-8 text-white md:p-12">
            <p className="font-semibold text-sm text-white/70 uppercase tracking-widest">
              {t("sections.synergy.label")}
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-2xl bg-white/10 p-6 text-center">
                <p className="font-audiowide text-2xl">CoreCode</p>
                <p className="mt-2 text-white/70">{t("sections.synergy.corecodeSub")}</p>
              </div>
              <ArrowRight aria-hidden="true" className="mx-auto size-8 rotate-90 sm:rotate-0" />
              <div className="flex-1 rounded-2xl bg-white/20 p-6 text-center">
                <p className="font-audiowide text-2xl">Nexumm VX</p>
                <p className="mt-2 text-white/70">{t("sections.synergy.vxSub")}</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-white/80">{t("sections.synergy.description")}</p>
          </div>
        </Reveal>

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
                <div className="flex h-full items-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <ShieldAlert className="size-6 shrink-0 text-rhistle" />
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
export default NexummVxPage;
