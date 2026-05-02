type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description
}: SectionTitleProps) {
  return (
    <div className="mb-8 space-y-3 md:mb-10">
      <p className="text-sm font-semibold tracking-[0.2em] text-accent/90">{eyebrow}</p>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-textSoft">{description}</p> : null}
    </div>
  );
}
