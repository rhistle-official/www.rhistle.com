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
    <section className="overflow-hidden bg-linear-to-b from-black to-[#1428A0] text-white">
      <div className="mx-auto flex min-h-screen max-w-400 flex-col justify-center gap-20 p-6 md:p-15 lg:p-20">
        <div
          ref={ref1}
          className={`transition-all duration-1000 ${
            inView1 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } flex flex-col gap-4`}
        >
          <p className="font-medium text-blue-400 uppercase tracking-widest md:text-lg lg:text-xl">
            since 2005
          </p>
          <h2 className="font-bold text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-7xl">
            {t("stats.first")}
            <br />
            {t("stats.second")}
          </h2>
        </div>
        <ul
          ref={ref2}
          className={`grid grid-cols-1 gap-12 transition-all delay-300 duration-1000 md:grid-cols-3 md:gap-8 lg:gap-16 ${
            inView2 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <li className="flex flex-col gap-3 md:gap-5">
            <Newspaper className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              {inView2 && <CountUp end={400} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <p className="font-semibold text-base text-gray-300 uppercase tracking-tighter md:text-xl lg:text-2xl">
              Solutions Deployed
            </p>
          </li>

          {/* 통계 아이템 2 */}
          <li className="flex flex-col gap-3 border-white/10 border-t pt-8 md:gap-5 md:border-none md:pt-0">
            <Users className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              {inView2 && <CountUp end={50} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <p className="font-semibold text-base text-gray-300 uppercase tracking-tighter md:text-xl lg:text-2xl">
              Customers
            </p>
          </li>

          <li className="flex flex-col gap-3 border-white/10 border-t pt-8 md:gap-5 md:border-none md:pt-0">
            <FolderKanban className="text-blue-400" size={32} aria-hidden />
            <div className="flex font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              {inView2 && <CountUp end={220} duration={1000} />}
              <span className="text-4xl text-blue-400 md:text-6xl">+</span>
            </div>
            <p className="font-semibold text-base text-gray-300 uppercase tracking-tighter md:text-xl lg:text-2xl">
              Projects Completed
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
