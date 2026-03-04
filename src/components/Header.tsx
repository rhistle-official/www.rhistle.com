"use client";

import { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const pathName = usePathname();
  // const isRoot = routing.locales.some((locale) => pathName === `/${locale}`);

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
    // <header
    //   className={`fixed z-40 w-full font-bold ${isRoot ? (isScrolled ? "border-gray-200 border-b bg-white" : "bg-transparent text-white") : "bg-white text-black"}`}
    // >
    <header
      className={`fixed z-40 w-full font-bold ${isScrolled ? "border-gray-200 border-b bg-white" : "bg-transparent text-white"}`}
    >
      <nav className="px-10 py-2 transition-all md:px-15 md:py-3 lg:px-20 lg:py-4 lg:text-xl">
        <div className="hidden md:block">
          {/* <Navigation isScrolled={isScrolled} isRoot={isRoot} /> */}
          <Navigation isScrolled={isScrolled} />
        </div>
        <div className="block md:hidden">
          {/* <MobileNavigation isScrolled={isScrolled} isRoot={isRoot} /> */}
          <MobileNavigation isScrolled={isScrolled} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
