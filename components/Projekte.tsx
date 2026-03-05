
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useProjects } from '../hooks/useKlimaData';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'laufend' | 'abgeschlossen' | 'geplant';
  category: string;
  image: string;
  startDate?: string;
  start_date?: string;
  blogId?: string | null;
  blog_id?: string | null;
}

const projects: Project[] = [
  {
    id: 'solaroffensive',
    title: 'Solaroffensive Heinsberg',
    description: 'Ausbau der Photovoltaik auf öffentlichen Gebäuden und Förderung von Balkonkraftwerken für Privathaushalte. Ziel: 2.000 neue Anlagen bis 2027.',
    status: 'laufend',
    category: 'Energie',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
    startDate: 'Januar 2024',
    blogId: 'solar-boom',
  },
  {
    id: 'radschnellweg',
    title: 'Radschnellweg RS1',
    description: 'Verbindung Heinsberg–Erkelenz über einen modernen Radschnellweg. Sicheres, schnelles Radfahren für Pendler und Alltagsverkehr.',
    status: 'laufend',
    category: 'Mobilität',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
    startDate: 'März 2023',
    blogId: 'radschnellweg',
  },
  {
    id: 'stadtbegruenung',
    title: 'Stadtbegrünung & Klimaoasen',
    description: 'Schaffung von Grünflächen, Pocket Parks und begrünten Fassaden im Innenstadtbereich. Für bessere Luft und mehr Lebensqualität.',
    status: 'geplant',
    category: 'Natur',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    startDate: 'Sommer 2026',
  },
  {
    id: 'ladeinfrastruktur',
    title: 'Ausbau Ladeinfrastruktur',
    description: 'Installation von 25 neuen Schnellladestationen im Stadtgebiet in Kooperation mit regionalen Energieversorgern.',
    status: 'laufend',
    category: 'Mobilität',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
    startDate: 'Oktober 2024',
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  laufend: { label: 'Laufend', color: '#2d6a4f', bg: '#dcfce7' },
  abgeschlossen: { label: 'Abgeschlossen', color: '#1a5276', bg: '#dbeafe' },
  geplant: { label: 'Geplant', color: '#92400e', bg: '#fef3c7' },
};

const Projekte: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const ref = useScrollReveal();
  const [filter, setFilter] = useState<string>('alle');
  const { data: dbProjects } = useProjects();
  const liveProjects: Project[] = dbProjects.length > 0
    ? dbProjects.map(p => ({ ...p, startDate: p.start_date, blogId: p.blog_id }))
    : projects;

  const filteredProjects = filter === 'alle' ? liveProjects : liveProjects.filter(p => p.status === filter);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ecfdf5]/40 to-transparent pointer-events-none"></div>
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="reveal">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788] mb-8 block">Aktuelle Projekte</span>
          </div>
          <h1 className="serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 reveal stagger-1">
            Was wir<br />
            <span className="italic text-[#52b788]">bewegen.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-[600px] mx-auto reveal stagger-2">
            Klimaschutz in Aktion. Entdecken Sie die laufenden und geplanten Projekte der Stadt Heinsberg für eine nachhaltige Zukunft.
          </p>
        </div>
      </section>

      {/* Filter + Projects */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-12 reveal">
            {['alle', 'laufend', 'geplant', 'abgeschlossen'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === status
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-white border border-[#e5e5e0] text-slate-600 hover:border-[#2d6a4f] hover:text-[#2d6a4f]'
                }`}
              >
                {status === 'alle' ? 'Alle Projekte' : statusConfig[status]?.label || status}
              </button>
            ))}
          </div>

          {/* Project cards */}
          <div className="space-y-6">
            {filteredProjects.map((project, i) => (
              <div key={project.id} className={`reveal stagger-${Math.min(i + 1, 4)}`}>
                <div className="info-card rounded-2xl overflow-hidden group">
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: statusConfig[project.status].color, background: statusConfig[project.status].bg }}
                        >
                          {statusConfig[project.status].label}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{project.category}</span>
                      </div>

                      <h3 className="serif text-2xl md:text-3xl font-medium mb-3 group-hover:text-[#2d6a4f] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed mb-4">{project.description}</p>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-slate-400 font-medium">Start: {project.startDate}</span>
                        {project.blogId && (
                          <button
                            onClick={() => onNavigate?.('blog')}
                            className="text-[#2d6a4f] font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Zum Beitrag
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788] mb-4 block reveal">Auf einen Blick</span>
          <h2 className="serif text-3xl md:text-4xl font-medium mb-16 reveal stagger-1">Klimaschutz in Zahlen</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 reveal stagger-2">
            {[
              { value: '4', label: 'Aktive Projekte' },
              { value: '1.200+', label: 'Solaranlagen' },
              { value: '15', label: 'Ladestationen' },
              { value: '42 km', label: 'Radwege' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="serif text-4xl md:text-5xl font-medium text-[#52b788] mb-2">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[700px] mx-auto text-center reveal">
          <h3 className="serif text-2xl md:text-3xl font-medium mb-4">Eigenes Projekt vorschlagen?</h3>
          <p className="text-slate-500 font-medium mb-8">
            Sie haben eine Idee für ein Klimaschutzprojekt? Wir freuen uns über Vorschläge aus der Bürgerschaft.
          </p>
          <button
            onClick={() => onNavigate?.('buergerservice')}
            className="btn btn-primary"
          >
            Zum Bürgerservice
          </button>
        </div>
      </section>
    </div>
  );
};

export default Projekte;
