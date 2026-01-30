export function Section({
  title,
  titleClassName,
  children,
    className
}: {
  title: string;
  titleClassName?: string;
  children: React.ReactNode;
  className?:string;
}) {
  return (
    <section className={`container-page ${className}`}>
      {title ? (
        <h2 className={titleClassName ?? "text-lg font-semibold text-sage-900"}>
          {title}
        </h2>
      ) : null}
      <div className={title ? "mt-3 text-sm text-sage-800 leading-relaxed" : "text-sm text-sage-800 leading-relaxed"}>
        {children}
      </div>
    </section>
  );
}
