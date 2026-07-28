import theme from "@/content/theme.json";
import type { ThemeMode } from "@/types";

function applyScale(prefix: string, scale: Record<string, string>): void {
  Object.entries(scale).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${prefix}-${key}`, value);
  });
}

export function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  const palette = mode === "dark" ? theme.dark : theme.light;

  root.classList.toggle("dark", mode === "dark");
  root.style.setProperty("--font-sans", theme.fonts.sans);
  root.style.setProperty("--font-display", theme.fonts.display);
  root.style.setProperty("--font-mono", theme.fonts.mono);
  root.style.setProperty("--radius-panel", theme.radius.panel);
  root.style.setProperty("--radius-control", theme.radius.control);
  root.style.setProperty("--shadow-panel", theme.shadow.panel);

  applyScale("brand", palette.brand);
  applyScale("accent", palette.accent);
  applyScale("warning", palette.warning);
  applyScale("orange", palette.orange);
  applyScale("danger", palette.danger);
  applyScale("success", palette.success);

  root.style.setProperty("--color-surface", palette.surface);
  root.style.setProperty("--color-surface-muted", palette.surfaceMuted);
  root.style.setProperty("--color-surface-elevated", palette.surfaceElevated);
  root.style.setProperty("--color-border", palette.border);
  root.style.setProperty("--color-ink", palette.ink);
  root.style.setProperty("--color-ink-muted", palette.inkMuted);
  root.style.setProperty("--color-ink-inverse", palette.inkInverse);

  root.style.setProperty("--color-palette-royal", theme.palette.royalBlue);
  root.style.setProperty("--color-palette-sky", theme.palette.skyBlue);
  root.style.setProperty("--color-palette-yellow", theme.palette.yellow);
  root.style.setProperty("--color-palette-orange", theme.palette.orange);
  root.style.setProperty("--color-palette-coral", theme.palette.coral);
  root.style.setProperty("--color-palette-emerald", theme.palette.emerald);

  root.style.setProperty("--soft", theme.palette.soft);
  root.style.setProperty("--line", theme.palette.line);
  root.style.setProperty("--sky", theme.palette.skyBlue);
  root.style.setProperty("--yellow", theme.palette.yellow);
  root.style.setProperty("--orange", theme.palette.orange);
  root.style.setProperty("--red", theme.palette.coral);
  root.style.setProperty("--green", theme.palette.emerald);
  root.style.setProperty("--ink", theme.palette.ink);
  root.style.setProperty("--primary", theme.palette.royalBlue);
  root.style.setProperty("--muted-foreground", theme.palette.muted);
}
