
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  tab: string;
  color: string;
}

const Buergerservice: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const ref = useScrollReveal();

  const services: ServiceCard[] = [
    {
      title: 'Förderungsprogramme',
      description: 'Alle städtischen Förderprogramme für Klimaschutzmaßnahmen — Anträge, Richtlinien und Beratung.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tab: 'foerderung',
      color: '#2d6a4f',
    },
    {
      title: 'Events & Aktionen',
      description: 'Veranstaltungen, Workshops und Mitmach-Aktionen rund um Klimaschutz und Nachhaltigkeit.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      tab: 'events',
      color: '#6b4c9a',
    },
    {
      title: 'Aktuelle Projekte',
      description: 'Laufende und geplante Klimaschutzprojekte der Stadt Heinsberg auf einen Blick.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      tab: 'projekte',
      color: '#1a5276',
    },
    {
      title: 'Ladesäulen-Karte',
      description: 'Interaktive Karte aller Ladestationen für Elektrofahrzeuge im Kreis Heinsberg.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      tab: 'map',
      color: '#52b788',
    },
    {
      title: 'Blog & Berichte',
      description: 'Aktuelle Berichte, Analysen und Hintergründe zum Klimaschutz in Heinsberg.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      tab: 'blog',
      color: '#b45309',
    },
    {
      title: 'HeinsApp',
      description: 'Alle Klimaschutz-Services auch mobil — Stadtradeln, Förderungen, Events und mehr.',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      tab: 'heinsapp',
      color: '#2d6a4f',
    },
  ];

  const contactInfo = [
    { label: 'Telefon', value: '02452 / 14-0', icon: '📞' },
    { label: 'E-Mail', value: 'klimaschutz@heinsberg.de', icon: '✉️' },
    { label: 'Öffnungszeiten', value: 'Mo–Fr: 8:00–16:00 Uhr', icon: '🕐' },
    { label: 'Adresse', value: 'Apfelstr. 60, 52525 Heinsberg', icon: '📍' },
  ];

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#eff6ff]/30 to-transparent pointer-events-none"></div>
        <div className="max-w-[800px] mx-auto relative z-10">
          <div className="reveal">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788] mb-8 block">Ihr Anliegen</span>
          </div>
          <h1 className="serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-8 reveal stagger-1">
            Bürger<span className="italic text-[#52b788]">service</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-[600px] mx-auto reveal stagger-2">
            Ihr zentraler Anlaufpunkt für alle Klimaschutz-Anliegen. Finden Sie schnell die richtige Anlaufstelle.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={service.title} className={`reveal stagger-${Math.min(i + 1, 6)}`}>
                <button
                  onClick={() => {
                    if (service.tab === 'heinsapp') {
                      window.open('https://heinsapp.de', '_blank');
                    } else {
                      onNavigate?.(service.tab);
                    }
                  }}
                  className="info-card rounded-2xl p-8 text-left w-full group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ background: service.color }}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#2d6a4f] transition-colors">
                    {service.title}
                    {service.tab === 'heinsapp' && (
                      <svg className="w-4 h-4 inline-block ml-1.5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{service.description}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 bg-[#f8f8f5]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-12 reveal">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788]">Kontakt</span>
            <h2 className="serif text-3xl md:text-4xl font-medium mt-4">Klimaschutzteam Heinsberg</h2>
            <p className="text-slate-500 font-medium mt-4">
              Persönliche Beratung zu Förderprogrammen, Projekten und Klimaschutzmaßnahmen.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 reveal stagger-1">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#e5e5e0] p-5 flex items-center gap-4 hover:border-[#52b788] transition-colors"
              >
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">{info.label}</div>
                  <div className="text-sm font-semibold text-[#1a1a1a]">{info.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center reveal">
          <div className="bg-[#0a0a0a] rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="relative z-10">
              <h3 className="serif text-3xl md:text-4xl font-medium mb-4">Alles auch in der HeinsApp</h3>
              <p className="text-slate-400 font-medium mb-8 max-w-md mx-auto">
                Förderanträge, Events, Stadtradeln und mehr — jetzt auch mobil über die HeinsApp.
              </p>
              <a
                href="https://heinsapp.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1a1a1a] text-sm font-medium hover:bg-[#52b788] hover:text-white transition-colors"
              >
                HeinsApp öffnen
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Buergerservice;
