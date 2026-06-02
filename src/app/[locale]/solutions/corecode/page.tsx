import { Database, Factory, Gauge, ShieldCheck, Shuffle, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import BenefitCard from "@/components/cards/BenefitCard";
import FeatureCard from "@/components/cards/FeatureCard";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/sections/PageHero";
import FeatureAccordion from "@/components/ui/FeatureAccordion";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "corecode" });

  return buildMetadata({
    locale,
    path: "/solutions/corecode",
    title: t("title"),
    description: t("description"),
  });
}

const features = [{ id: "01" }, { id: "02" }, { id: "03" }, { id: "04" }, { id: "05" }];

const performanceData = [
  { id: "speedy", badge: "Speedy", icon: <Gauge className="size-6" /> },
  { id: "stable", badge: "Stable", icon: <ShieldCheck className="size-6" /> },
  { id: "flexible", badge: "Flexible", icon: <Shuffle className="size-6" /> },
];

const effectData = [
  { id: "factory", icon: <Factory className="size-7" /> },
  { id: "database", icon: <Database className="size-7" /> },
  { id: "trending", icon: <TrendingUp className="size-7" /> },
];

const CoreCodePage = () => {
  const t = useTranslations("corecode");

  const functionalities = features.map((item) => ({
    id: item.id,
    title: t(`features.${item.id}.title`),
    desc: t.raw(`features.${item.id}.desc`) as string[],
  }));

  return (
    <main>
      <PageHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        description={t("hero.description")}
      />

      <section className="container-page section space-y-16 md:text-lg xl:text-xl">
        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("overview.eyebrow")}</p>
          <p>{t("overview.p1")}</p>

          <div className="w-full max-w-7xl">
            <Image
              src="/image/corecode_overview_1.png"
              alt="corecode_overview_1"
              width={2525}
              height={1128}
              loading="eager"
              className="h-auto w-full"
            />
          </div>

          <p>{t("overview.p2")}</p>

          <div className="grid gap-16 lg:grid-cols-2">
            <div className="w-full max-w-7xl">
              <Image
                src="/image/corecode_overview_2.png"
                alt="corecode_overview_2"
                width={1121}
                height={1054}
                className="h-auto w-full"
              />
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <p className="inline-block rounded-full bg-rhistle px-5 py-2 font-semibold text-white">
                  {t("highlights.eyebrow")}
                </p>

                <ul className="space-y-4">
                  {t.raw("highlights.items").map((item: { title: string; details: string[] }) => (
                    <li key={item.title}>
                      <p className="font-bold">{item.title}</p>
                      <ul className="pl-4 text-base">
                        {item.details.map((detail: string) => (
                          <li key={detail}>- {detail}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="inline-block rounded-full bg-rhistle px-5 py-2 font-semibold text-white">
                  {t("functionalityBadge")}
                </p>

                <ul className="space-y-2 text-base">
                  {t.raw("functionalityItems").map((func: string) => (
                    <li key={func}>{func}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("keyFeatures.eyebrow")}</p>
          <p>{t("keyFeatures.desc")}</p>

          <div className="grid gap-6 md:grid-cols-3">
            {performanceData.map((item, i) => (
              <FeatureCard
                key={item.id}
                badge={item.badge}
                title={t(`performance.${item.id}.title`)}
                descriptions={t.raw(`performance.${item.id}.descriptions`)}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </div>

        <hr className="divider" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("benefits.eyebrow")}</p>
          <p>{t("benefits.desc")}</p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {effectData.map((item, i) => (
              <BenefitCard
                key={item.id}
                title={t(`effectData.${item.id}.title`)}
                highlight={t(`effectData.${item.id}.highlight`)}
                descriptions={t.raw(`effectData.${item.id}.descriptions`)}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </div>

        <hr className="divider" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("functionalities.eyebrow")}</p>
          <p>{t("functionalities.desc")}</p>
          <FeatureAccordion items={functionalities} />
        </div>

        <hr className="divider" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("applications.eyebrow")}</p>
          <p>{t("applications.desc")}</p>
          <div className="w-full max-w-7xl">
            <Image
              src="/image/corecode_applications.png"
              alt="corecode_applications"
              width="1224"
              height="498"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <CtaBand href="/pdf/CoreCode_Brochure.pdf" name="corecode" />
    </main>
  );
};
export default CoreCodePage;
