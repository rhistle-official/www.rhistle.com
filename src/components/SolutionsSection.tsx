"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import corecodeImg from "../../public/images/corecode.jpg";
import nexummImg from "../../public/images/nexumm.jpg";

const solutions = [
  {
    name: "CoreCode",
    image: corecodeImg,
    translationKey: "solutions.corecode",
  },
  {
    name: "Nexumm",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
];

const SolutionsSection = () => {
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
    <section className="bg-rhistle">
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-around gap-y-16 py-16 md:max-w-3xl md:py-0 xl:max-w-7xl">
        <span
          ref={ref1}
          className={`font-bold text-4xl text-white md:text-5xl lg:text-6xl ${inView1 ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
        >
          Solutions
        </span>
        <div
          ref={ref2}
          className={`flex flex-col gap-8 duration-1000 md:flex-row ${
            inView2 ? "animate-fade-in-up opacity-100" : "opacity-0"
          }`}
        >
          {solutions.map((solution) => (
            <article
              key={solution.name}
              className="overflow-hidden rounded-4xl bg-white shadow-xl"
            >
              <div className="relative h-50 md:h-70 xl:h-80">
                <Image
                  src={solution.image}
                  alt="corecode"
                  fill
                  sizes="100vw"
                  className="object-cover brightness-70"
                />
                <span className="absolute inset-0 flex items-center justify-center text-4xl text-white">
                  {solution.name}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <span className="font-extrabold text-2xl text-slate-900 md:text-4xl">
                  {solution.name}
                </span>
                <p className="text-base text-slate-600 md:text-lg">
                  {t(solution.translationKey)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
