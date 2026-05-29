import Image from "next/image";
import { useTranslations } from "next-intl";
import gsImg from "../../public/image/gs.webp";
import innobizImg from "../../public/image/innobiz.webp";
import kiboImg from "../../public/image/kibo.webp";

const certifications = [
  {
    name: "gs",
    image: gsImg,
  },
  {
    name: "innobiz",
    image: innobizImg,
  },
  {
    name: "kibo",
    image: kiboImg,
  },
];

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="border-gray-200 border-t py-10 md:py-15 xl:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-8 md:text-lg xl:text-xl">
        <div className="flex flex-col gap-8">
          <strong className="font-audiowide text-3xl text-rhistle">RHISTLE</strong>
          <address className="flex flex-col gap-1 not-italic">
            <div className="flex flex-wrap items-center gap-x-4">
              <strong className="font-bold">{t("name")}</strong>
              <p>{t("ceo")}</p>
            </div>
            <p>{t("address")}</p>
            <div className="flex items-center gap-2">
              <p>Tel: 02-3018-5114</p>
              <p>|</p>
              <p>FAX: 02-3018-3026</p>
            </div>
          </address>
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center justify-between">
          <small>© {new Date().getFullYear()} RHISTLE. All rights reserved.</small>
          <ul className="flex gap-4 md:gap-6 lg:gap-8">
            {certifications.map((certification) => (
              <li
                key={certification.name}
                className="relative h-10 w-10 md:h-20 md:w-20 lg:h-30 lg:w-30"
              >
                <Image
                  src={certification.image}
                  alt={t("certificationAlt", { name: certification.name })}
                  fill
                  sizes="(min-width: 1024px) 120px, (min-width: 768px) 80px, 40px"
                  className="object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
