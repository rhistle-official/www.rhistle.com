"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import { buttonClass } from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { Link } from "@/i18n/navigation";
import corecodeImg from "@/public/image/corecode.jpg";
import nexummImg from "@/public/image/nexumm.jpg";

const solutions = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
    image: corecodeImg,
    translationKey: "solutions.corecode",
  },
  {
    name: "Nexumm",
    href: "/solutions/lx",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
];

const SolutionShowcase = () => {
  const t = useTranslations("home");

  return (
    <section className="container-page section">
      <Eyebrow>Solutions</Eyebrow>
      <h2 className="break-keep font-bold text-h1">{t("solutions.title")}</h2>

      <div className="mt-16 flex flex-col gap-24">
        {solutions.map((solution, index) => (
          <Reveal key={solution.name}>
            <div
              className={`grid items-center gap-12 md:grid-cols-2 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="card relative h-90 overflow-hidden">
                <Image
                  src={solution.image}
                  alt={solution.name}
                  fill
                  sizes="360px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="space-y-4">
                <p className="font-bold text-h2">{solution.name}</p>
                <p>{t(solution.translationKey)}</p>
                <Link href={solution.href} className={buttonClass("link")}>
                  {t("solutions.goto")}
                  <ArrowRight aria-hidden size={18} />
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SolutionShowcase;
