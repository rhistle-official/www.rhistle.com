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

const Partners = () => {
  return (
    <section>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-10 px-8 py-20">
        <div className="space-y-4">
          <h2 className="font-medium text-gray-500 text-xl">Partners</h2>
          <p className="break-keep font-bold text-5xl">
            리슬과 함께하는 혁신 파트너
          </p>
        </div>
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
                sizes="(min-width: 1280px) 200px, (min-width: 768px) 160px, 120px"
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Partners;
