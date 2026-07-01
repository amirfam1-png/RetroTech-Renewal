import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Info } from 'lucide-react';

export function LoginRoute() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('valerio.molina@molina.it');
  const [password, setPassword] = useState('demo-password');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    // Demo mode — no real auth, just simulate a short delay
    window.setTimeout(() => navigate('/app'), 350);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <LeftPanel />
      <div className="flex items-center justify-center bg-bg px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <BrandMark />
          </div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink-primary">
            Accedi al tuo sito
          </h1>
          <p className="mt-2 text-sm text-ink-secondary">
            Inserisci le tue credenziali aziendali per accedere alla console
            operativa.
          </p>

          <DemoBanner />

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Field
              label="Email aziendale"
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
              autoComplete="email"
            />
            <Field
              label="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              autoComplete="current-password"
              suffix={
                <button
                  type="button"
                  className="text-ink-muted hover:text-ink-primary"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? 'Nascondi password' : 'Mostra password'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-secondary">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-3.5 w-3.5 rounded border-edge accent-brand-deep"
                />
                Ricordami su questo dispositivo
              </label>
              <button
                type="button"
                className="bg-transparent text-brand-deep hover:underline"
              >
                Password dimenticata?
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-deep px-5 py-3 text-sm font-medium text-ink-inverse transition hover:bg-brand-deep-soft disabled:opacity-70"
            >
              {submitting ? (
                <span>Accesso in corso…</span>
              ) : (
                <>
                  Accedi
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-edge pt-6 text-center text-xs text-ink-muted">
            <Link to="/" className="hover:text-ink-primary">
              ← Torna alla home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoBanner() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-md border border-brand-rust/30 bg-brand-rust/[0.06] p-3 text-xs text-ink-secondary">
      <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-rust" />
      <div>
        <strong className="font-medium text-ink-primary">Demo mode.</strong>{' '}
        Le credenziali sono precompilate. Premi <em>Accedi</em> per entrare
        nella console.
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="mb-10 flex items-center gap-3 font-serif text-base font-semibold tracking-tight text-ink-primary">
      <div className="grid h-7 w-7 place-items-center rounded bg-brand-rust font-mono text-sm font-bold text-bg-dark">
        R
      </div>
      <span>
        Retro<span className="text-brand-rust">Tech</span> Renewal
      </span>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  suffix?: React.ReactNode;
}

function Field({ label, id, type, value, onChange, autoComplete, suffix }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-secondary"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full rounded-md border border-edge bg-bg-card px-3.5 py-2.5 pr-10 text-sm text-ink-primary outline-none transition focus:border-brand-deep focus:ring-2 focus:ring-brand-deep/20"
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

function LeftPanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-bg-dark text-ink-inverse lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/40 via-transparent to-brand-rust/20" />
      <div className="relative z-10">
        <BrandMark />
      </div>
      <div className="relative z-10 max-w-md">
        <blockquote className="font-serif text-2xl leading-snug tracking-tight">
          “Vogliamo vedere la produzione in tempo reale, non a fine giornata.”
        </blockquote>
        <footer className="mt-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-rust font-mono text-sm font-semibold text-bg-dark">
            VM
          </div>
          <div className="text-xs">
            <div className="font-medium">Valerio Molina</div>
            <div className="text-white/60">CEO · Molina S.r.l.</div>
          </div>
        </footer>
      </div>
      <div className="relative z-10 text-xs text-white/40">
        Progetto di tesi · Politecnico di Milano Graduate School of Management
      </div>
    </aside>
  );
}
