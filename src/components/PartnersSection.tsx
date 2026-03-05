"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import hyundaiAutoeverImg from "../../public/images/hyundaiAutoever.png";
import kpmgImg from "../../public/images/kpmg.png";
import lgCNSImg from "../../public/images/lgCNS.png";
import poscoICTImg from "../../public/images/poscoICT.png";
import pwcImg from "../../public/images/pwc.png";
import samsungSDSImg from "../../public/images/samsungSDS.png";
import skCnCImg from "../../public/images/skCnC.png";
import thiraImg from "../../public/images/thira.png";

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
const PartnersSection = () => {
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section>
      <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-around sm:max-w-5xl xl:max-w-7xl">
        <span
          ref={ref1}
          className={`font-bold text-4xl md:text-5xl lg:text-6xl ${inView1 ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
        >
          Partners
        </span>
        <ul
          ref={ref2}
          className={`grid grid-cols-2 place-items-center gap-28 md:grid-cols-4 lg:grid-cols-4 ${inView2 ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
        >
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="relative h-20 w-20 sm:h-30 sm:w-30 xl:h-50 xl:w-50"
            >
              <Image
                src={partner.image}
                alt={partner.name}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default PartnersSection;
