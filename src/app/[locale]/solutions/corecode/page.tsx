import { Database, Factory, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import CallToAction from "@/components/CallToAction";
import SolutionHero from "@/components/SolutionHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "corecode" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const features = [{ id: "01" }, { id: "02" }, { id: "03" }, { id: "04" }, { id: "05" }];

const performanceData = [
  { id: "speedy", badge: "Speedy" },
  { id: "stable", badge: "Stable" },
  { id: "flexible", badge: "Flexible" },
];

const effectData = [
  { id: "factory", icon: Factory },
  { id: "database", icon: Database },
  { id: "trending", icon: TrendingUp },
];

const page = () => {
  const t = useTranslations("corecode");

  return (
    <main>
      <SolutionHero
        code={t("hero.code")}
        name={t("hero.name")}
        tagline={t("hero.tagline")}
        description={t("hero.description")}
      />

      <section className="mx-auto max-w-7xl space-y-16 px-8 py-20 md:text-lg xl:text-xl">
        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("overview.eyebrow")}</p>
          <p>{t("overview.p1")}</p>

          <div className="w-full max-w-7xl">
            <Image
              src="/image/corecode_overview_1.png"
              alt="corecode_overview_1"
              width={2525}
              height={1128}
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

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("keyFeatures.eyebrow")}</p>
          <p>{t("keyFeatures.desc")}</p>

          <div className="grid gap-4 md:grid-cols-3">
            {performanceData.map((item) => (
              <div
                key={item.id}
                className="space-y-4 rounded-3xl border border-gray-100 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="inline-block rounded-full bg-rhistle px-3 py-1 text-white">
                    {item.badge}
                  </p>
                  <p className="font-semibold text-rhistle">{t(`performance.${item.id}.title`)}</p>
                </div>
                <ul className="space-y-2 text-base">
                  {t.raw(`performance.${item.id}.descriptions`).map((desc: string) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("benefits.eyebrow")}</p>
          <p>{t("benefits.desc")}</p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {effectData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="space-y-10 rounded-3xl border border-gray-100 p-6 shadow-sm"
                >
                  <p className="text-center font-semibold">
                    {t(`effectData.${item.id}.title`)}
                    <br />
                    <span className="text-rhistle">{t(`effectData.${item.id}.highlight`)}</span>
                  </p>

                  <div className="flex justify-center">
                    <Icon className="h-8 w-8 text-rhistle" />
                  </div>

                  <ul className="space-y-2 text-base">
                    {t.raw(`effectData.${item.id}.descriptions`).map((desc: string) => (
                      <li key={desc}>{desc}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <hr className="text-gray-200" />

        <div className="space-y-6">
          <p className="font-bold text-rhistle">{t("functionalities.eyebrow")}</p>
          <p>{t("functionalities.desc")}</p>
          <div className="flex w-full flex-col gap-4">
            {features.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 shadow-sm transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-col p-6 sm:p-8">
                  {/* header (always visible) */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="font-black text-rhistle/30 transition-colors duration-500 group-hover:text-rhistle">
                        {item.id}
                      </span>
                      <h3 className="font-bold">{t(`features.${item.id}.title`)}</h3>
                    </div>

                    <div className="relative h-6 w-6">
                      <span className="absolute inset-0 m-auto h-0.5 w-4 bg-gray-400 transition-transform duration-500 group-hover:rotate-180" />
                      <span className="absolute inset-0 m-auto h-4 w-0.5 bg-gray-400 transition-transform duration-500 group-hover:rotate-90 group-hover:opacity-0" />
                    </div>
                  </div>

                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {t.raw(`features.${item.id}.desc`).map((line: string) => (
                          <li
                            key={line}
                            className="flex items-center gap-3 opacity-0 transition-all delay-100 duration-700 group-hover:opacity-100"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rhistle" />
                            <span className="leading-relaxed">{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-gray-200" />

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

      <CallToAction href="/pdf/CoreCode_Brochure.pdf" name="corecode" />
    </main>
  );
};
export default page;
