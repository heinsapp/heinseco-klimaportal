
import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal';

interface MetricDetailProps {
  metricId: string;
  onBack: () => void;
}

/* ─── DATA ─── */
const metrics: Record<string, {
  title: string;
  category: string;
  value: number;
  unit?: string;
  prefix?: string;
  netChange: string;
  netLabel: string;
  subtitle: string;
  chartData: number[];
  chartYears: string[];
  pieData: { label: string; value: number }[];
  highlights: { value: string; label: string }[];
  article: {
    headline: string;
    lead: string;
    paragraphs: string[];
    pullQuote: string;
    pullQuoteAuthor: string;
  };
  sources: string[];
}> = {
  solar: {
    title: 'Solaranlagen',
    category: 'Erneuerbare Energie',
    value: 1247,
    netChange: '+290%',
    netLabel: 'Zuwachs seit 2020',
    subtitle: 'Installierte PV-Anlagen',
    chartData: [320, 480, 620, 850, 1247],
    chartYears: ['2020', '2021', '2022', '2023', '2024'],
    pieData: [
      { label: 'Aufdach', value: 58 },
      { label: 'Balkon', value: 31 },
      { label: 'Freifläche', value: 11 },
    ],
    highlights: [
      { value: '48,5 MWp', label: 'Gesamtleistung' },
      { value: '+312', label: 'Neue Anlagen 2024' },
      { value: '489', label: 'Balkonkraftwerke' },
      { value: '22%', label: 'Eigenversorgungsquote' },
    ],
    article: {
      headline: 'Wie Heinsberg zur Solar-Hochburg wurde',
      lead: 'Der Kreis Heinsberg hat seine installierte Solarkapazität seit 2020 fast vervierfacht. Ein Zusammenspiel aus Förderprogrammen, vereinfachter Bürokratie und wachsendem Umweltbewusstsein treibt den Ausbau voran.',
      paragraphs: [
        'Als der Kreis Heinsberg 2020 den Klimanotstand erklärte, standen gerade einmal 320 Photovoltaik-Anlagen auf den Dächern der Region. Heute, vier Jahre später, sind es fast viermal so viele. Ein Erfolg, der auf mehreren Säulen ruht: Die kommunale Solaroffensive fördert Balkonkraftwerke mit bis zu 200 Euro, die Genehmigungsverfahren wurden radikal vereinfacht, und die Energiepreiskrise hat das Interesse der Bürger an Eigenversorgung massiv gesteigert.',
        'Besonders bemerkenswert ist der Boom bei Balkonkraftwerken. Seit der Vereinfachung der Anmeldepflicht 2023 wurden 489 Stecker-Solargeräte registriert — Tendenz steigend. Die durchschnittliche Anlagengröße auf Einfamilienhäusern beträgt 8,5 kWp, genug um den Großteil des Eigenbedarfs zu decken.',
        'Die Gesamtleistung aller Anlagen erreicht mittlerweile 48,5 Megawatt-Peak. Das entspricht dem jährlichen Strombedarf von etwa 14.500 Haushalten. Jede einzelne Anlage spart durchschnittlich 4,2 Tonnen CO₂ pro Jahr — zusammen ergibt das eine Einsparung von über 5.200 Tonnen jährlich.',
        'Für 2025 plant der Kreis den nächsten großen Schritt: Die Solarpflicht für Neubauten und eine Verdopplung der Fördermittel für Bestandsgebäude. Das Ziel: 2.000 Anlagen bis Ende des Jahres.',
      ],
      pullQuote: 'Jede Anlage auf unseren Dächern ist ein Stück Unabhängigkeit — von fossilen Energien und von steigenden Preisen.',
      pullQuoteAuthor: 'Klimaschutzmanager, Kreis Heinsberg',
    },
    sources: ['Marktstammdatenregister', 'Bundesnetzagentur', 'Kreis Heinsberg Energiebericht 2024'],
  },
  radwege: {
    title: 'Radwege',
    category: 'Nachhaltige Mobilität',
    value: 127,
    unit: 'km',
    netChange: '+76%',
    netLabel: 'Ausbau seit 2020',
    subtitle: 'Ausgebautes Radwegenetz',
    chartData: [72, 85, 95, 109, 127],
    chartYears: ['2020', '2021', '2022', '2023', '2024'],
    pieData: [
      { label: 'Pendler', value: 42 },
      { label: 'Freizeit', value: 35 },
      { label: 'Schulweg', value: 23 },
    ],
    highlights: [
      { value: '18 km', label: 'Neubau 2024' },
      { value: '+34%', label: 'Mehr Radpendler' },
      { value: '2.100', label: 'Stellplätze' },
      { value: '4,2M€', label: 'Investition 2025' },
    ],
    article: {
      headline: 'Die stille Revolution auf zwei Rädern',
      lead: 'Das Radwegenetz im Kreis Heinsberg wächst Jahr für Jahr. Mit 127 Kilometern ausgebauter Strecke hat sich die Fahrradinfrastruktur seit 2020 um 76 Prozent vergrößert — und verändert die Mobilitätsgewohnheiten tausender Pendler.',
      paragraphs: [
        '127 Kilometer — so lang ist das Netz an sicheren, gut ausgebauten Radwegen, das den Kreis Heinsberg heute durchzieht. 2020 waren es noch 72 Kilometer. Der Ausbau folgt einem klaren Plan: Zuerst die Verbindungen zwischen den Ortsteilen, dann die Anbindung an den ÖPNV, zuletzt der Komfort.',
        'Das Herzstück ist der Radschnellweg RS1, der Heinsberg auf 22 Kilometern mit Erkelenz verbindet. Breit genug für Überholvorgänge, beleuchtet, wintergeräumt — ein echtes Premiumprodukt. Seit seiner Eröffnung hat sich die Zahl der Radpendler auf dieser Strecke verdreifacht.',
        'An allen acht Bahnhöfen im Kreisgebiet stehen jetzt gesicherte Fahrradparkplätze zur Verfügung. E-Bike-Ladestationen an 15 Standorten machen auch längere Strecken komfortabel. Die durchschnittliche tägliche Nutzung aller Radwege stieg seit 2020 um 45 Prozent.',
        'Für 2025 sind weitere 4,2 Millionen Euro für den Radwegebau eingeplant. Schwerpunkt: Die letzten Lücken im innerstädtischen Netz schließen und den Anschluss an die Nachbarkreise verbessern.',
      ],
      pullQuote: 'Ein Kilometer Radweg ersetzt 180.000 Autokilometer pro Jahr. Das ist nicht nur Klimaschutz — das ist messbare Lebensqualität.',
      pullQuoteAuthor: 'Verkehrsplanerin, Kreis Heinsberg',
    },
    sources: ['ADFC Fahrradklimatest', 'Kreis Heinsberg Mobilitätskonzept', 'Straßen.NRW'],
  },
  einwohner: {
    title: 'Einwohner aktiv',
    category: 'Bürgerbeteiligung',
    value: 38,
    unit: '%',
    netChange: '+111%',
    netLabel: 'Anstieg seit 2020',
    subtitle: 'Aktive Teilnahme an Klimaprojekten',
    chartData: [18, 22, 28, 33, 38],
    chartYears: ['2020', '2021', '2022', '2023', '2024'],
    pieData: [
      { label: 'Energie', value: 38 },
      { label: 'Mobilität', value: 27 },
      { label: 'Natur', value: 22 },
      { label: 'Bildung', value: 13 },
    ],
    highlights: [
      { value: '47', label: 'Aktive Initiativen' },
      { value: '3.200', label: 'Genossenschaftler' },
      { value: '5.000', label: 'Bäume gepflanzt' },
      { value: '28%', label: 'Unter 25 Jahre' },
    ],
    article: {
      headline: 'Wenn eine ganze Region aufwacht',
      lead: 'Fast vier von zehn Einwohnern im Kreis Heinsberg engagieren sich aktiv in Klimaschutzprojekten. Was 2020 mit einer Handvoll Initiativen begann, ist zu einer breiten Bewegung geworden, die alle Altersgruppen erfasst.',
      paragraphs: [
        '38 Prozent — mehr als jeder dritte Einwohner im Kreis Heinsberg beteiligt sich mittlerweile aktiv an Klimaschutzprojekten. 2020 lag diese Zahl noch bei 18 Prozent. Der Wandel kam nicht über Nacht, sondern durch beharrliche Arbeit von unten: Nachbarschaftsinitiativen, die sich um Gemeinschaftsgärten kümmern, Bürgerenergiegenossenschaften, die in Solarparks investieren, Schulprojekte, die den Nachwuchs sensibilisieren.',
        'Die Bürgerenergiegenossenschaft Heinsberg zählt über 3.200 Mitglieder und ist damit eine der größten in Nordrhein-Westfalen. Sie betreibt Solaranlagen auf öffentlichen Gebäuden, finanziert Ladesäulen und berät Hausbesitzer bei der energetischen Sanierung. Jedes Mitglied ist gleichzeitig Investor und Profiteur der Energiewende.',
        'Besonders ermutigend: Der Anteil junger Menschen unter 25 liegt bei 28 Prozent. Programme wie "Heinsberg pflanzt" — bei dem bereits 5.000 Bäume gesetzt wurden — erreichen Familien und Schulklassen gleichermaßen. Die monatlichen Klimawerkstätten ziehen durchschnittlich 85 Teilnehmer an.',
        'Das Klimaschutzmanagement des Kreises setzt bewusst auf niedrigschwellige Angebote: Repair-Cafés, Tauschbörsen, gemeinsames Urban Gardening. Die Botschaft: Klimaschutz beginnt im Alltag, nicht im Rathaus.',
      ],
      pullQuote: 'Klimaschutz funktioniert nur, wenn er von den Menschen getragen wird. Die Zahlen zeigen: Heinsberg hat das verstanden.',
      pullQuoteAuthor: 'Landrat Kreis Heinsberg',
    },
    sources: ['Bürgerbefragung Kreis Heinsberg 2024', 'Klimaschutzmanagement', 'Ehrenamtsregister'],
  },
  emissionen: {
    title: 'Emissionen gesenkt',
    category: 'Treibhausgasbilanz',
    value: 18.6,
    unit: 'kt',
    prefix: '-',
    netChange: '-14,2%',
    netLabel: 'Reduktion seit 2019',
    subtitle: 'Kilotonnen CO₂ weniger',
    chartData: [131, 126, 121, 116, 112.4],
    chartYears: ['2020', '2021', '2022', '2023', '2024'],
    pieData: [
      { label: 'Gebäude', value: 41 },
      { label: 'Verkehr', value: 32 },
      { label: 'Industrie', value: 18 },
      { label: 'Sonstige', value: 9 },
    ],
    highlights: [
      { value: '-14,2%', label: 'Gesamtreduktion' },
      { value: '-21%', label: 'Gebäudesektor' },
      { value: '-8,5%', label: 'Verkehr' },
      { value: '36%', label: 'Weg zum Ziel 2030' },
    ],
    article: {
      headline: 'Der lange Abstieg der Emissionskurve',
      lead: 'Der Kreis Heinsberg hat seine CO₂-Emissionen seit dem Referenzjahr 2019 um 18,6 Kilotonnen gesenkt — ein Rückgang von 14,2 Prozent. Die größten Fortschritte kommen aus dem Gebäudesektor, doch die ambitionierten Klimaziele erfordern noch deutlich mehr.',
      paragraphs: [
        '131 Kilotonnen CO₂ — so viel stieß der Kreis Heinsberg 2020 noch aus. Heute sind es 112,4 Kilotonnen. 18,6 Kilotonnen weniger, das klingt nach einer Zahl auf dem Papier. In der Realität bedeutet es: Tausende sanierte Gebäude, Hunderte abgeschaltete Ölheizungen, eine komplett elektrifizierte Busflotte.',
        'Den größten Beitrag leistet der Gebäudesektor mit einem Rückgang von 21 Prozent. Die Umstellung auf Wärmepumpen, die energetische Sanierung von Altbauten und die Solarthermie auf Neubauten zeigen Wirkung. Allein die Schließung des letzten regionalen Kohlekraftwerks ersparte der Atmosphäre 8.400 Tonnen CO₂ jährlich.',
        'Im Verkehrssektor ist der Fortschritt mit minus 8,5 Prozent langsamer, aber messbar. Die Elektrifizierung des ÖPNV reduziert die Emissionen um 3.200 Tonnen pro Jahr. Die LED-Umrüstung der gesamten Straßenbeleuchtung spart weitere 420 Tonnen. Kleinvieh, das sich summiert.',
        'Doch der Weg ist noch weit: Das Ziel lautet minus 65 Prozent bis 2030 gegenüber 1990. Aktuell hat Heinsberg 36 Prozent dieses Weges zurückgelegt. Die nächste große Herausforderung: Der Industriesektor, der bislang nur marginal beigetragen hat.',
      ],
      pullQuote: 'Jede nicht ausgestoßene Tonne CO₂ ist ein Gewinn für kommende Generationen. Aber wir müssen das Tempo verdreifachen.',
      pullQuoteAuthor: 'Umweltamt Kreis Heinsberg',
    },
    sources: ['Treibhausgasbilanz NRW', 'Klimaschutzkonzept Kreis Heinsberg', 'Umweltbundesamt'],
  },
};

