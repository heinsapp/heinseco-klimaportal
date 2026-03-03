
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface BlogPost {
  id: string;
  date: string;
  author: string;
  authorRole: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  color: string;
  image: string;
  paragraphs: string[];
  pullQuote: string;
  pullQuoteAuthor: string;
}

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  image: string;
  link?: string;
  heinsApp?: boolean;
}

const events: EventItem[] = [
  {
    id: 'stadtradeln-2026',
    title: 'STADTRADELN Heinsberg 2026',
    description: 'Drei Wochen lang möglichst viele Alltagswege mit dem Fahrrad zurücklegen. Heinsberg radelt gemeinsam für den Klimaschutz — jeder Kilometer zählt!',
    date: '01. Mai 2026',
    endDate: '21. Mai 2026',
    location: 'Gesamtes Stadtgebiet',
    category: 'stadtradeln',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
    link: 'https://www.stadtradeln.de',
    heinsApp: true,
  },
  {
    id: 'garten-2026',
    title: 'Gartenprämierung 2026',
    description: 'Der jährliche Wettbewerb für die schönsten und nachhaltigsten Gärten in Heinsberg.',
    date: '15. Juni 2026',
    endDate: '15. August 2026',
    location: 'Stadtgebiet Heinsberg',
    category: 'gartenprämierung',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    heinsApp: true,
  },
  {
    id: 'workshop-solar',
    title: 'Workshop: Balkonkraftwerke',
    description: 'Praktischer Workshop zur Installation und Nutzung von Balkonkraftwerken.',
    date: '22. März 2026',
    location: 'VHS Heinsberg, Raum 204',
    category: 'workshop',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
  },
  {
    id: 'pflanzboerse',
    title: 'Pflanzen- und Saatgutbörse',
    description: 'Tauschen und verschenken Sie Pflanzen, Saatgut und Gartengeräte.',
    date: '12. April 2026',
    location: 'Marktplatz Heinsberg',
    category: 'allgemein',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop',
  },
  {
    id: 'klimatag',
    title: 'Heinsberger Klimatag',
    description: 'Ein Tag voller Aktionen, Vorträge und Mitmach-Angebote rund um den Klimaschutz.',
    date: '20. September 2026',
    location: 'Stadtpark Heinsberg',
    category: 'allgemein',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
    heinsApp: true,
  },
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  stadtradeln: { label: 'Stadtradeln', color: '#2d6a4f' },
  gartenprämierung: { label: 'Gartenprämierung', color: '#52b788' },
  workshop: { label: 'Workshop', color: '#1a5276' },
  allgemein: { label: 'Veranstaltung', color: '#6b4c9a' },
};

