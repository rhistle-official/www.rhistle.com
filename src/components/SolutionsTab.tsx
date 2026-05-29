"use client";

import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
    match: "/solutions/corecode",
  },
  {
    name: "Nexumm",
    href: "/solutions/nexumm/lx",
    match: "/solutions/nexumm",
  },
];

const SolutionsTab = () => {
  const pathName = usePathname();

  return (
    <section className="sticky top-13.25 z-10 border-gray-200 border-b bg-white md:top-19.25 xl:top-21.25">
      <div className="mx-auto flex max-w-7xl gap-4 px-8">
        {tabs.map((tab) => {
          const isActive = pathName.startsWith(tab.match);

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
    </section>
  );
};
export default SolutionsTab;
