"use client";

import { FolderKanban, Newspaper, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import CountUp from "./CountUp";

const StatsSection = () => {
  const t = useTranslations("home");
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="bg-linear-to-b from-black to-rhistle text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-15 px-8 py-20 md:gap-25 xl:gap-30">
        <div className="flex flex-col gap-4">
          <p className="text-blue-400 text-xl tracking-widest">SINCE 2005</p>
          <p className="font-bold text-4xl leading-tight md:text-5xl xl:text-6xl">
            {t("stats.first")}
            <br />
            {t("stats.second")}
          </p>
        </div>
        <ul
          ref={ref}
          className={`flex flex-col justify-between gap-12 transition-all delay-300 duration-1000 md:flex-row ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <li className="flex flex-col gap-5">
            <Newspaper className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-bold text-7xl md:text-8xl xl:text-9xl">
              {inView && <CountUp end={400} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <span className="font-semibold text-xl xl:text-2xl">
              SOLUTIONS DEPLOYED
            </span>
          </li>

          {/* 통계 아이템 2 */}
          <li className="flex flex-col gap-5">
            <Users className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-bold text-7xl md:text-8xl xl:text-9xl">
              {inView && <CountUp end={50} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <span className="font-semibold text-xl xl:text-2xl">CUSTOMERS</span>
          </li>

          <li className="flex flex-col gap-5">
            <FolderKanban className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-bold text-7xl md:text-8xl xl:text-9xl">
              {inView && <CountUp end={220} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <span className="font-semibold text-xl xl:text-2xl">
              PROJECTS COMPLETED
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
