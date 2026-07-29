"use client";

import { useTranslations } from "next-intl";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Eyebrow from "@/components/ui/Eyebrow";

// Case text is sourced from messages (home.business.*); only the id is used here.
const cases = [{ id: "Case 01" }, { id: "Case 02" }, { id: "Case 03" }, { id: "Case 04" }];

const BusinessCases = () => {
  const t = useTranslations("home");

  return (
    <section className="container-page section">
      <Eyebrow>Business Cases</Eyebrow>
      <h2 className="break-keep font-bold text-h1">{t("business.title")}</h2>

      <Stagger className="mt-16 grid gap-8 lg:grid-cols-2">
        {cases.map((item) => (
          <StaggerItem key={item.id} className="card card-hover h-full space-y-8 p-8">
            <div>
              <p className="font-audiowide text-rhistle">{item.id}</p>
              <h3 className="font-bold text-3xl">{t(`business.${item.id}.title`)}</h3>
              <p>{t(`business.${item.id}.subtitle`)}</p>
            </div>

            <div className="space-y-2 md:space-y-4">
              <div>
                <h4 className="font-bold">Challenge</h4>
                <p className="break-keep">"{t(`business.${item.id}.challenge`)}"</p>
              </div>

              <div>
                <h4 className="font-bold">Solutions</h4>
                <ul className="space-y-2">
                  {t.raw(`business.${item.id}.solutions`).map((sol: string) => (
                    <li key={sol} className="break-keep">
                      - {sol}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-rhistle">Results</h4>
                  <ul className="space-y-2">
                    {t.raw(`business.${item.id}.results`).map((result: string) => (
                      <li key={result} className="break-keep">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-rhistle">Business Benefits</h4>
                  <ul className="space-y-2">
                    {t.raw(`business.${item.id}.benefits`).map((benefit: string) => (
                      <li key={benefit} className="break-keep">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};

export default BusinessCases;
