import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "@/i18n/navigation";

const MobileNav = () => {
  const t = useTranslations("header");

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button type="button" className="cursor-pointer">
          <Menu />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-gray-800">
        <DrawerHeader className="flex self-end">
          <DrawerTitle className="sr-only">{t("menu")}</DrawerTitle>
          <DrawerDescription className="sr-only">{t("menuDescription")}</DrawerDescription>
          <DrawerClose>
            <X className="cursor-pointer text-white" />
          </DrawerClose>
        </DrawerHeader>
        <nav className="mt-10">
          <ul className="flex flex-col gap-6 font-medium text-lg text-white">
            <li>
              <details className="group">
                <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-1 py-4 hover:bg-gray-900">
                  {t("solutions")}
                  <ChevronDown
                    className="size-4 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="flex flex-col text-base">
                  <li>
                    <DrawerClose asChild>
                      <Link
                        href="/solutions/corecode"
                        className="flex w-full items-center justify-center py-3 hover:bg-gray-900"
                      >
                        CoreCode
                      </Link>
                    </DrawerClose>
                  </li>
                  <li className="py-2 text-center font-semibold text-gray-400 text-sm">Nexumm</li>
                  <li>
                    <DrawerClose asChild>
                      <Link
                        href="/solutions/lx"
                        className="flex w-full items-center justify-center py-3 hover:bg-gray-900"
                      >
                        LX
                      </Link>
                    </DrawerClose>
                  </li>
                  <li>
                    <DrawerClose asChild>
                      <Link
                        href="/solutions/vx"
                        className="flex w-full items-center justify-center py-3 hover:bg-gray-900"
                      >
                        VX
                      </Link>
                    </DrawerClose>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link
                href="/company"
                className="flex w-full items-center justify-center py-4 hover:bg-gray-900"
              >
                {t("company")}
              </Link>
            </li>
            <li>
              <Link
                href="https://tech.rhistle.com"
                target="_blank"
                className="flex w-full items-center justify-center py-4 hover:bg-gray-900"
              >
                {t("blog")}
                <ArrowUpRight />
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center py-4 hover:bg-gray-900"
              >
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};
export default MobileNav;
