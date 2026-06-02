"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import hyundaiAutoeverImg from "@/public/image/hyundaiAutoever.png";
import kpmgImg from "@/public/image/kpmg.png";
import lgCNSImg from "@/public/image/lgCNS.png";
import poscoICTImg from "@/public/image/poscoICT.png";
import pwcImg from "@/public/image/pwc.png";
import samsungSDSImg from "@/public/image/samsungSDS.png";
import skCnCImg from "@/public/image/skCnC.png";
import thiraImg from "@/public/image/thira.png";

const partners = [
  { name: "hyundaiAutoever", image: hyundaiAutoeverImg },
  { name: "lgCNS", image: lgCNSImg },
  { name: "poscoICT", image: poscoICTImg },
  { name: "samsungSDS", image: samsungSDSImg },
  { name: "skCnC", image: skCnCImg },
  { name: "thira", image: thiraImg },
  { name: "kpmg", image: kpmgImg },
  { name: "pwc", image: pwcImg },
];

const PartnerGrid = () => {
  const t = useTranslations("home");

  return (
    <section className="container-page section">
      <Eyebrow>Partners</Eyebrow>
      <h2 className="break-keep font-bold text-h1">{t("partners")}</h2>

      <ul className="mt-16 grid grid-cols-2 place-items-center gap-12 md:grid-cols-4">
        {partners.map((partner, i) => (
          <li key={partner.name} className="relative h-30 w-30 md:h-40 md:w-40 xl:h-50 xl:w-50">
            <Reveal delay={i * 0.06} className="absolute inset-0">
              <Image
                src={partner.image}
                alt={`${partner.name} 로고`}
                fill
                sizes="(min-width: 1280px) 200px, (min-width: 768px) 160px, 120px"
                className="object-contain grayscale transition hover:grayscale-0"
              />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PartnerGrid;
