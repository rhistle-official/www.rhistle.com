"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileNav from "./MobileNav";

const SiteHeader = () => {
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
      className={`fixed z-30 w-full py-3 font-bold md:py-4 xl:py-5 ${isScrolled ? "border-line border-b bg-white" : "bg-transparent text-white"}`}
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
            <p>{t("solutions")}</p>
            <div className="card invisible absolute top-full left-0 z-40 flex translate-y-1 flex-col gap-2 p-4 text-base text-graphite opacity-0 shadow-raise transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link href="/solutions/corecode" className="hover:text-rhistle">
                CoreCode
              </Link>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-mist text-sm">Nexumm</p>
                <div className="flex flex-col gap-2">
                  <Link href="/solutions/lx" className="hover:text-rhistle">
                    LX
                  </Link>
                  <Link href="/solutions/vx" className="hover:text-rhistle">
                    VX
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link href="/company">{t("company")}</Link>
          <Link href="https://tech.rhistle.com" target="_blank" className="flex items-center">
            {t("blog")}
            <ArrowUpRight aria-hidden="true" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`rounded-md px-3 py-2 ${isScrolled ? "bg-brand-50 text-rhistle" : "bg-white/15 text-white"}`}
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
            <MobileNav />
            <LocaleSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default SiteHeader;
