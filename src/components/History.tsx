"use client";

import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

const yearIds = [
  "2025",
  "2024",
  "2023",
  "2022",
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

const History = () => {
  const t = useTranslations("history");
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2">
      <div className={`${inView && "md:sticky md:top-21.25"} space-y-2 self-start sm:space-y-4`}>
        <p className="font-medium text-gray-500 text-xl">{t("eyebrow")}</p>
        <h2 className="break-keep font-bold text-3xl md:text-4xl xl:text-5xl">{t("heading")}</h2>
        <p className="mt-4 max-w-xs text-gray-600 leading-relaxed">
          {t("description1")} {t("description2")}
        </p>
      </div>

      <div className="space-y-12 py-2">
        {yearIds.map((year) => (
          <div key={year}>
            <div className="font-bold text-2xl text-gray-900">{t(`entries.${year}.date`)}</div>

            <ul className="space-y-2 text-gray-600">
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
export default History;
