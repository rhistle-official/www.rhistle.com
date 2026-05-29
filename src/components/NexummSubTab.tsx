"use client";

import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  { name: "Nexumm LX", href: "/solutions/nexumm/lx" },
  { name: "Nexumm VX", href: "/solutions/nexumm/vx" },
];

const NexummSubTab = () => {
  const pathName = usePathname();

  return (
    <section className="sticky top-21.25 z-[9] border-gray-200 border-b bg-white/85 backdrop-blur md:top-30.75 xl:top-34.25">
      <div className="mx-auto flex max-w-7xl gap-6 px-8">
        {tabs.map((tab) => {
          const isActive = pathName.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`${
                isActive ? "border-rhistle text-rhistle" : "border-transparent text-gray-400"
              } border-b-2 py-3 font-medium transition-colors sm:text-lg`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default NexummSubTab;
