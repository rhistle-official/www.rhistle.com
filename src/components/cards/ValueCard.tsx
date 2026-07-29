import type { LucideProps } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

const ValueCard = ({
  Icon,
  label,
  children,
}: {
  Icon: ComponentType<LucideProps>;
  label: string;
  children: ReactNode;
}) => (
  <div className="card card-hover relative overflow-hidden rounded-md p-8 md:p-10">
    <Icon className="absolute right-0 bottom-0 size-32 text-brand-50" aria-hidden />

    <div className="relative flex flex-col gap-5">
      <h3 className="flex items-center gap-3 font-bold text-graphite text-h3">
        <span className="h-7 w-1.5 rounded-full bg-rhistle" />
        {label}
      </h3>
      {children}
    </div>
  </div>
);
export default ValueCard;
