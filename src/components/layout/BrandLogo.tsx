import { useApp } from "@/context/AppContext";
import { cn } from "@/utils/helpers";

export function BrandLogo({
  className = "text-2xl sm:text-3xl",
}: {
  className?: string;
}) {
  const { t } = useApp();
  return (
    <span
      className={cn(
        "font-display font-extrabold tracking-tight text-primary",
        className,
      )}
    >
      {t.app.brand}
    </span>
  );
}
