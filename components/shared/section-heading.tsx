export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-4xl tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
}
