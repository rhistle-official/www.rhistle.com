import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

const Navigation = ({ isScrolled }: { isScrolled: boolean }) => {
  const t = useTranslations("header");

  return (
    <nav>
      <ul className="flex items-center justify-between text-xl">
        <h1>
          <li>
            <Link
              href="/"
              className={`font-(family-name:--font-audiowide) text-3xl ${isScrolled ? "text-rhistle" : "text-white"}`}
            >
              RHISTLE
            </Link>
          </li>
        </h1>
        <li>
          <Link href="/solutions/corecode">{t("solutions")}</Link>
        </li>
        <li>
          <Link href="/company">{t("company")}</Link>
        </li>
        <li>
          <Link href="/inquiry">{t("inquiry")}</Link>
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
