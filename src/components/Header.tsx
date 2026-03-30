"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import DrawerMenu from "./DrawerMenu";
import LocaleSwitcher from "./LocaleSwitcher";

const Header = () => {
  const t = useTranslations("header");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-30 w-full py-3 font-bold md:py-4 xl:py-5 ${isScrolled ? "border-gray-200 border-b bg-white" : "bg-transparent text-white"}`}
    >
      <nav className="mx-auto max-w-7xl px-8 text-xl">
        <div className="hidden items-center justify-between md:flex">
          <h1>
            <Link
              href="/"
              className={`font-audiowide text-3xl ${isScrolled ? "text-rhistle" : "text-white"}`}
            >
              RHISTLE
            </Link>
          </h1>

          <Link href="/solutions">{t("solutions")}</Link>
          <Link href="/company">{t("company")}</Link>
          <Link
            href="https://tech.rhistle.com"
            target="_blank"
            className="flex items-center"
          >
            {t("blog")}
            <ArrowUpRight />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`rounded-full ${isScrolled ? "bg-gray-200" : "bg-gray-500"} px-3 py-2`}
            >
              {t("contact")}
            </Link>
            <LocaleSwitcher />
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <h1>
            <Link
              href="/"
              className={`font-audiowide text-3xl ${isScrolled ? "text-rhistle" : "text-white"}`}
            >
              RHISTLE
            </Link>
          </h1>
          <div className="flex items-center gap-4">
            <DrawerMenu />
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
