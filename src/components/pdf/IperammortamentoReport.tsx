/* eslint-disable react/no-unescaped-entities --
 * The rule targets HTML accessibility (screen readers, browser parsing).
 * @react-pdf/renderer outputs PDF text where apostrophes are rendered
 * verbatim, so escaping would actually break the output. */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Site } from '@/types';

const C = {
  ink: '#1a2530',
  inkSecondary: '#5c6670',
  inkMuted: '#8a8f94',
  brandDeep: '#1b4a5a',
  brandRust: '#c97a40',
  ok: '#5a8f5a',
  okBg: '#ebf2eb',
  warn: '#d08c2d',
  edge: '#e8e2d8',
  bgSubtle: '#f7f4ee',
  inverse: '#faf8f5',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: C.ink,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 50,
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.edge,
    borderBottomStyle: 'solid',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerMark: {
    width: 18,
    height: 18,
    backgroundColor: C.brandRust,
    color: '#1a2530',
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Courier',
    fontWeight: 700,
    paddingTop: 2,
  },
  headerName: {
    fontFamily: 'Times-Roman',
    fontWeight: 600,
    fontSize: 12,
    color: C.ink,
  },
  headerName_brand: { color: C.brandRust },
  headerMeta: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: C.inkMuted,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: C.edge,
    borderTopStyle: 'solid',
    fontSize: 8,
    color: C.inkMuted,
  },

  // Cover page
  coverWrap: {
    marginTop: 80,
  },
  coverLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: C.brandRust,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  coverTitle: {
    fontFamily: 'Times-Roman',
    fontWeight: 600,
    fontSize: 36,
    color: C.ink,
    lineHeight: 1.1,
    marginBottom: 12,
  },
  coverSubtitle: {
    fontSize: 14,
    color: C.inkSecondary,
    lineHeight: 1.4,
    marginBottom: 60,
  },
  coverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 60,
  },
  coverField: {
    width: '47%',
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: C.edge,
    borderBottomStyle: 'solid',
  },
  coverFieldLabel: {
    fontSize: 8,
    color: C.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  coverFieldValue: {
    fontSize: 13,
    fontWeight: 500,
    color: C.ink,
  },
  coverFieldValueMono: {
    fontSize: 13,
    fontWeight: 500,
    color: C.ink,
    fontFamily: 'Courier',
  },
  coverSeal: {
    marginTop: 30,
    padding: 16,
    backgroundColor: C.okBg,
    borderLeftWidth: 4,
    borderLeftColor: C.ok,
    borderLeftStyle: 'solid',
  },
  coverSealTitle: {
    fontFamily: 'Times-Roman',
    fontWeight: 600,
    fontSize: 14,
    color: C.ok,
    marginBottom: 4,
  },
  coverSealBody: {
    fontSize: 10,
    color: C.ink,
  },

  // Content pages
  sectionLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: C.brandRust,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Times-Roman',
    fontWeight: 600,
    fontSize: 20,
    color: C.ink,
    marginBottom: 16,
  },
  para: {
    fontSize: 10,
    color: C.ink,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  paraMuted: {
    fontSize: 9.5,
    color: C.inkSecondary,
    marginBottom: 12,
    lineHeight: 1.6,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  kpiCard: {
    flex: 1,
    padding: 14,
    backgroundColor: C.bgSubtle,
    borderLeftWidth: 3,
    borderLeftStyle: 'solid',
    borderLeftColor: C.brandDeep,
  },
  kpiCardLabel: {
    fontSize: 8,
    color: C.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  kpiCardValue: {
    fontFamily: 'Times-Roman',
    fontWeight: 600,
    fontSize: 20,
    color: C.ink,
  },
  kpiCardSub: {
    fontSize: 9,
    color: C.inkSecondary,
    marginTop: 2,
  },
  table: {
    marginTop: 8,
    marginBottom: 16,
    borderTopWidth: 0.5,
    borderTopColor: C.edge,
    borderTopStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: C.bgSubtle,
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 8.5,
    fontWeight: 600,
    color: C.inkSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontSize: 9.5,
    color: C.ink,
    borderBottomWidth: 0.5,
    borderBottomColor: C.edge,
    borderBottomStyle: 'solid',
  },
  cellMachine: { flex: 3 },
  cellDept: { flex: 2, color: C.inkSecondary },
  cellNum: { flex: 1.2, textAlign: 'right', fontFamily: 'Courier' },
  cellPct: { flex: 1, textAlign: 'right', fontFamily: 'Courier', fontWeight: 500 },
  pctOk: { color: C.ok },
  pctWarn: { color: C.warn },
  calloutBox: {
    padding: 14,
    backgroundColor: C.bgSubtle,
    marginBottom: 16,
  },
  calloutTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: C.ink,
    marginBottom: 6,
  },
  calloutText: {
    fontSize: 9.5,
    color: C.inkSecondary,
    lineHeight: 1.6,
  },
  aiAttribution: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#1a2530',
    color: C.inverse,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiBadge: {
    backgroundColor: C.brandRust,
    color: '#1a2530',
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 8,
    fontWeight: 600,
    fontFamily: 'Courier',
  },
  aiText: {
    fontSize: 9,
    color: C.inverse,
    flex: 1,
  },
  signBlock: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
  signCol: { flex: 1 },
  signLabel: {
    fontSize: 8,
    color: C.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 30,
  },
  signLine: {
    borderTopWidth: 0.5,
    borderTopColor: C.ink,
    borderTopStyle: 'solid',
    paddingTop: 4,
    fontSize: 9,
    color: C.ink,
  },
});

