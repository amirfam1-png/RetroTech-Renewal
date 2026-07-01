import { Link } from 'react-router-dom';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Check,
  Cpu,
  Euro,
  FileText,
  Gauge,
  Languages,
  Leaf,
  TrendingUp,
  Zap,
} from 'lucide-react';

export function LandingRoute() {
  return (
    <div className="min-h-screen bg-bg">
      <LandingNav />
      <Hero />
      <ProblemStats />
      <Features />
      <Pricing />
      <Testimonial />
      <FinalCta />
      <LandingFooter />
    </div>
  );
}

function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-edge bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3 font-serif text-base font-semibold tracking-tight text-ink-primary">
          <div className="grid h-7 w-7 place-items-center rounded bg-brand-rust font-mono text-sm font-bold text-bg-dark">
            R
          </div>
          <span>
            Retro<span className="text-brand-rust">Tech</span> Renewal
          </span>
        </div>
        <div className="hidden items-center gap-8 text-sm text-ink-secondary md:flex">
          <a href="#features" className="hover:text-ink-primary">
            Soluzione
          </a>
          <a href="#pricing" className="hover:text-ink-primary">
            Prezzi
          </a>
          <a href="#testimonial" className="hover:text-ink-primary">
            Clienti
          </a>
        </div>
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-md bg-brand-deep px-4 py-2 text-sm font-medium text-ink-inverse transition hover:bg-brand-deep-soft"
        >
          Accedi alla demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-edge bg-bg-card px-3 py-1 text-xs font-medium text-ink-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-status-ok" />
              Beta · pilota in corso con clienti selezionati
            </div>
            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-ink-primary lg:text-6xl">
              Trasforma le tue macchine{' '}
              <span className="text-brand-rust">legacy</span> in asset connessi.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-secondary">
              Manutenzione predittiva, monitoraggio energetico e conformità
              Iperammortamento 2026 per le PMI italiane del metalmeccanico.
              Senza modificare le tue macchine.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-md bg-brand-deep px-6 py-3 text-sm font-medium text-ink-inverse transition hover:bg-brand-deep-soft"
              >
                Prova la demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="rounded-md border border-edge bg-bg-card px-6 py-3 text-sm font-medium text-ink-primary transition hover:bg-bg-subtle"
              >
                Scopri di più
              </a>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-edge pt-8">
              <Stat value="<€100" label="al mese per macchina" />
              <Stat value="78%" label="riduzione fermi (target)" />
              <Stat value="5%+" label="risparmio energetico documentato" />
            </dl>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-serif text-2xl font-semibold text-ink-primary">
        {value}
      </dt>
      <dd className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
        {label}
      </dd>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-edge bg-bg-dark p-6 shadow-card-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/40 to-transparent" />
      <div className="relative z-10 grid h-full grid-rows-[auto_1fr_auto] gap-4 text-ink-inverse">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider opacity-70">
          <span>Sito Varese · live</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-[#5fc46a]" />
            Telemetria attiva
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <MiniCard label="OEE" value="73.4%" tone="ok" />
          <MiniCard label="Allarmi" value="3" tone="warn" />
          <MiniCard label="Energia" value="487 kWh" tone="ok" />
        </div>
        <div className="space-y-2">
          <MiniAlert
            text="Pressa Harburg 100T #2 — usura cuscinetto, intervento entro 72h"
            tone="crit"
          />
          <MiniAlert
            text="Centro CNC GF #1 — temperatura mandrino 74°C (soglia 70°C)"
            tone="warn"
          />
        </div>
      </div>
    </div>
  );
}

function MiniCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'ok' | 'warn';
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2.5">
      <div className="text-[9px] uppercase tracking-wider text-white/50">
        {label}
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-serif text-base font-semibold">{value}</span>
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            tone === 'ok' ? 'bg-[#5fc46a]' : 'bg-[#e4a047]'
          }`}
        />
      </div>
    </div>
  );
}

function MiniAlert({ text, tone }: { text: string; tone: 'crit' | 'warn' }) {
  const barColor = tone === 'crit' ? 'bg-[#d05757]' : 'bg-[#e4a047]';
  return (
    <div className="flex items-start gap-2 rounded-md bg-white/[0.04] p-2 text-[11px]">
      <div className={`mt-0.5 h-3 w-0.5 rounded ${barColor}`} />
      <span className="leading-snug">{text}</span>
    </div>
  );
}

function ProblemStats() {
  return (
    <section className="border-b border-edge bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-primary lg:text-4xl">
            Il problema delle PMI metalmeccaniche italiane
          </h2>
          <p className="mt-4 text-lg text-ink-secondary">
            Macchine produttive con decenni di affidabilità, ma cieche rispetto
            ai dati che oggi servono per competere.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <ProblemCard
            icon={Cpu}
            stat="65%"
            title="Macchine senza connettività"
            body="Quote del parco macchine metalmeccanico italiano con oltre 15 anni di età e nessun protocollo digitale nativo."
          />
          <ProblemCard
            icon={AlertCircle}
            stat="78%"
            title="Fermi prevenibili"
            body="Il downtime non pianificato attribuibile a guasti meccanici è prevenibile con manutenzione predittiva basata su dati."
          />
          <ProblemCard
            icon={Euro}
            stat="5%+"
            title="Soglia Iperammortamento"
            body="Risparmio energetico minimo richiesto a livello di processo per accedere alla maxi-deduzione 2026."
          />
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  icon: Icon,
  stat,
  title,
  body,
}: {
  icon: typeof Cpu;
  stat: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-edge bg-bg-card p-7">
      <Icon className="h-7 w-7 text-brand-rust" />
      <div className="mt-5 font-serif text-3xl font-semibold tracking-tight text-ink-primary">
        {stat}
      </div>
      <h3 className="mt-2 text-base font-semibold text-ink-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{body}</p>
    </article>
  );
}

function Features() {
  return (
    <section id="features" className="border-b border-edge">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-rust">
            La soluzione
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-primary lg:text-4xl">
            Una piattaforma sola, sei capacità integrate.
          </h2>
          <p className="mt-4 text-lg text-ink-secondary">
            Sensori non-invasivi al campo, AI ibrida al cloud, conformità
            normativa per default.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Activity}
            title="Monitoraggio in tempo reale"
            body="Corrente, vibrazione, temperatura e cicli di ogni macchina, aggiornati al secondo. Niente più dati raccolti a fine giornata."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Manutenzione predittiva AI"
            body="Modelli ML su Google Vertex AI rilevano guasti incipienti giorni prima del fermo macchina."
          />
          <FeatureCard
            icon={Zap}
            title="Gestione energetica"
            body="Consumo elettrico per macchina, baseline storico, identificazione automatica delle inefficienze."
          />
          <FeatureCard
            icon={Languages}
            title="Allarmi in italiano"
            body="Claude redige le segnalazioni in linguaggio naturale: causa probabile, azione consigliata, costo del ritardo."
          />
          <FeatureCard
            icon={Leaf}
            title="Report ESG / CSRD"
            body="Documentazione automatica di kWh, CO₂ evitata e indicatori di sostenibilità, pronta per il bilancio."
          />
          <FeatureCard
            icon={FileText}
            title="Conformità Iperammortamento"
            body="Misurazione e certificazione del risparmio energetico 3%/5% richiesto per la maxi-deduzione 2026."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Activity;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-edge bg-bg-card p-7 transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-deep/10 text-brand-deep">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-ink-primary">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{body}</p>
    </article>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="border-b border-edge bg-bg-subtle">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-rust">
            Prezzi
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink-primary lg:text-4xl">
            Prezzi pensati per le PMI.
          </h2>
          <p className="mt-4 text-lg text-ink-secondary">
            Hardware incluso. Bundle leasing per la deducibilità IVA. Cancellabile in qualsiasi momento.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <PriceCard
            tier="Basic"
            price="60 – 80"
            description="Microimpresa, 3 – 5 macchine"
            features={[
              'Monitoraggio in tempo reale',
              'Manutenzione predittiva',
              '1 gateway, fino a 8 sensori',
              'App mobile + web',
              'Supporto via email',
            ]}
          />
          <PriceCard
            tier="Pro"
            price="100 – 150"
            description="PMI, 5 – 15 macchine"
            features={[
              'Tutto in Basic',
              'OEE e KPI avanzati',
              'Report ESG / CSRD',
              'Allarmi via SMS / Telegram',
              'Supporto prioritario',
            ]}
            highlighted
          />
          <PriceCard
            tier="Enterprise"
            price="180 – 250"
            description="Multi-sito, 15 – 50 macchine"
            features={[
              'Tutto in Pro',
              'Conformità Iperammortamento 2026',
              'Integrazione ERP / MES',
              'Account manager dedicato',
              'SLA 99.5%',
            ]}
          />
        </div>

        <p className="mt-8 text-center text-xs text-ink-muted">
          Prezzi indicativi per sito al mese, IVA esclusa. Hardware leasing 24 – 36 mesi opzionale.
        </p>
      </div>
    </section>
  );
}

function PriceCard({
  tier,
  price,
  description,
  features,
  highlighted,
}: {
  tier: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <article
      className={`rounded-xl border bg-bg-card p-8 ${
        highlighted
          ? 'border-brand-deep shadow-card-lg ring-1 ring-brand-deep/20'
          : 'border-edge'
      }`}
    >
      {highlighted && (
        <div className="mb-4 inline-block rounded-full bg-brand-deep px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-inverse">
          Più scelto
        </div>
      )}
      <h3 className="font-serif text-2xl font-semibold text-ink-primary">
        {tier}
      </h3>
      <p className="mt-2 text-sm text-ink-secondary">{description}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-2xl text-ink-muted">€</span>
        <span className="font-serif text-5xl font-semibold tracking-tight text-ink-primary">
          {price}
        </span>
        <span className="text-sm text-ink-muted">/ mese</span>
      </div>
      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink-secondary">
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-status-ok" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function Testimonial() {
  return (
    <section id="testimonial" className="border-b border-edge">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-2xl border border-edge bg-bg-card p-10 lg:p-14">
          <Gauge className="h-8 w-8 text-brand-rust" />
          <blockquote className="mt-6 font-serif text-2xl leading-tight tracking-tight text-ink-primary lg:text-3xl">
            “Vogliamo vedere la produzione in tempo reale, non a fine giornata.
            Siamo otto persone, i processi devono essere elementari, i più
            semplici possibile.”
          </blockquote>
          <footer className="mt-8 flex items-center gap-4 border-t border-edge pt-6">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-rust font-mono text-base font-semibold text-bg-dark">
              VM
            </div>
            <div>
              <div className="text-sm font-semibold text-ink-primary">
                Valerio Molina
              </div>
              <div className="text-xs text-ink-secondary">
                CEO · Molina S.r.l. · Varese · stampi e iniezione plastica
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-b border-edge bg-bg-dark text-ink-inverse">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl font-semibold tracking-tight lg:text-4xl">
          Pronto a vedere la tua produzione in tempo reale?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          Accedi alla demo configurata su un parco macchine reale di una
          microimpresa del metalmeccanico lombardo.
        </p>
        <Link
          to="/login"
          className="mt-10 inline-flex items-center gap-2 rounded-md bg-brand-rust px-6 py-3 text-sm font-medium text-bg-dark transition hover:bg-brand-rust-soft"
        >
          Accedi alla demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-ink-muted md:flex-row">
          <div className="flex items-center gap-2 text-ink-secondary">
            <div className="grid h-6 w-6 place-items-center rounded bg-brand-rust font-mono text-xs font-bold text-bg-dark">
              R
            </div>
            <span>
              Retro<span className="text-brand-rust">Tech</span> Renewal
            </span>
          </div>
          <div className="text-xs">
            Progetto di tesi · iFlex MBA · Politecnico di Milano Graduate
            School of Management · 2024 – 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