const posts: BlogPost[] = [
  {
    id: 'solar-boom',
    date: '12. Februar 2025',
    author: 'Martin Schröder',
    authorRole: 'Klimaschutzmanager',
    tag: 'Energie',
    title: 'Warum Heinsberg beim Solarausbau alle überholt',
    excerpt: 'Die Zahl der Solaranlagen im Kreis hat sich seit 2020 fast vervierfacht. Was steckt hinter diesem Erfolg — und was können andere Kommunen davon lernen?',
    readTime: '6 Min.',
    color: '#2d6a4f',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    paragraphs: [
      'Als der Kreis Heinsberg 2020 den Klimanotstand erklärte, war die Ausgangslage ernüchternd: Gerade einmal 320 Photovoltaik-Anlagen standen auf den Dächern der Region. Heute sind es über 1.200 — ein Zuwachs von fast 300 Prozent in nur vier Jahren.',
      'Der Schlüssel zum Erfolg war eine Kombination aus drei Faktoren: Erstens senkte die Verwaltung die bürokratischen Hürden drastisch. Wo früher Wochen vergingen, dauert die Genehmigung einer Dachanlage heute im Schnitt drei Tage. Zweitens wurde ein Förderprogramm aufgelegt, das Balkonkraftwerke mit bis zu 200 Euro bezuschusst — ein niedrigschwelliger Einstieg, der besonders Mieter anspricht.',
      'Drittens spielte die Energiepreiskrise 2022 dem Ausbau in die Karten. Die Nachfrage nach Eigenversorgung explodierte, und der Kreis war vorbereitet: Beratungsstellen wurden aufgestockt, Handwerksbetriebe vernetzt, Sammelbestellungen organisiert. Das Ergebnis: In den Spitzenmonaten wurden bis zu 60 Anlagen pro Woche installiert.',
      'Besonders beeindruckend ist der Boom bei Balkonkraftwerken. Seit der Vereinfachung der Anmeldepflicht wurden 489 Stecker-Solargeräte registriert. Die durchschnittliche Anlagengröße auf Einfamilienhäusern beträgt mittlerweile 8,5 kWp — genug, um den Großteil des Eigenbedarfs zu decken.',
    ],
    pullQuote: 'Wir haben bewiesen, dass Klimaschutz keine Frage des Budgets ist, sondern des politischen Willens.',
    pullQuoteAuthor: 'Martin Schröder, Klimaschutzmanager',
  },
  {
    id: 'radschnellweg',
    date: '28. Januar 2025',
    author: 'Lisa Bergmann',
    authorRole: 'Verkehrsplanerin',
    tag: 'Mobilität',
    title: 'Der Radschnellweg RS1: Ein Jahr nach der Eröffnung',
    excerpt: 'Seit einem Jahr verbindet der Radschnellweg RS1 Heinsberg mit Erkelenz. Die Zahlen zeigen: Das Projekt hat die Mobilität in der Region grundlegend verändert.',
    readTime: '5 Min.',
    color: '#1a5276',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
    paragraphs: [
      'Ein Jahr ist es her, dass der Radschnellweg RS1 zwischen Heinsberg und Erkelenz eröffnet wurde. 22 Kilometer, breit genug für Überholvorgänge, beleuchtet, wintergeräumt — ein Premiumprodukt für Radfahrer. Die Bilanz nach zwölf Monaten übertrifft alle Erwartungen.',
      'Durchschnittlich 1.800 Fahrten pro Tag werden auf der Strecke gezählt. An Spitzentagen sind es über 3.000. Die Zahl der Radpendler auf dieser Route hat sich verdreifacht. Besonders in den Morgenstunden zwischen 7 und 9 Uhr ist der RS1 zu einer echten Pendlerautobahn geworden.',
      'Die Auswirkungen reichen über die reine Mobilität hinaus. Entlang der Strecke haben sich drei neue Fahrradwerkstätten angesiedelt. Die Grundstückspreise in den anliegenden Ortschaften sind um durchschnittlich 4 Prozent gestiegen. Und die lokalen Gastronomiebetriebe verzeichnen spürbar mehr Laufkundschaft.',
      'Für 2025 stehen bereits die nächsten Projekte an: Die Verlängerung nach Geilenkirchen und der Bau von überdachten E-Bike-Ladestationen an fünf Knotenpunkten. Der RS1 ist nicht nur ein Radweg — er ist der Beweis, dass gute Infrastruktur Verhalten ändert.',
    ],
    pullQuote: 'Ein Kilometer Radweg ersetzt 180.000 Autokilometer pro Jahr. Die Rechnung geht auf.',
    pullQuoteAuthor: 'Lisa Bergmann, Verkehrsplanerin',
  },
  {
    id: 'buerger-energie',
    date: '15. Januar 2025',
    author: 'Thomas Wilke',
    authorRole: 'Vorstandsvorsitzender BEG',
    tag: 'Gemeinschaft',
    title: 'Bürgerenergiegenossenschaft knackt 3.000-Mitglieder-Marke',
    excerpt: 'Die Bürgerenergiegenossenschaft Heinsberg wächst schneller als je zuvor. Was als kleine Initiative begann, ist zu einer der größten Genossenschaften in NRW geworden.',
    readTime: '4 Min.',
    color: '#6b4f36',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=600&fit=crop',
    paragraphs: [
      'Es begann 2019 mit 47 Gründungsmitgliedern in einem Hinterzimmer des Rathauses. Heute zählt die Bürgerenergiegenossenschaft (BEG) Heinsberg über 3.200 Mitglieder und ist damit eine der größten ihrer Art in Nordrhein-Westfalen. Eine Erfolgsgeschichte, die zeigt: Klimaschutz funktioniert, wenn Menschen ihn selbst in die Hand nehmen.',
      'Das Geschäftsmodell ist einfach: Jedes Mitglied erwirbt mindestens einen Anteil für 500 Euro. Das gesammelte Kapital fließt in Solaranlagen auf öffentlichen Gebäuden, Ladesäulen und Nahwärmenetze. Die Rendite liegt stabil bei 3,5 Prozent — mehr als jedes Sparbuch, und das Geld arbeitet lokal.',
      'Aktuell betreibt die BEG 34 Solaranlagen auf Schulen, Sporthallen und Rathäusern mit einer Gesamtleistung von 4,2 MWp. Dazu kommen 12 öffentliche Ladesäulen und ein Nahwärmenetz in der Innenstadt, das 120 Haushalte versorgt.',
      'Das Besondere: Die BEG ist mehr als ein Finanzinstrument. Sie organisiert monatliche Informationsabende, betreibt eine Energieberatung und vernetzt Handwerksbetriebe mit Hausbesitzern. Jedes Mitglied hat eine Stimme — unabhängig von der Zahl der Anteile.',
    ],
    pullQuote: 'Wenn 3.000 Menschen investieren, entsteht etwas Größeres als eine Solaranlage. Es entsteht Verantwortung.',
    pullQuoteAuthor: 'Thomas Wilke, Vorstandsvorsitzender BEG',
  },
  {
    id: 'hitzeaktionsplan',
    date: '3. Januar 2025',
    author: 'Dr. Anna Mertens',
    authorRole: 'Gesundheitsamt',
    tag: 'Gesundheit',
    title: 'Hitzeaktionsplan: Was wir aus dem Sommer 2024 gelernt haben',
    excerpt: 'Der vergangene Sommer brachte neue Temperaturrekorde. Der Hitzeaktionsplan des Kreises hat sich bewährt — doch die kommenden Jahre werden noch heißer.',
    readTime: '7 Min.',
    color: '#8b4513',
    image: 'https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=800&h=600&fit=crop',
    paragraphs: [
      'Am 29. Juli 2024 wurden in Heinsberg 39,2 Grad Celsius gemessen — ein neuer Rekord. Drei Wochen lang lagen die Temperaturen durchgehend über 30 Grad. Für den Kreis war es der erste echte Stresstest des Hitzeaktionsplans, der im Frühjahr verabschiedet worden war.',
      'Die Bilanz: Das System hat funktioniert. Die Frühwarnung per App erreichte 28.000 Bürger. Zwölf klimatisierte Schutzräume in öffentlichen Gebäuden wurden von insgesamt 4.500 Personen genutzt. Mobile Trinkwasserstationen an 20 Standorten verteilten 35.000 Liter Wasser. Kein einziger Hitzetoter wurde registriert.',
      'Dennoch zeigten sich Schwachstellen. Die Versorgung von Pflegeheimen muss verbessert werden — zwei Einrichtungen meldeten Kapazitätsprobleme bei der Kühlung. Die Kommunikation in Fremdsprachen war unzureichend. Und der öffentliche Nahverkehr musste den Betrieb zeitweise einschränken, weil Oberleitungen überhitzten.',
      'Für 2025 werden die Maßnahmen deutlich ausgeweitet: 500 neue Stadtbäume als natürliche Schattenspender, Trinkbrunnen an allen Spielplätzen und eine Kooperation mit Apotheken als dezentrale Hitzeschutz-Anlaufstellen. Der Sommer kommt — und Heinsberg ist besser vorbereitet als je zuvor.',
    ],
    pullQuote: 'Hitze ist der unsichtbare Killer. Prävention rettet Leben — und kostet einen Bruchteil der Folgeschäden.',
    pullQuoteAuthor: 'Dr. Anna Mertens, Gesundheitsamt',
  },
];

