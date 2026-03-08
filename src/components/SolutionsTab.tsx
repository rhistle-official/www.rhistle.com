"use client";

import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
  },
  {
    name: "Nexumm",
    href: "/solutions/nexumm",
  },
];

const SolutionsTab = () => {
  const pathName = usePathname();

  return (
    <div className="border-gray-200 border-b bg-white">
      <div className="mx-auto flex max-w-7xl gap-4 px-8">
        {tabs.map((tab) => {
          const isActive = pathName === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`${isActive && "border-rhistle border-b-4 text-rhistle"} p-2 text-gray-500 sm:text-xl xl:text-2xl`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SolutionsTab;
