import { Navbar } from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
