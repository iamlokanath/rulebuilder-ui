import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Lightweight top progress bar on every route change.
 * Page data loaders use PageLoader / LoadingOverlay separately.
 */
export function RouteLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const hide = window.setTimeout(() => setVisible(false), 400);
    return () => window.clearTimeout(hide);
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-0.5 overflow-hidden bg-primary/10"
      role="progressbar"
      aria-hidden
    >
      <div className="lk-route-bar h-full w-1/3 bg-primary" />
    </div>
  );
}
