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
            className={`font-(family-name:--font-audiowide) text-xl ${isScrolled ? "text-rhistle" : "text-white"}`}
          >
            RHISTLE
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
