import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";

const MobileNav = () => {
  const t = useTranslations("header");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="cursor-pointer" aria-label={t("menu")}>
          <Menu />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-surface text-ink">
        <SheetHeader>
          <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
          <SheetDescription className="sr-only">{t("menuDescription")}</SheetDescription>
        </SheetHeader>
        <nav className="mt-6">
          <ul className="flex flex-col gap-6 font-medium text-ink text-lg">
            <li>
              <details className="group">
                <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-1 py-4 hover:bg-surface-2 hover:text-rhistle">
                  {t("solutions")}
                  <ChevronDown
                    className="size-4 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="flex flex-col text-base">
                  <li>
                    <SheetClose asChild>
                      <Link
                        href="/solutions/corecode"
                        className="flex w-full items-center justify-center py-3 hover:bg-surface-2 hover:text-rhistle"
                      >
                        CoreCode
                      </Link>
                    </SheetClose>
                  </li>
                  <li className="py-2 text-center font-semibold text-mist text-sm">Nexumm</li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        href="/solutions/lx"
                        className="flex w-full items-center justify-center py-3 hover:bg-surface-2 hover:text-rhistle"
                      >
                        LX
                      </Link>
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <Link
                        href="/solutions/vx"
                        className="flex w-full items-center justify-center py-3 hover:bg-surface-2 hover:text-rhistle"
                      >
                        VX
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <SheetClose asChild>
                <Link
                  href="/company"
                  className="flex w-full items-center justify-center py-4 hover:bg-surface-2 hover:text-rhistle"
                >
                  {t("company")}
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link
                  href="https://tech.rhistle.com"
                  target="_blank"
                  className="flex w-full items-center justify-center py-4 hover:bg-surface-2 hover:text-rhistle"
                >
                  {t("blog")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </SheetClose>
            </li>
            <li>
              <SheetClose asChild>
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center py-4 hover:bg-surface-2 hover:text-rhistle"
                >
                  {t("contact")}
                </Link>
              </SheetClose>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
