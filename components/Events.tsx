
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useEvents } from '../hooks/useKlimaData';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  end_date?: string | null;
  location: string;
  category: string;
  image: string;
  link?: string | null;
  heinsApp?: boolean;
  heins_app?: boolean;
}

const events: Event[] = [
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
    description: 'Der jährliche Wettbewerb für die schönsten und nachhaltigsten Gärten in Heinsberg. Melden Sie Ihren Garten an und gewinnen Sie tolle Preise!',
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
    description: 'Praktischer Workshop zur Installation und Nutzung von Balkonkraftwerken. Experten zeigen Ihnen Schritt für Schritt den Weg zur eigenen Solaranlage.',
    date: '22. März 2026',
    location: 'VHS Heinsberg, Raum 204',
    category: 'workshop',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
  },
  {
    id: 'pflanzboerse',
    title: 'Pflanzen- und Saatgutbörse',
    description: 'Tauschen und verschenken Sie Pflanzen, Saatgut und Gartengeräte. Gemeinsam für mehr Biodiversität in unseren Gärten.',
    date: '12. April 2026',
    location: 'Marktplatz Heinsberg',
    category: 'allgemein',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop',
  },
  {
    id: 'klimatag',
    title: 'Heinsberger Klimatag',
    description: 'Ein Tag voller Aktionen, Vorträge und Mitmach-Angebote rund um den Klimaschutz. Für Familien, Schulklassen und alle Interessierten.',
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

const Events: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const ref = useScrollReveal();
  const { data: dbEvents } = useEvents();
  // Use Supabase data if available, fallback to hardcoded
  const liveEvents: Event[] = dbEvents.length > 0
    ? dbEvents.map(e => ({ ...e, endDate: e.end_date || undefined, heinsApp: e.heins_app } as Event))
    : events;
  const [filter, setFilter] = useState<string>('alle');

  const filteredEvents = filter === 'alle' ? liveEvents : liveEvents.filter(e => e.category === filter);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fef9c3]/20 to-transparent pointer-events-none"></div>
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="reveal">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788] mb-8 block">Veranstaltungen</span>
          </div>
          <h1 className="serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 reveal stagger-1">
            Events &<br />
            <span className="italic text-[#52b788]">Aktionen</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-[600px] mx-auto reveal stagger-2">
            Gemeinsam aktiv für den Klimaschutz. Entdecken Sie Veranstaltungen, Wettbewerbe und Mitmach-Aktionen in Heinsberg.
          </p>
        </div>
      </section>

      {/* Featured: Stadtradeln */}
      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto reveal">
          <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] text-white">
            <div className="absolute inset-0 opacity-30">
              <img src={liveEvents[0]?.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#2d6a4f] text-white text-[10px] font-bold uppercase tracking-[0.15em] mb-4">
                  Highlight
                </span>
                <h2 className="serif text-3xl md:text-4xl font-medium mb-3">{liveEvents[0]?.title}</h2>
                <p className="text-slate-300 font-medium mb-2 max-w-lg">{liveEvents[0]?.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400 font-medium mt-4">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {liveEvents[0]?.date} — {liveEvents[0]?.endDate || liveEvents[0]?.end_date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {liveEvents[0]?.location}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={liveEvents[0]?.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-white"
                >
                  Jetzt anmelden
                </a>
                {(liveEvents[0]?.heinsApp || liveEvents[0]?.heins_app) && (
                  <a
                    href="https://heinsapp.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    In der HeinsApp
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Events Grid */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12 reveal">
            {['alle', 'stadtradeln', 'gartenprämierung', 'workshop', 'allgemein'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-white border border-[#e5e5e0] text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f]'
                }`}
              >
                {cat === 'alle' ? 'Alle Events' : categoryLabels[cat]?.label || cat}
              </button>
            ))}
          </div>

          {/* Event cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, i) => (
              <div key={event.id} className={`reveal stagger-${Math.min(i + 1, 6)}`}>
                <div className="info-card rounded-2xl overflow-hidden group cursor-pointer">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] text-white"
                        style={{ background: categoryLabels[event.category]?.color }}
                      >
                        {categoryLabels[event.category]?.label}
                      </span>
                    </div>
                    {event.heinsApp && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-block px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-[#2d6a4f]">
                          HeinsApp
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                        {event.location}
                      </span>
                    </div>
                    <h3 className="serif text-lg font-medium mb-2 group-hover:text-[#2d6a4f] transition-colors">{event.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gartenprämierung Highlight */}
      <section className="py-24 px-6 bg-[#f8f8f5]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center reveal">
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788] mb-4 block">Jährlicher Wettbewerb</span>
              <h2 className="serif text-3xl md:text-4xl font-medium mb-4">Gartenprämierung 2026</h2>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Zeigen Sie Ihren nachhaltigen Garten! Ob Insektenwiese, Regenwassergarten oder Urban Gardening — wir prämieren die kreativsten und umweltfreundlichsten Gärten in Heinsberg.
              </p>
              <div className="space-y-3 mb-8">
                {['Anmeldung bis 15. Juni 2026', 'Bewertung durch Fachjury', 'Attraktive Preise & Urkunden', 'Gewinner im Blog & HeinsApp'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-[#2d6a4f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button className="btn btn-primary">
                  Garten anmelden
                </button>
                <a
                  href="https://heinsapp.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  HeinsApp
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full md:w-[400px] h-[350px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=500&fit=crop"
                alt="Gartenprämierung"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
