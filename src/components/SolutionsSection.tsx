"use client";

import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";

const SolutionsSection = () => {
  const t = useTranslations("home");

  // 요소가 화면에 20%만 들어와도 작동하도록 threshold 조정
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section aria-labelledby="solutions-heading" className="bg-[#1428A0]">
      <div className="flex min-h-screen flex-col justify-center gap-20 p-10 md:p-15 lg:p-20">
        <h2
          id="solutions-heading"
          ref={ref1}
          className={`transition-all duration-1000 ${
            inView1 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          } font-bold text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl`}
        >
          Solutions
        </h2>
        <div
          ref={ref2}
          className={`grid grid-cols-1 gap-8 transition-all delay-300 duration-1000 md:gap-10 lg:grid-cols-2 ${
            inView2 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <article className="flex flex-col gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-xl md:gap-8 md:rounded-4xl md:p-8">
            <div className="group relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-[url(/corecode.jpg)] bg-center bg-cover font-bold text-3xl text-white md:h-80 md:rounded-3xl md:text-5xl">
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
              <p className="relative z-10" aria-hidden>
                CoreCode
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-black text-2xl text-slate-900 md:text-4xl">
                CoreCode
              </h3>
              <p className="text-base text-slate-600 leading-relaxed md:text-lg">
                {t("solutions.corecode")}
              </p>
            </div>
          </article>

          <article className="flex flex-col gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-xl md:gap-8 md:rounded-4xl md:p-8">
            <div className="group relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-[url(/nexumm.jpg)] bg-center bg-cover font-bold text-3xl text-white md:h-80 md:rounded-3xl md:text-5xl">
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
              <p className="relative z-10" aria-hidden>
                Nexumm
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-black text-2xl text-slate-900 md:text-4xl">
                Nexumm
              </h3>
              <p className="text-base text-slate-600 leading-relaxed md:text-lg">
                {t("solutions.nexumm")}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
