
import React, { useState } from 'react';
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
  paragraphs: string[];
  pullQuote: string;
  pullQuoteAuthor: string;
}

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
    <div className="bg-white rounded-3xl border border-[#e5e5e0] overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-transparent hover:-translate-y-1">
      {/* Color banner */}
      <div className="h-48 relative overflow-hidden" style={{ backgroundColor: post.color }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>
        {/* Tag */}
        <div className="absolute top-5 left-5">
          <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em]">
            {post.tag}
          </span>
        </div>
        {/* Read time */}
        <div className="absolute bottom-5 right-5">
          <span className="text-white/60 text-xs font-medium">{post.readTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: post.color }}>
            {post.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-xs font-semibold text-[#1a1a1a]">{post.author}</p>
            <p className="text-[10px] text-slate-400">{post.date}</p>
          </div>
        </div>

        <h3 className="serif text-xl font-bold text-[#1a1a1a] leading-tight group-hover:text-[#2d6a4f] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        {/* Read more indicator */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs font-bold text-[#2d6a4f] group-hover:text-[#52b788] transition-colors">Weiterlesen</span>
          <svg className="w-3.5 h-3.5 text-[#2d6a4f] group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
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
      {/* Hero banner */}
      <div className="relative h-[340px] overflow-hidden" style={{ backgroundColor: post.color }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <button onClick={onBack} className="reveal flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Alle Beiträge</span>
          </button>

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
    <div ref={ref} className="min-h-screen bg-[#fcfcf9] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="reveal serif text-5xl md:text-8xl font-bold tracking-tighter text-[#1a1a1a] leading-[0.9]">
            Blog
          </h1>
          <p className="reveal stagger-1 text-slate-500 text-lg font-medium max-w-xl mx-auto">
            Neuigkeiten, Analysen und Fortschritte aus dem Klimaschutz im Kreis Heinsberg.
          </p>
        </div>

        {/* Post grid */}
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
    </div>
  );
};

export default Blog;
