import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const IndustryCard = ({
  Icon,
  title,
  engTitle,
  keyFocusLabel,
  focus,
  serviceScopeLabel,
  projects,
}: {
  Icon: ComponentType<LucideProps>;
  title: string;
  engTitle: string;
  keyFocusLabel: string;
  focus: string;
  serviceScopeLabel: string;
  projects: string[];
}) => (
  <div className="card card-hover grid grid-cols-1 gap-8 rounded-md p-8 md:grid-cols-2 md:gap-0 md:p-10">
    <div className="space-y-5">
      <div className="flex">
        <div className="flex size-14 items-center justify-center rounded-md bg-brand-50">
          <Icon className="size-7 text-rhistle" aria-hidden />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-graphite text-h3 tracking-tight">{title}</h3>
        <p className="eyebrow mt-1">{engTitle}</p>
      </div>

      <div>
        <p className="font-semibold text-mist text-sm tracking-wide">{keyFocusLabel}</p>
        <p className="mt-1 break-keep text-graphite text-lg leading-snug">{focus}</p>
      </div>
    </div>

    <div className="space-y-4 md:border-line md:border-l md:pl-10">
      <p className="font-semibold text-mist text-sm tracking-wide">{serviceScopeLabel}</p>
      <ul className="space-y-3">
        {projects.map((project) => (
          <li key={project} className="flex items-center gap-3 break-keep text-graphite text-lg">
            <span className="size-1.5 shrink-0 rounded-full bg-rhistle" />
            <span>{project}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default IndustryCard;
