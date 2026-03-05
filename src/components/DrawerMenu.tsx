import { ArrowUpRight, Menu, X } from "lucide-react";
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

const DrawerMenu = () => {
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
          <DrawerTitle className="sr-only">전체 메뉴</DrawerTitle>
          <DrawerDescription className="sr-only">
            사이트 메뉴 목록입니다.
          </DrawerDescription>
          <DrawerClose>
            <X className="cursor-pointer text-white" />
          </DrawerClose>
        </DrawerHeader>
        <nav className="mt-10">
          <ul className="flex flex-col gap-6 font-medium text-lg text-white">
            <li>
              <Link
                href="/solutions/corecode"
                className="flex w-full items-center justify-center py-4 hover:bg-gray-900"
              >
                {t("solutions")}
              </Link>
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
                href="/inquiry"
                className="flex w-full items-center justify-center py-4 hover:bg-gray-900"
              >
                {t("inquiry")}
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
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
};
export default DrawerMenu;
