"use client";

import { CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button type="button" onClick={handleClick} className="fixed right-8 bottom-10 z-30">
      <div
        className={`flex ${!isScrolled && "hidden"} h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black opacity-85 md:h-12 md:w-12 xl:h-15 xl:w-15`}
      >
        <CircleArrowUp className="scale-105 text-white md:scale-125 xl:scale-150" />
      </div>
    </button>
  );
};
export default ScrollToTopButton;
