"use client";

import { Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const LocaleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지용
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (dropdownRef.current && target instanceof Node && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathName, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language"
        aria-expanded={isOpen}
        className="flex cursor-pointer items-center justify-center"
      >
        <Globe aria-hidden="true" />
      </button>
      {isOpen && (
        <ul className="card absolute left-1/2 z-50 mt-2 flex min-w-24 -translate-x-1/2 flex-col p-1 text-base text-graphite shadow-raise">
          <li>
            <button
              type="button"
              onClick={() => handleLocaleChange("ko")}
              className="w-full cursor-pointer rounded-sm px-4 py-2 text-center hover:bg-surface-2 hover:text-rhistle"
            >
              KOR
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleLocaleChange("en")}
              className="w-full cursor-pointer rounded-sm px-4 py-2 text-center hover:bg-surface-2 hover:text-rhistle"
            >
              ENG
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
export default LocaleSwitcher;