/* ─── BLOG CARD ─── */
const BlogCard: React.FC<{
  post: BlogPost;
  index: number;
  onClick: () => void;
}> = ({ post, index, onClick }) => (
  <article
    onClick={onClick}
    className={`reveal stagger-${(index % 3) + 1} group cursor-pointer`}
  >
    <div className="rounded-2xl overflow-hidden transition-all duration-300" style={{ background: '#f0f0ec' }}>
      {/* Tags row */}
      <div className="flex items-center justify-between px-6 pt-6 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-[11px] font-semibold text-[#1a1a1a]">
            {post.tag}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-[11px] font-semibold text-[#1a1a1a]">
            {post.readTime}
          </span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-[10px] font-bold">
          {post.author.split(' ').map(n => n[0]).join('')}
        </div>
      </div>

      {/* Title & Excerpt */}
      <div className="px-6 pb-4">
        <h3 className="serif text-2xl md:text-3xl font-semibold text-[#1a1a1a] leading-tight mb-2 group-hover:text-[#2d6a4f] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-[#1a1a1a]/60 font-medium leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>

      {/* Image area */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl overflow-hidden h-[280px] relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Read more button */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold text-[#1a1a1a] group-hover:bg-white transition-colors shadow-sm">
              Weiterlesen
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
          {/* Date badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
              {post.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  </article>
);

/* ─── ARTICLE VIEW ─── */
const ArticleView: React.FC<{
  post: BlogPost;
  onBack: () => void;
}> = ({ post, onBack }) => {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="min-h-screen bg-[#fcfcf9]">
      {/* Back button - fixed top left */}
      <div className="sticky top-24 z-40 max-w-[1200px] mx-auto px-6 mb-[-48px]">
        <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-[#e5e5e0]/60 text-[#1a1a1a]/70 hover:text-[#2d6a4f] hover:border-[#2d6a4f]/30 transition-all group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-semibold">Aktuelles</span>
        </button>
      </div>

      {/* Hero banner */}
      <div className="relative h-[340px] md:h-[420px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <span className="reveal px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em] w-fit mb-4">
            {post.tag}
          </span>
          <h1 className="reveal stagger-1 serif text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-[720px] mx-auto px-6 py-16">
        {/* Author + date bar */}
        <div className="reveal flex items-center gap-4 mb-12 pb-8 border-b border-[#e5e5e0]">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: post.color }}>
            {post.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1a1a]">{post.author}</p>
            <p className="text-xs text-slate-400">{post.authorRole} &middot; {post.date} &middot; {post.readTime} Lesezeit</p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-8">
          {post.paragraphs.map((p, i) => (
            <React.Fragment key={i}>
              <p className="reveal text-[16px] leading-[1.85] text-slate-600 font-[430]">
                {p}
              </p>
              {i === 1 && (
                <blockquote className="reveal my-12 py-8 border-l-[3px] border-[#4F6F59] pl-8">
                  <p className="serif text-2xl md:text-3xl italic text-[#1a1a1a] leading-[1.3] font-light">
                    {post.pullQuote}
                  </p>
                  <cite className="block mt-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-400 not-italic">
                    — {post.pullQuoteAuthor}
                  </cite>
                </blockquote>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Back link */}
        <div className="reveal mt-16 pt-8 border-t border-[#e5e5e0]">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#2d6a4f] transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-bold">Zurück zu allen Beiträgen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── EVENTS HERO ─── */
const EventsHero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 4500);
  }, []);

  useEffect(() => {
    if (!isPaused) startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startAutoPlay]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoPlay();
  };

  const activeEvent = events[activeIndex];
  const cat = categoryLabels[activeEvent.category];

  return (
    <section
      className="pt-10 pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Hero card */}
        <div className="rounded-2xl overflow-hidden relative" style={{ background: '#f0f0ec' }}>
          <div className="grid md:grid-cols-2 min-h-[420px]">
            {/* Image side */}
            <div className="relative h-[260px] md:h-auto overflow-hidden">
              {events.map((event, i) => (
                <img
                  key={event.id}
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform: i === activeIndex ? 'scale(1)' : 'scale(1.05)',
                  }}
                />
              ))}
            </div>

            {/* Content side */}
            <div className="p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              {events.map((event, i) => {
                const evtCat = categoryLabels[event.category];
                return (
                  <div
                    key={event.id}
                    className="transition-all duration-600 absolute inset-0 p-8 md:p-12 flex flex-col justify-between"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transform: i === activeIndex ? 'translateX(0)' : 'translateX(40px)',
                      pointerEvents: i === activeIndex ? 'auto' : 'none',
                    }}
                  >
                    <div>
                      {/* Date */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a]/60">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {event.date}{event.endDate ? ` – ${event.endDate}` : ''}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="serif text-3xl md:text-4xl font-semibold text-[#1a1a1a] leading-tight mb-4">
                        {event.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-[#1a1a1a]/50 font-medium mb-4">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {event.location}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#1a1a1a]/60 font-medium leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Spacer to maintain height */}
              <div className="invisible">
                <div className="mb-6"><span className="text-sm">&nbsp;</span></div>
                <h3 className="serif text-3xl md:text-4xl font-semibold leading-tight mb-4">&nbsp;<br />&nbsp;</h3>
                <div className="mb-4"><span className="text-sm">&nbsp;</span></div>
                <p className="text-sm leading-relaxed">&nbsp;<br />&nbsp;<br />&nbsp;</p>
              </div>

              {/* Bottom: nav arrows + progress dots + CTA */}
              <div className="flex items-center justify-between mt-8 relative z-10">
                <div className="flex items-center gap-3">
                  {/* Nav arrows */}
                  <div className="flex items-center gap-1.5 mr-3">
                    <button
                      onClick={() => goTo((activeIndex - 1 + events.length) % events.length)}
                      className="w-8 h-8 rounded-full border border-[#e5e5e0] flex items-center justify-center hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-colors bg-white/50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={() => goTo((activeIndex + 1) % events.length)}
                      className="w-8 h-8 rounded-full border border-[#e5e5e0] flex items-center justify-center hover:border-[#2d6a4f] hover:text-[#2d6a4f] transition-colors bg-white/50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  {/* Progress indicators */}
                  <div className="flex items-center gap-2">
                    {events.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                        style={{ width: i === activeIndex ? '32px' : '12px', background: i === activeIndex ? 'transparent' : '#1a1a1a1a' }}
                      >
                        {i === activeIndex && (
                          <>
                            <div className="absolute inset-0 bg-[#e5e5e0] rounded-full" />
                            <div
                              className="absolute inset-y-0 left-0 bg-[#2d6a4f] rounded-full"
                              style={{
                                animation: isPaused ? 'none' : 'progressFill 4.5s linear forwards',
                              }}
                            />
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mehr erfahren */}
                <span className="btn btn-primary cursor-pointer">
                  Mehr erfahren
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe for progress bar */}
      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

/* ─── MAIN BLOG COMPONENT ─── */
const Blog: React.FC = () => {
  const ref = useScrollReveal();
  const [activePost, setActivePost] = useState<string | null>(null);

  const selectedPost = posts.find(p => p.id === activePost);

  const handlePostClick = (id: string) => {
    setActivePost(id);
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleBack = () => {
    setActivePost(null);
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  if (selectedPost) {
    return <ArticleView post={selectedPost} onBack={handleBack} />;
  }

  return (
    <div ref={ref}>
      {/* Events & Aktionen — Hero Window with auto-scroll */}
      <EventsHero />

      {/* Blog Posts */}
      <section className="pt-6 pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="serif text-3xl md:text-4xl font-medium">Blog & Berichte</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                onClick={() => handlePostClick(post.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
