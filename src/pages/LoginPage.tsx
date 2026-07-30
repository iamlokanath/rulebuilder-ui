import { DottedTrails, WorkerBubbles } from "@/components/auth/AuthDecor";
import { GoogleIcon, GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LoadingOverlay } from "@/components/ui/Spinner";
import { useApp } from "@/context/AppContext";
import { useToast } from "@/context/ToastContext";
import { authApi } from "@/services/api";
import { getApiErrorMessage } from "@/utils/helpers";
import type { CredentialResponse } from "@react-oauth/google";
import { Eye, EyeOff, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

type Step = "choose" | "email";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function safeNextPath(raw: string | null): string {
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

export function LoginPage() {
  const { t, token, setToken } = useApp();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));
  const [step, setStep] = useState<Step>("choose");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to={nextPath} replace />;

  const onGoogleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error(t.common.errors.googleFailed);
      return;
    }
    setLoading(true);
    try {
      const data = await authApi.googleLogin(response.credential);
      setToken(data.access_token);
      toast.success(t.common.toasts.signedIn);
    } catch (err) {
      toast.error(getApiErrorMessage(err, t.common.errors, t.common.errors.googleFailed));
    } finally {
      setLoading(false);
    }
  };

  const onEmailSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === "register") {
        await authApi.register(name, email, password);
        const result = await authApi.login(email, password);
        setToken(result.access_token);
        toast.success(t.common.toasts.accountCreated);
      } else {
        const result = await authApi.login(email, password);
        setToken(result.access_token);
        toast.success(t.common.toasts.signedIn);
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, t.common.errors));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-soft">
      <LoadingOverlay show={loading} label={t.common.loading} />
      <DottedTrails />
      <WorkerBubbles />

      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="flex items-center">
          <BrandLogo className="text-3xl sm:text-4xl" />
        </div>
        <LanguageSwitcher />
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-6 lg:grid-cols-2 lg:gap-8 lg:pt-12">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {t.auth.kicker}
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-primary sm:text-4xl lg:text-5xl">
            {t.auth.heroTitle}
          </h1>
          <p className="mt-4 max-w-md text-base font-medium text-primary/80">
            {t.auth.heroSubtitle}
          </p>
          <div className="mt-8 flex gap-1.5" aria-hidden>
            <span className="h-1 w-12 bg-primary" />
            <span className="h-1 w-8 bg-sky" />
            <span className="h-1 w-4 bg-yellow" />
            <span className="h-1 w-4 bg-orange" />
            <span className="h-1 w-4 bg-green" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-3 -top-3 h-16 w-16 rounded-2xl bg-yellow" aria-hidden />
            <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-2xl bg-[#f15a2b]" aria-hidden />
            <div className="relative rounded-2xl border border-line bg-white p-7 shadow-xl shadow-primary/5 sm:p-8">
              <div className="flex flex-col items-center text-center">
                <BrandLogo className="text-2xl" />
                <p className="mt-2 text-sm font-medium text-muted-foreground">{t.auth.tagline}</p>
              </div>

              {step === "choose" ? (
                <div className="mt-7 space-y-3">
                  <p className="text-center text-sm font-semibold text-ink">
                    {t.auth.continueWith}
                  </p>
                  {googleClientId ? (
                    <GoogleSignInButton
                      label={t.auth.continueGoogle}
                      onSuccess={(response) => void onGoogleSuccess(response)}
                      onError={() => toast.error(t.common.errors.googleFailed)}
                      disabled={loading}
                    />
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border border-line bg-white px-4 text-sm font-semibold text-muted-foreground opacity-60"
                    >
                      <GoogleIcon className="h-5 w-5 shrink-0" />
                      {t.auth.continueGoogle} {t.auth.configureGoogle}
                    </button>
                  )}
                  <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-line" />
                    <span className="text-xs text-muted-foreground">{t.auth.or}</span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
                  >
                    <Mail className="h-4 w-4" />
                    {t.auth.continueEmail}
                  </button>
                </div>
              ) : (
                <form onSubmit={onEmailSubmit} className="mt-7 space-y-4">
                  {mode === "register" ? (
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t.auth.name}
                      </span>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        className="w-full rounded-md border border-line px-3 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </label>
                  ) : null}
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.auth.email}
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={t.auth.emailPlaceholder}
                      required
                      className="w-full rounded-md border border-line px-3 py-3 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t.auth.password}
                    </span>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        minLength={8}
                        className="w-full rounded-md border border-line px-3 py-3 pr-11 text-sm text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition hover:text-ink"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" aria-hidden />
                        ) : (
                          <Eye className="h-4 w-4" aria-hidden />
                        )}
                      </button>
                    </div>
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    ) : null}
                    {loading
                      ? t.common.loading
                      : mode === "login"
                        ? t.auth.submit
                        : t.auth.registerSubmit}
                    {!loading ? " →" : null}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMode((prev) => (prev === "login" ? "register" : "login"))
                    }
                    className="block w-full text-center text-xs font-semibold text-primary hover:underline"
                  >
                    {mode === "login" ? t.auth.switchToRegister : t.auth.switchToLogin}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("choose")}
                    className="block w-full text-center text-xs font-semibold text-muted-foreground hover:text-ink"
                  >
                    {t.auth.useDifferent}
                  </button>
                </form>
              )}

              <p className="mt-5 text-center text-[11px] text-muted-foreground">{t.auth.terms}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
