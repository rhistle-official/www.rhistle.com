"use client";

import { CircleArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
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

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed right-20 bottom-10 z-30"
    >
      <div
        className={`flex ${!isScrolled && "hidden"} h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-gray-900`}
      >
        <CircleArrowUp className="scale-150 text-white" />
      </div>
    </button>
  );
};
export default ScrollToTop;
