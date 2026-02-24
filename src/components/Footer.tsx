import Image from "next/image";
import { useTranslations } from "next-intl";

const certifications = ["gs", "kibo", "innobiz"];

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="flex flex-col gap-8 bg-gray-100 p-10 md:p-15 lg:p-20">
      <div className="flex flex-col gap-8">
        <div className="flex w-30 items-center gap-2 md:w-35 lg:w-50">
          <Image
            src={"/rhistle_blue.png"}
            alt="RHISTLE 로고"
            width={200}
            height={58}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
        <address className="flex flex-col gap-1 text-xs not-italic md:text-base lg:text-lg">
          <div className="flex flex-wrap items-center gap-x-4">
            <p className="font-bold">{t("name")}</p>
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
      <hr className="text-gray-300" />
      <div className="flex items-center justify-between">
        <small className="text-[0.5rem] md:text-base lg:text-lg">
          © {new Date().getFullYear()} RHISTLE. All rights reserved.
        </small>
        <ul className="flex gap-4 md:gap-6 lg:gap-8">
          {certifications.map((certification) => (
            <li key={certification} className="w-10 md:w-20 lg:w-25">
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
