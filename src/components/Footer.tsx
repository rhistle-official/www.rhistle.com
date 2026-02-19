import Image from "next/image";
import { useTranslations } from "next-intl";

const certifications = ["gs", "kibo", "innobiz"];

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex flex-col gap-8 bg-neutral-950 p-10 text-gray-400 md:p-15 lg:p-20">
      <div className="flex flex-col gap-8">
        <div className="flex w-10 items-center gap-2 font-bold text-xl md:w-15 md:text-3xl lg:w-20 lg:text-5xl">
          <Image
            src={"/logo_white.webp"}
            alt="logo"
            width={80}
            height={80}
            className="h-auto w-full object-contain"
          />
          <p className="text-white">RHISTLE</p>
        </div>
        <address className="flex flex-col gap-1 text-sm not-italic md:text-base lg:text-lg">
          <div className="flex flex-wrap items-center gap-x-4">
            <p className="font-bold text-white">{t("name")}</p>
            <p>{t("ceo")}</p>
          </div>
          <p>{t("address")}</p>
          <div className="flex items-center gap-2">
            <p>Tel: 02-3018-5114</p>
            <span>|</span>
            <p>FAX: 02-3018-3026</p>
          </div>
        </address>
      </div>
      <hr className="text-gray-800" />
      <div className="flex items-center justify-between">
        <small className="text-xs md:text-base lg:text-lg">
          © {new Date().getFullYear()} RHISTLE. All rights reserved.
        </small>
        <ul className="flex gap-8">
          {certifications.map((certification) => (
            <li key={certification} className="w-5 md:w-15 lg:w-20">
              <Image
                src={`/${certification}.webp`}
                alt={`${certification} 인증 마크`}
                width={120}
                height={120}
                className="h-auto w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
