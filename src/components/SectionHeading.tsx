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
    <p className="font-semibold text-rhistle text-sm uppercase tracking-widest">{eyebrow}</p>
    <h2 className="font-bold text-3xl md:text-4xl xl:text-5xl">{title}</h2>
    {description && <p className="max-w-3xl text-gray-600 md:text-lg">{description}</p>}
  </div>
);
export default SectionHeading;
