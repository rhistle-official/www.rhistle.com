"use client";

import { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";

const Header = () => {
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
      className={`fixed z-40 w-full py-3 font-bold md:py-4 lg:py-5 ${isScrolled ? "border-gray-200 border-b bg-white" : "bg-transparent text-white"}`}
    >
      <nav className="mx-auto w-full max-w-sm transition-all md:max-w-3xl xl:max-w-7xl">
        <div className="hidden md:block">
          <Navigation isScrolled={isScrolled} />
        </div>
        <div className="block md:hidden">
          <MobileNavigation isScrolled={isScrolled} />
        </div>
      </nav>
    </header>
  );
};
export default Header;
