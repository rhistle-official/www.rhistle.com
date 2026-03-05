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

      if (
        dropdownRef.current &&
        target instanceof Node &&
        !dropdownRef.current.contains(target)
      ) {
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
        className="flex cursor-pointer items-center justify-center"
      >
        <Globe />
      </button>
      {isOpen && (
        <ul className="absolute left-1/2 mt-2 flex -translate-x-1/2 flex-col gap-2 rounded border p-2">
          <li>
            <button
              type="button"
              onClick={() => handleLocaleChange("ko")}
              className="cursor-pointer"
            >
              KOR
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => handleLocaleChange("en")}
              className="cursor-pointer"
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
