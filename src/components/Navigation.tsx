import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const Navigation = () => {
  const t = useTranslations("header");

  return (
    <nav className="mx-auto max-w-400 px-10 md:px-15 md:text-lg lg:px-20 lg:text-xl">
      <ul className="flex h-24 items-center justify-between">
        <li>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo_white.webp"}
              alt="RHISTLE 로고"
              width={30}
              height={30}
            />
            <p>RHISTLE</p>
          </Link>
        </li>

        <li>
          <Link href="/solutions">{t("solutions")}</Link>
        </li>
        <li>
          <Link href="/company">{t("company")}</Link>
        </li>
        <li>
          <Link href="/contact">{t("contact")}</Link>
        </li>
        <li>
          <Link
            href="https://tech.rhistle.com"
            target="_blank"
            className="flex items-center justify-center"
          >
            {t("blog")}
            <ArrowUpRight />
          </Link>
        </li>
        <li>
          <LocaleSwitcher />
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
