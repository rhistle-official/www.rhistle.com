import {
  BatteryCharging,
  Building2,
  Car,
  Cpu,
  FlaskConical,
  Lightbulb,
  Shield,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import IndustryCard from "@/components/cards/IndustryCard";
import ValueCard from "@/components/cards/ValueCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import CompanyHistory from "@/components/sections/CompanyHistory";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import { buildMetadata } from "@/lib/seo";
import companyImg from "@/public/image/company.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });

  return buildMetadata({
    locale,
    path: "/company",
    title: t("title"),
    description: t("description"),
  });
}

const industries = [
  { id: "semiconductor", icon: Cpu },
  { id: "battery", icon: BatteryCharging },
  { id: "bio", icon: FlaskConical },
  { id: "automotive", icon: Car },
  { id: "general", icon: Building2 },
];

const companyValues = [
  { id: "vision", icon: Lightbulb, label: "Vision" },
  { id: "mission", icon: Target, label: "Mission" },
  { id: "coreValues", icon: Shield, label: "Core Values" },
] as const;

const coreValueItems = ["expertise", "agility", "humanCentric"] as const;

const CompanyPage = () => {
  const t = useTranslations("company");

  return (
    <main>
      <PageHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        image={companyImg}
      />

      <section className="container-page section">
        <div className="mx-auto max-w-3xl space-y-6 break-keep text-center">
          <p className="font-semibold text-graphite text-h2">
            <span className="font-bold text-rhistle">RHISTLE</span> {t("intro.line1")}
          </p>
          <p className="font-extrabold text-h1 text-ink tracking-tight">
            {t("intro.line2")} {t("intro.line3")}{" "}
            <span className="text-rhistle">{t("intro.line4")}</span>
            {t("intro.line5")}
          </p>
          <p className="text-h3 text-steel leading-relaxed">
            {t("intro.sub")} {t("intro.sub2")}
          </p>
        </div>
      </section>

      <section className="container-page section">
        <Eyebrow>{t("industry.eyebrow")}</Eyebrow>
        <h2 className="mt-3 break-keep font-bold text-h1 text-ink">
          {t("industry.heading1")} {t("industry.heading2")}
        </h2>

        <Stagger className="mt-12 space-y-8">
          {industries.map((item) => (
            <StaggerItem key={item.id}>
              <IndustryCard
                Icon={item.icon}
                title={t(`industry.${item.id}.title`)}
                engTitle={t(`industry.${item.id}.engTitle`)}
                keyFocusLabel={t("industry.keyFocus")}
                focus={t(`industry.${item.id}.focus`)}
                serviceScopeLabel={t("industry.serviceScope")}
                projects={t.raw(`industry.${item.id}.projects`)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-page section">
        <Eyebrow>{t("values.eyebrow")}</Eyebrow>
        <h2 className="mt-3 break-keep font-bold text-h1 text-ink">{t("values.heading")}</h2>

        <Stagger className="mt-12 space-y-8">
          {companyValues.map((value) => (
            <StaggerItem key={value.id}>
              <ValueCard Icon={value.icon} label={value.label}>
                {(value.id === "vision" || value.id === "mission") && (
                  <p className="break-keep text-graphite text-lg leading-relaxed">
                    {t(`values.${value.id}.text`)}
                  </p>
                )}

                {value.id === "coreValues" &&
                  coreValueItems.map((key) => (
                    <div key={key}>
                      <h4 className="font-semibold text-rhistle text-sm tracking-wide">
                        {t(`values.coreValues.${key}.subtitle`)}
                      </h4>
                      <p className="break-keep text-graphite text-lg leading-relaxed">
                        {t(`values.coreValues.${key}.description`)}
                      </p>
                    </div>
                  ))}
              </ValueCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <div className="container-page">
        <CompanyHistory />
      </div>

      <CtaBand href="/pdf/RHISTLE_Brochure.pdf" name="company" />
    </main>
  );
};
export default CompanyPage;