/* ─── LINE CHART (Bloomberg-style) ─── */
const LineChart: React.FC<{ data: number[]; years: string[]; metricId: string }> = ({ data, years, metricId }) => {
  const w = 400;
  const h = 220;
  const px = 40;
  const py = 30;
  const max = Math.max(...data) * 1.08;
  const min = Math.min(...data) * 0.92;
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: px + (i / (data.length - 1)) * (w - px * 2),
    y: h - py - ((v - min) / range) * (h - py * 2),
    v,
  }));

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${pts[pts.length - 1].x},${h - py} L${pts[0].x},${h - py} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h + 25}`} className="w-full h-full">
      <defs>
        <linearGradient id={`lg-${metricId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={px} y1={py + i * ((h - py * 2) / 3)} x2={w - px} y2={py + i * ((h - py * 2) / 3)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {/* Area */}
      <path d={area} fill={`url(#lg-${metricId})`} />
      {/* Line */}
      <path d={line} fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Points + Labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={i === pts.length - 1 ? 6 : 4} fill={i === pts.length - 1 ? '#fff' : '#0a0a0a'} stroke="#fff" strokeWidth="2" />
          <text x={p.x} y={p.y - 14} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="11" fontWeight="700" fontFamily="Inter, sans-serif">
            {typeof p.v === 'number' && p.v % 1 !== 0 ? p.v.toFixed(1) : p.v.toLocaleString('de-DE')}
          </text>
          <text x={p.x} y={h + 15} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">
            {years[i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

/* ─── PIE / DONUT CHART ─── */
const DonutChart: React.FC<{ data: { label: string; value: number }[] }> = ({ data }) => {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const strokeW = 28;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = ['rgba(255,255,255,0.85)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)'];

  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {data.map((d, i) => {
          const dashLen = (d.value / total) * circ;
          const dashOff = -offset;
          offset += dashLen;
          return (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={colors[i]}
              strokeWidth={strokeW}
              strokeDasharray={`${dashLen} ${circ - dashLen}`}
              strokeDashoffset={dashOff}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i] }}></span>
            <span className="text-[11px] font-medium text-white/50">{d.label} <span className="text-white/80 font-bold">{d.value}%</span></span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ─── */
const MetricDetail: React.FC<MetricDetailProps> = ({ metricId, onBack }) => {
  const ref = useScrollReveal();
  const m = metrics[metricId];
  const counterRef = useAnimatedCounter(m?.value ?? 0, 2000);

  if (!m) return null;

  return (
    <div ref={ref} className="min-h-screen bg-[#fcfcf9]">

      {/* ━━━ HERO: Bloomberg-style two-panel ━━━ */}
      <section className="bg-[#0a0a0a] relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>

        <div className="max-w-[1300px] mx-auto px-6 pt-12 pb-8 relative z-10">
          {/* Back */}
          <button onClick={onBack} className="reveal flex items-center gap-2 text-white/30 hover:text-white transition-colors mb-12 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Übersicht</span>
          </button>

          {/* Two-panel layout */}
          <div className="reveal stagger-1 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[28px] overflow-hidden min-h-[480px]">
            {/* LEFT — Chart panel */}
            <div className="bg-[#141414] p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight leading-[1.1]">
                  {m.title}
                </h1>
                <p className="text-white/30 text-sm font-medium mt-2">{m.subtitle}</p>
              </div>

              {/* Line chart */}
              <div className="mt-8 -mx-2">
                <LineChart data={m.chartData} years={m.chartYears} metricId={metricId} />
              </div>

              {/* Data labels */}
              <div className="flex items-center gap-6 mt-4">
                {m.chartYears.length > 0 && (
                  <>
                    <div>
                      <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{m.chartYears[0]}</span>
                      <p className="text-white text-lg font-bold">
                        {typeof m.chartData[0] === 'number' && m.chartData[0] % 1 !== 0
                          ? m.chartData[0].toFixed(1) : m.chartData[0].toLocaleString('de-DE')}
                        {m.unit && <span className="text-white/30 text-sm ml-1">{m.unit}</span>}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div>
                      <span className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{m.chartYears[m.chartYears.length - 1]}</span>
                      <p className="text-white text-lg font-bold">
                        {typeof m.chartData[m.chartData.length - 1] === 'number' && m.chartData[m.chartData.length - 1] % 1 !== 0
                          ? m.chartData[m.chartData.length - 1].toFixed(1) : m.chartData[m.chartData.length - 1].toLocaleString('de-DE')}
                        {m.unit && <span className="text-white/30 text-sm ml-1">{m.unit}</span>}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT — Big number + Donut */}
            <div className="bg-[#1a1a1a] p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
              {/* Net change — big number */}
              <div className="mb-10">
                <div className="flex items-baseline justify-center">
                  {m.prefix && <span className="text-6xl md:text-8xl font-bold tracking-tighter text-white">{m.prefix}</span>}
                  <span ref={counterRef} className="text-6xl md:text-8xl font-bold tracking-tighter text-white">0</span>
                  {m.unit && <span className="text-2xl md:text-3xl font-medium text-white/25 ml-2">{m.unit}</span>}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mt-4">{m.netLabel}</p>
              </div>

              {/* Donut chart */}
              <DonutChart data={m.pieData} />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ HIGHLIGHTS BAR ━━━ */}
      <section className="bg-[#0a0a0a] px-6 pb-16">
        <div className="max-w-[1300px] mx-auto">
          <div className="reveal stagger-2 grid grid-cols-2 md:grid-cols-4 gap-3">
            {m.highlights.map((h, i) => (
              <div key={i} className="bg-[#141414] rounded-2xl p-5 border border-white/[0.04] text-center">
                <p className="text-xl md:text-2xl font-bold tracking-tight text-white">{h.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/25 mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ARTICLE ━━━ */}
      <section className="px-6 py-24">
        <div className="max-w-[720px] mx-auto">
          {/* Article header */}
          <div className="reveal space-y-6 mb-16">
            <h2 className="serif text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a] leading-[1.1]">
              {m.article.headline}
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              {m.article.lead}
            </p>
            <div className="w-16 h-px bg-[#e5e5e0]"></div>
          </div>

          {/* Article body */}
          <div className="space-y-8">
            {m.article.paragraphs.map((p, i) => (
              <React.Fragment key={i}>
                <p className="reveal text-[16px] leading-[1.85] text-slate-600 font-[430]">
                  {p}
                </p>
                {/* Pull quote after second paragraph */}
                {i === 1 && (
                  <blockquote className="reveal my-12 py-8 border-l-[3px] border-[#4F6F59] pl-8">
                    <p className="serif text-2xl md:text-3xl italic text-[#1a1a1a] leading-[1.3] font-light">
                      {m.article.pullQuote}
                    </p>
                    <cite className="block mt-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 not-italic">
                      — {m.article.pullQuoteAuthor}
                    </cite>
                  </blockquote>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Sources */}
          <div className="reveal mt-20 pt-8 border-t border-[#e5e5e0]">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Quellen</h4>
            <div className="flex flex-wrap gap-2">
              {m.sources.map((s, i) => (
                <span key={i} className="text-[11px] font-medium text-slate-400 px-3 py-1.5 rounded-full bg-slate-50 border border-[#f0f0ed]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MetricDetail;
