"use client";

import { ChevronsDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollDown = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`${isScrolled ? "opacity-0" : "opacity-100"} flex flex-col items-center gap-1 text-sm text-white transition-opacity duration-500 ease-in-out md:text-base`}
    >
      <p>scroll down</p>
      <ChevronsDown className="animate-bounce" aria-hidden="true" />
    </div>
  );
};
export default ScrollDown;
