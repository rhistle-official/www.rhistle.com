import Eyebrow from "@/components/ui/Eyebrow";

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="space-y-4">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="font-bold text-h2">{title}</h2>
    {description && <p className="max-w-3xl text-graphite md:text-lg">{description}</p>}
  </div>
);
export default SectionHeading;
