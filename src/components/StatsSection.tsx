"use client";

import { FolderKanban, Newspaper, Users } from "lucide-react"; // 아이콘 다양화
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import CountUp from "./CountUp";

const StatsSection = () => {
  const t = useTranslations("home");
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="bg-linear-to-b from-black to-rhistle text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-around md:max-w-3xl xl:max-w-7xl">
        <div
          ref={ref1}
          className={`${
            inView1 ? "animate-fade-in-up opacity-100" : "opacity-0"
          } flex flex-col gap-4`}
        >
          <p className="font-medium text-blue-400 uppercase tracking-widest md:text-lg lg:text-xl">
            since 2005
          </p>
          <h2 className="font-bold text-4xl leading-tight md:text-5xl xl:text-6xl">
            {t("stats.first")}
            <br />
            {t("stats.second")}
          </h2>
        </div>
        <ul
          ref={ref2}
          className={`flex flex-col justify-between gap-12 transition-all delay-300 duration-1000 md:flex-row ${
            inView2 ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
        >
          <li className="flex flex-col gap-3 md:gap-5">
            <Newspaper className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-black text-7xl md:text-8xl xl:text-9xl">
              {inView2 && <CountUp end={400} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <span className="font-semibold text-base text-gray-300 md:text-xl xl:text-2xl">
              SOLUTIONS DEPLOYED
            </span>
          </li>

          {/* 통계 아이템 2 */}
          <li className="flex flex-col gap-3 border-white/10 border-t pt-8 md:gap-5 md:border-none md:pt-0">
            <Users className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-black text-7xl md:text-8xl xl:text-9xl">
              {inView2 && <CountUp end={50} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <span className="font-semibold text-base text-gray-300 md:text-xl xl:text-2xl">
              CUSTOMERS
            </span>
          </li>

          <li className="flex flex-col gap-3 border-white/10 border-t pt-8 md:gap-5 md:border-none md:pt-0">
            <FolderKanban className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-black text-7xl md:text-8xl xl:text-9xl">
              {inView2 && <CountUp end={220} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <span className="font-semibold text-base text-gray-300 md:text-xl xl:text-2xl">
              PROJECTS COMPLETED
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