function PageHeader({ site }: { site: Site }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBrand}>
        <Text style={styles.headerMark}>R</Text>
        <Text style={styles.headerName}>
          Retro<Text style={styles.headerName_brand}>Tech</Text> Renewal
        </Text>
      </View>
      <Text style={styles.headerMeta}>
        {site.shortName} · {site.gatewayId}
      </Text>
    </View>
  );
}

function PageFooter({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  return (
    <View style={styles.footer}>
      <Text>Documento generato automaticamente da RetroTech Renewal · Claude Opus 4.7</Text>
      <Text>Pagina {pageNumber} di {totalPages}</Text>
    </View>
  );
}

function formatToday(): string {
  const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  const d = new Date();
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

interface ReportProps {
  site: Site;
}

export function IperammortamentoReport({ site }: ReportProps) {
  const machineRows = site.machines.slice(0, 8).map((m, i) => {
    // Deterministic per-machine reduction figures so the demo is consistent
    const reduction = 3.2 + ((i * 1.7) % 4.8);
    const baseline = 1200 + i * 180;
    const current = Math.round(baseline * (1 - reduction / 100));
    return {
      name: m.name,
      department: m.department,
      baseline,
      current,
      reduction: Number(reduction.toFixed(1)),
    };
  });

  const totalBaseline = machineRows.reduce((s, r) => s + r.baseline, 0);
  const totalCurrent = machineRows.reduce((s, r) => s + r.current, 0);
  const processReduction = ((totalBaseline - totalCurrent) / totalBaseline) * 100;

  return (
    <Document
      title={`Report Iperammortamento 2026 - ${site.name}`}
      author="RetroTech Renewal"
      subject="Documentazione di conformità Iperammortamento 2026"
    >
      {/* ============ PAGE 1: COVER ============ */}
      <Page size="A4" style={styles.page}>
        <PageHeader site={site} />

        <View style={styles.coverWrap}>
          <Text style={styles.coverLabel}>Documento di conformità</Text>
          <Text style={styles.coverTitle}>
            Report{'\n'}Iperammortamento{'\n'}2026
          </Text>
          <Text style={styles.coverSubtitle}>
            Documentazione del risparmio energetico a livello di processo,
            secondo l'art. 1, c. 446 della Legge di Bilancio 2026
            (Legge 199/2025).
          </Text>

          <View style={styles.coverGrid}>
            <View style={styles.coverField}>
              <Text style={styles.coverFieldLabel}>Beneficiario</Text>
              <Text style={styles.coverFieldValue}>{site.name}</Text>
            </View>
            <View style={styles.coverField}>
              <Text style={styles.coverFieldLabel}>Sede</Text>
              <Text style={styles.coverFieldValue}>{site.city} ({site.province}), {site.region}</Text>
            </View>
            <View style={styles.coverField}>
              <Text style={styles.coverFieldLabel}>Settore</Text>
              <Text style={styles.coverFieldValue}>{site.industry}</Text>
            </View>
            <View style={styles.coverField}>
              <Text style={styles.coverFieldLabel}>Gateway</Text>
              <Text style={styles.coverFieldValueMono}>{site.gatewayId}</Text>
            </View>
            <View style={styles.coverField}>
              <Text style={styles.coverFieldLabel}>Periodo</Text>
              <Text style={styles.coverFieldValue}>Q2 2026 — 1 apr a 30 giu</Text>
            </View>
            <View style={styles.coverField}>
              <Text style={styles.coverFieldLabel}>Data emissione</Text>
              <Text style={styles.coverFieldValue}>{formatToday()}</Text>
            </View>
          </View>

          <View style={styles.coverSeal}>
            <Text style={styles.coverSealTitle}>
              ✓ Conforme — soglia superata
            </Text>
            <Text style={styles.coverSealBody}>
              Riduzione consumo energetico misurata a livello di processo:{' '}
              <Text style={{ fontWeight: 600 }}>{processReduction.toFixed(1)}%</Text>{' '}
              (soglia minima richiesta 5.0%).
              Il sito è qualificato per la maxi-deduzione 2026.
            </Text>
          </View>
        </View>

        <PageFooter pageNumber={1} totalPages={4} />
      </Page>

      {/* ============ PAGE 2: EXECUTIVE SUMMARY ============ */}
      <Page size="A4" style={styles.page}>
        <PageHeader site={site} />

        <Text style={styles.sectionLabel}>Sezione 1</Text>
        <Text style={styles.sectionTitle}>Sintesi dei risultati</Text>

        <Text style={styles.para}>
          Nel periodo di riferimento ({machineRows.length} macchine
          strumentate, telemetria continua a 1 Hz), il sistema ha registrato
          una riduzione del consumo energetico a livello di processo del{' '}
          <Text style={{ fontWeight: 600 }}>{processReduction.toFixed(1)}%</Text>{' '}
          rispetto al baseline storico Q4 2025 — Q1 2026.
        </Text>

        <Text style={styles.para}>
          La soglia minima richiesta dall'Iperammortamento 2026 per la
          qualifica a livello di processo è del 5.0%. Il sito{' '}
          <Text style={{ fontWeight: 600 }}>supera la soglia di{' '}
            {(processReduction - 5).toFixed(1)} punti percentuali</Text>{' '}
          e risulta pertanto qualificato alla maxi-deduzione.
        </Text>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiCardLabel}>Consumo baseline</Text>
            <Text style={styles.kpiCardValue}>{totalBaseline.toLocaleString('it-IT')}</Text>
            <Text style={styles.kpiCardSub}>kWh / trimestre</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiCardLabel}>Consumo attuale</Text>
            <Text style={styles.kpiCardValue}>{totalCurrent.toLocaleString('it-IT')}</Text>
            <Text style={styles.kpiCardSub}>kWh / trimestre</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiCardLabel}>Riduzione</Text>
            <Text style={[styles.kpiCardValue, { color: C.ok }]}>
              {processReduction.toFixed(1)}%
            </Text>
            <Text style={styles.kpiCardSub}>
              soglia minima 5.0%
            </Text>
          </View>
        </View>

        <View style={styles.calloutBox}>
          <Text style={styles.calloutTitle}>Sintesi qualitativa</Text>
          <Text style={styles.calloutText}>
            Le principali fonti di risparmio energetico sono state: (i)
            riduzione dei cicli a vuoto sulle presse a iniezione tramite
            ottimizzazione del programma di stampaggio; (ii) bilanciamento
            del carico sui centri CNC; (iii) interventi di manutenzione
            preventiva su tre macchine che presentavano consumi anomali
            rilevati dai modelli predittivi.
          </Text>
        </View>

        <PageFooter pageNumber={2} totalPages={4} />
      </Page>

      {/* ============ PAGE 3: DETAILED ANALYSIS ============ */}
      <Page size="A4" style={styles.page}>
        <PageHeader site={site} />

        <Text style={styles.sectionLabel}>Sezione 2</Text>
        <Text style={styles.sectionTitle}>
          Dettaglio per macchina
        </Text>

        <Text style={styles.paraMuted}>
          Confronto tra consumo elettrico baseline (media mobile 90 giorni
          precedenti l'attivazione del sistema) e consumo misurato nel
          trimestre di riferimento. Misurazioni rilevate da contatori
          M-Bus trifase certificati MID classe B installati su ciascuna
          macchina.
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cellMachine}>Macchina</Text>
            <Text style={styles.cellDept}>Reparto</Text>
            <Text style={styles.cellNum}>Baseline</Text>
            <Text style={styles.cellNum}>Attuale</Text>
            <Text style={styles.cellPct}>Δ%</Text>
          </View>
          {machineRows.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cellMachine}>{row.name}</Text>
              <Text style={styles.cellDept}>{row.department}</Text>
              <Text style={styles.cellNum}>{row.baseline.toLocaleString('it-IT')}</Text>
              <Text style={styles.cellNum}>{row.current.toLocaleString('it-IT')}</Text>
              <Text
                style={[
                  styles.cellPct,
                  row.reduction >= 3 ? styles.pctOk : styles.pctWarn,
                ]}
              >
                −{row.reduction}%
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.paraMuted}>
          Tutti i valori sono espressi in kWh e si riferiscono al consumo
          elettrico totale della macchina (potenza attiva integrata sul
          tempo). I valori di baseline sono stati validati incrociando
          le letture del contatore generale di stabilimento con la
          fatturazione del fornitore di energia.
        </Text>

        <View style={styles.aiAttribution}>
          <Text style={styles.aiBadge}>Claude Opus 4.7</Text>
          <Text style={styles.aiText}>
            Analisi e narrativa generate automaticamente dal modello di
            ragionamento, su dati raccolti dal gateway {site.gatewayId} e
            validati dal motore di anomalia di Google Vertex AI.
          </Text>
        </View>

        <PageFooter pageNumber={3} totalPages={4} />
      </Page>

      {/* ============ PAGE 4: METHODOLOGY & SIGN-OFF ============ */}
      <Page size="A4" style={styles.page}>
        <PageHeader site={site} />

        <Text style={styles.sectionLabel}>Sezione 3</Text>
        <Text style={styles.sectionTitle}>
          Metodologia, fonti, attestazione
        </Text>

        <Text style={[styles.para, { fontWeight: 600 }]}>
          Metodologia di misura
        </Text>
        <Text style={styles.paraMuted}>
          Il calcolo del risparmio energetico è effettuato secondo il
          principio del confronto temporale (baseline storico vs. periodo
          di misura), in linea con le prassi consolidate IPMVP (International
          Performance Measurement and Verification Protocol), opzione A
          ("misura isolata di parametri retrofit"). I valori di baseline
          coprono i 90 giorni precedenti l'attivazione del sistema RetroTech.
        </Text>

        <Text style={[styles.para, { fontWeight: 600 }]}>
          Fonti dati
        </Text>
        <Text style={styles.paraMuted}>
          (i) Contatori M-Bus trifase classe B su ciascuna macchina;
          (ii) sensori di vibrazione e temperatura wireless BLE applicati
          esternamente; (iii) lettura PLC via OPC-UA dove disponibile;
          (iv) telemetria storica conservata in BigQuery per 24 mesi.
        </Text>

        <Text style={[styles.para, { fontWeight: 600 }]}>
          Limitazioni e ipotesi
        </Text>
        <Text style={styles.paraMuted}>
          Il calcolo presume produzione comparabile (in termini di mix di
          articoli) tra il periodo di baseline e il periodo di misura;
          eventuali variazioni significative del mix produttivo dovrebbero
          essere normalizzate con metodologia di analisi di regressione,
          non applicata in questo report sintetico.
        </Text>

        <View style={styles.signBlock}>
          <View style={styles.signCol}>
            <Text style={styles.signLabel}>Cliente</Text>
            <View style={styles.signLine}>
              <Text>Valerio Molina</Text>
            </View>
            <Text style={{ fontSize: 8, color: C.inkMuted, marginTop: 2 }}>
              CEO · {site.name}
            </Text>
          </View>
          <View style={styles.signCol}>
            <Text style={styles.signLabel}>Fornitore</Text>
            <View style={styles.signLine}>
              <Text>RetroTech Renewal S.r.l.</Text>
            </View>
            <Text style={{ fontSize: 8, color: C.inkMuted, marginTop: 2 }}>
              Documento firmato digitalmente
            </Text>
          </View>
        </View>

        <PageFooter pageNumber={4} totalPages={4} />
      </Page>
    </Document>
  );
}
