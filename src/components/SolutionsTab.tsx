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
    <div className="bg-gray-200 pt-2 sm:pt-3 xl:pt-4">
      <div className="mx-auto flex max-w-sm gap-4 sm:max-w-5xl xl:max-w-7xl">
        {tabs.map((tab) => {
          const isActive = pathName === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`${isActive && "bg-white"} rounded-t-2xl p-2 sm:text-xl xl:text-2xl`}
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
