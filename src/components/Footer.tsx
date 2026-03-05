import Image from "next/image";
import { useTranslations } from "next-intl";
import gsImg from "../../public/images/gs.webp";
import innobizImg from "../../public/images/innobiz.webp";
import kiboImg from "../../public/images/kibo.webp";

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
    <footer className="border-gray-200 border-t py-20">
      <div className="mx-auto flex max-w-sm flex-col gap-8 sm:max-w-5xl xl:max-w-7xl">
        <div className="flex flex-col gap-8">
          <strong className="font-(family-name:--font-audiowide) text-rhistle text-xl sm:text-3xl xl:text-4xl">
            RHISTLE
          </strong>
          <address className="flex flex-col gap-1 text-xs not-italic md:text-base lg:text-lg">
            <div className="flex flex-wrap items-center gap-x-4">
              <strong className="font-bold">{t("name")}</strong>
              <span>{t("ceo")}</span>
            </div>
            <p>{t("address")}</p>
            <div className="flex items-center gap-2">
              <span>Tel: 02-3018-5114</span>
              <span>|</span>
              <span>FAX: 02-3018-3026</span>
            </div>
          </address>
        </div>
        <hr className="border-gray-200" />
        <div className="flex items-center justify-between">
          <small className="text-[0.5rem] md:text-base lg:text-lg">
            © {new Date().getFullYear()} RHISTLE. All rights reserved.
          </small>
          <ul className="flex gap-4 md:gap-6 lg:gap-8">
            {certifications.map((certification) => (
              <li
                key={certification.name}
                className="relative h-10 w-10 md:h-20 md:w-20 lg:h-30 lg:w-30"
              >
                <Image
                  src={certification.image}
                  alt={`${certification.name} 인증 마크`}
                  fill
                  sizes="100vw"
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
