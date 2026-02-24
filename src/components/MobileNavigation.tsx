import Image from "next/image";
import { Link } from "@/i18n/navigation";
import DrawerMenu from "./DrawerMenu";
import LocaleSwitcher from "./LocaleSwitcher";

const MobileNavigation = ({ isScrolled }: { isScrolled: boolean }) => {
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
          <div className="flex items-center gap-4">
            <DrawerMenu />
            <LocaleSwitcher />
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
