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
      className={`fixed z-40 w-full font-bold ${isScrolled ? "bg-white" : "text-white"}`}
    >
      <nav className="px-10 py-4 transition-all md:px-15 md:py-5 lg:px-20 lg:py-6 lg:text-xl">
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
