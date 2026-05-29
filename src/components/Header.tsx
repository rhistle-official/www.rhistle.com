"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
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

          <div className="group relative">
            <span className="flex cursor-default items-center gap-1">
              {t("solutions")}
              <ChevronDown className="size-4" aria-hidden="true" />
            </span>
            <div className="invisible absolute top-full left-0 z-40 min-w-44 translate-y-1 rounded-xl border border-gray-200 bg-white py-2 text-base text-gray-800 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link href="/solutions/corecode" className="block px-4 py-2 hover:bg-gray-100">
                CoreCode
              </Link>
              <p className="px-4 pt-3 pb-1 font-semibold text-gray-400 text-sm">Nexumm</p>
              <Link href="/solutions/lx" className="block px-4 py-2 pl-6 hover:bg-gray-100">
                LX
              </Link>
              <Link href="/solutions/vx" className="block px-4 py-2 pl-6 hover:bg-gray-100">
                VX
              </Link>
            </div>
          </div>
          <Link href="/company">{t("company")}</Link>
          <Link href="https://tech.rhistle.com" target="_blank" className="flex items-center">
            {t("blog")}
            <ArrowUpRight />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`rounded-4xl ${isScrolled ? "bg-gray-200" : "bg-gray-500"} px-3 py-2`}
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
