import Image from "next/image";
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
  return (
    <section>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-20 px-8 py-20 md:gap-25 xl:gap-30">
        <span className="font-bold text-4xl md:text-5xl xl:text-6xl">
          Partners
        </span>
        <ul className="grid grid-cols-2 place-items-center gap-28 md:grid-cols-4 lg:grid-cols-4">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="relative h-30 w-30 md:h-40 md:w-40 xl:h-50 xl:w-50"
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
