interface SectionHeadingProps {
  label: string;
  /** Use the highlighted portion to mark the emphasized word(s). */
  children: React.ReactNode;
}

export function SectionHeading({ label, children }: SectionHeadingProps) {
  return (
    <header className="space-y-4">
      <p className="section-label">{label}</p>
      <h2 className="heading-xl">
        {children}
      </h2>
    </header>
  );
}
