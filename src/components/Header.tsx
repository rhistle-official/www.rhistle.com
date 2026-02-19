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
      className={`fixed z-40 w-full font-bold text-white md:text-lg lg:text-xl ${isScrolled && "border-gray-800 border-b bg-black"}`}
    >
      <div className="hidden md:block">
        <Navigation />
      </div>

      <div className="block md:hidden">
        <MobileNavigation />
      </div>
    </header>
  );
};
export default Header;
