import Image from "next/image";
import { Link } from "@/i18n/navigation";

const MobileNavigation = () => {
  return (
    <nav className="mx-auto max-w-400 px-10 md:px-15 lg:px-20">
      <ul className="flex h-24 items-center justify-between">
        <li>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo_white.webp"}
              alt="RHISTLE 로고"
              width={30}
              height={30}
            />
            <p>RHISTLE</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default MobileNavigation;
