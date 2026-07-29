"use client";

import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import Eyebrow from "@/components/ui/Eyebrow";

const yearIds = [
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2018",
  "2017",
  "2016",
  "2015",
  "2014",
  "2013",
  "2012",
  "2011",
  "2010",
  "2009",
  "2008",
  "2007",
  "2006",
  "2005",
] as const;

const CompanyHistory = () => {
  const t = useTranslations("history");
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2">
      <div className={`${inView && "md:sticky md:top-24"} space-y-2 self-start sm:space-y-4`}>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="break-keep font-bold text-h2 text-ink">{t("heading")}</h2>
        <p className="mt-4 max-w-xs text-graphite leading-relaxed">
          {t("description1")} {t("description2")}
        </p>
      </div>

      <div className="space-y-12 border-line border-l py-2 pl-6">
        {yearIds.map((year) => (
          <div key={year} className="relative">
            <span className="absolute top-2 -left-7.25 size-2 rounded-full bg-rhistle" />
            <div className="font-bold text-2xl text-ink">{t(`entries.${year}.date`)}</div>

            <ul className="space-y-2 text-graphite">
              {t.raw(`entries.${year}.items`).map((item: string) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CompanyHistory;
