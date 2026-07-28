import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/layout/AppShell";
import { AppProvider } from "@/context/AppContext";
import { BuilderPage } from "@/pages/BuilderPage";
import { ContactsPage } from "@/pages/ContactsPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { SavedRulesPage } from "@/pages/SavedRulesPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function GoogleProvider({ children }: { children: ReactNode }) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
  if (!clientId) return <>{children}</>;
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}

export default function App() {
  return (
    <AppProvider>
      <GoogleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppShell />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/builder" element={<BuilderPage />} />
                <Route path="/saved" element={<SavedRulesPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </GoogleProvider>
    </AppProvider>
  );
}
