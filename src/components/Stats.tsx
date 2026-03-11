"use client";

import { FolderKanban, Newspaper, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import CountUp from "./CountUp";

const StatsItems = [
  { name: "Solutions Deployed", icon: Newspaper, endValue: 400 },
  { name: "Customers", icon: Users, endValue: 50 },
  { name: "Projects Completed", icon: FolderKanban, endValue: 220 },
];

const Stats = () => {
  const t = useTranslations("home");
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="bg-linear-to-b from-black to-rhistle text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-20 px-8 py-20">
        <div className="space-y-2 md:space-y-4">
          <p className="text-blue-400 md:text-lg xl:text-xl">Since 2005</p>
          <p className="font-bold text-3xl leading-tight md:text-4xl xl:text-5xl">
            {t("stats.first")}
            <br />
            {t("stats.second")}
          </p>
        </div>
        <ul
          ref={ref}
          className={`flex flex-col justify-between gap-12 transition-all delay-300 duration-1000 md:flex-row ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {StatsItems.map(({ name, icon: Icon, endValue }) => (
            <li key={name} className="flex flex-col gap-5">
              <Icon className="text-blue-400" size={32} aria-hidden />
              <div className="flex font-bold">
                {inView && <CountUp end={endValue} duration={1000} />}
                <p className="text-3xl text-blue-400 md:text-4xl xl:text-5xl">
                  +
                </p>
              </div>
              <p className="font-semibold md:text-lg xl:text-xl">{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Stats;
