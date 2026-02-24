import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DrawerMenu from "./DrawerMenu";
import LocaleSwitcher from "./LocaleSwitcher";

const Navigation = ({ isScrolled }: { isScrolled: boolean }) => {
  const t = useTranslations("header");

  return (
    <nav>
      <ul className="flex items-center justify-between">
        <li>
          <Link
            href="/"
            className="flex w-30 items-center gap-2 md:w-35 lg:w-50"
          >
            <Image
              src={`${isScrolled ? "/rhistle_blue.png" : "/rhistle_white.png"}`}
              alt="RHISTLE 로고"
              width={200}
              height={58}
              priority
              className="h-auto w-full object-contain"
            />
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
            className="flex items-center"
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
