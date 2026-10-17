import { cn } from "@/lib/utils";

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="font-mono text-[10px] tracking-[0.18em] text-copper">
        {index}
      </span>
      <span className="h-px w-7 bg-line-strong" aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
