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
import CompanyHistory from "@/components/sections/CompanyHistory";
import CtaBand from "@/components/sections/CtaBand";
import SolutionHero from "@/components/sections/SolutionHero";
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
  { id: "vision", icon: Lightbulb },
  { id: "mission", icon: Target },
  { id: "coreValues", icon: Shield },
];

const coreValueItems = ["expertise", "agility", "humanCentric"] as const;

const CompanyPage = () => {
  const t = useTranslations("company");

  return (
    <main>
      <SolutionHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        image={companyImg}
      />

      <div className="mx-auto max-w-7xl px-8">
        <section className="space-y-8 break-keep py-32 text-center leading-tight">
          <h1>
            <p className="block font-semibold text-4xl text-gray-800">
              <span className="font-bold text-rhistle">RHISTLE</span> {t("intro.line1")}
            </p>
            <p className="block font-extrabold text-5xl text-gray-900 leading-normal tracking-tight">
              {t("intro.line2")} <br />
              {t("intro.line3")} <br />
              <span className="text-rhistle">{t("intro.line4")}</span>
              {t("intro.line5")}
            </p>
            <span className="block font-normal text-2xl text-gray-500">
              {t("intro.sub")} <br />
              {t("intro.sub2")}
            </span>
          </h1>
        </section>

        <section className="space-y-6 py-16">
          <p className="font-medium text-gray-500 text-xl">{t("industry.eyebrow")}</p>
          <h2 className="break-keep font-bold text-5xl">
            {t("industry.heading1")} <br />
            {t("industry.heading2")}
          </h2>

          <div className="space-y-8">
            {industries.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-6 rounded-3xl border border-gray-100 p-10 shadow-sm md:grid-cols-2 md:gap-0"
                >
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="rounded-2xl bg-blue-50 p-4 shadow-sm">
                        <Icon className="h-12 w-12 text-rhistle" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-3xl text-gray-900 tracking-tight">
                        {t(`industry.${item.id}.title`)}
                      </h3>
                      <p className="font-semibold text-rhistle text-sm">
                        {t(`industry.${item.id}.engTitle`)}
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-gray-400 tracking-tighter">
                        {t("industry.keyFocus")}
                      </p>
                      <p className="break-keep text-gray-600 text-lg leading-snug">
                        {t(`industry.${item.id}.focus`)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-bold text-gray-400 tracking-widest">
                      {t("industry.serviceScope")}
                    </p>
                    <ul className="space-y-3">
                      {t.raw(`industry.${item.id}.projects`).map((project: string) => (
                        <li
                          key={project}
                          className="flex items-center gap-3 break-keep text-gray-700 text-xl"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rhistle" />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-2 py-16 sm:space-y-4">
          <p className="font-medium text-gray-500 text-xl">{t("values.eyebrow")}</p>
          <h2 className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">
            {t("values.heading")}
          </h2>

          <div className="space-y-8">
            {companyValues.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.id}
                  className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-10 shadow-sm"
                >
                  {Icon && (
                    <Icon className="absolute right-0 bottom-0 h-35 w-35 text-blue-100 opacity-50" />
                  )}

                  <div className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 font-bold text-blue-900">
                      <span className="h-8 w-2 rounded-full bg-rhistle" />
                      {value.id === "vision"
                        ? "Vision"
                        : value.id === "mission"
                          ? "Mission"
                          : "Core Values"}
                    </h3>

                    {(value.id === "vision" || value.id === "mission") && (
                      <p className="break-keep text-gray-700 text-xl leading-relaxed">
                        {t(`values.${value.id}.text`)}
                      </p>
                    )}

                    {value.id === "coreValues" &&
                      coreValueItems.map((key) => (
                        <div key={key}>
                          <h4 className="font-bold text-blue-600 text-sm tracking-wide">
                            {t(`values.coreValues.${key}.subtitle`)}
                          </h4>
                          <p className="break-keep text-gray-700 text-xl leading-relaxed">
                            {t(`values.coreValues.${key}.description`)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <CompanyHistory />
      </div>

      <CtaBand href="/pdf/RHISTLE_Brochure.pdf" name="company" />
    </main>
  );
};
export default CompanyPage;
