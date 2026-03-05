
import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useFundingPrograms } from '../hooks/useKlimaData';

interface FundingProgram {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  tag: string;
  color: string;
  bgColor?: string;
  bg_color?: string;
  image: string;
}

const programs: FundingProgram[] = [
  {
    id: 'solar',
    title: 'Solaranlagen-Förderung',
    description: 'Zuschuss für PV-Anlagen und Balkonkraftwerke auf privaten Wohngebäuden.',
    amount: 'Bis zu 2.000 €',
    deadline: '31.12.2026',
    category: 'Energie',
    tag: 'Privat & Gewerbe',
    color: '#2d6a4f',
    bgColor: '#f0f0ec',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=1000&fit=crop',
  },
  {
    id: 'daemmung',
    title: 'Gebäude\u00addämmung',
    description: 'Energetische Sanierung: Fassaden-, Dach- und Kellerdeckendämmung.',
    amount: 'Bis zu 5.000 €',
    deadline: '31.12.2026',
    category: 'Gebäude',
    tag: 'Bestandsgebäude',
    color: '#2d6a4f',
    bgColor: '#f0f0ec',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop',
  },
  {
    id: 'lastenrad',
    title: 'Lastenrad-Prämie',
    description: 'Zuschuss für Lastenfahrräder und E-Lastenräder.',
    amount: 'Bis zu 1.000 €',
    deadline: '30.09.2026',
    category: 'Mobilität',
    tag: 'Privat & Gewerbe',
    color: '#2d6a4f',
    bgColor: '#f0f0ec',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=1000&fit=crop',
  },
  {
    id: 'gruendach',
    title: 'Dach- & Fassaden\u00adbegrünung',
    description: 'Begrünungsmaßnahmen für besseres Stadtklima und Biodiversität.',
    amount: 'Bis zu 3.000 €',
    deadline: '31.12.2026',
    category: 'Natur',
    tag: 'Alle Gebäudetypen',
    color: '#2d6a4f',
    bgColor: '#f0f0ec',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=1000&fit=crop',
  },
];

const guidelines = [
  { title: 'Förderrichtlinien 2026', desc: 'Allgemeine Richtlinien für alle Förderprogramme', type: 'PDF', size: '340 KB' },
  { title: 'Antrag Solaranlagen', desc: 'Antragsformular für PV-Anlagen & Balkonkraftwerke', type: 'PDF', size: '128 KB' },
  { title: 'Antrag Gebäudedämmung', desc: 'Antragsformular für energetische Sanierung', type: 'PDF', size: '142 KB' },
  { title: 'Antrag Lastenrad', desc: 'Antragsformular für Lastenrad-Prämie', type: 'PDF', size: '96 KB' },
  { title: 'Antrag Dachbegrünung', desc: 'Antragsformular für Begrünungsmaßnahmen', type: 'PDF', size: '112 KB' },
];

const Foerderung: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const ref = useScrollReveal();
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const { data: dbPrograms } = useFundingPrograms();
  const livePrograms: FundingProgram[] = dbPrograms.length > 0
    ? dbPrograms.map(p => ({ ...p, bgColor: p.bg_color }))
    : programs;

  return (
    <div ref={ref}>

      {/* Programs Grid — Visual Cards */}
      <section className="pt-10 pb-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="serif text-4xl md:text-6xl font-bold tracking-tight">So wirst du gefördert</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {livePrograms.map((program, i) => (
              <div
                key={program.id}
                className={`reveal stagger-${i + 1}`}
              >
                <div
                  className="rounded-2xl overflow-hidden cursor-pointer group relative"
                  style={{ background: program.bgColor }}
                  onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                >
                  {/* Tags row */}
                  <div className="flex items-center justify-between px-6 pt-6 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-[11px] font-semibold text-[#1a1a1a]">
                        {program.amount}
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-[11px] font-semibold text-[#1a1a1a]">
                        {program.tag}
                      </span>
                    </div>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                      style={{ background: program.color }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                      </svg>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="px-6 pb-4">
                    <h3 className="serif text-2xl md:text-3xl font-semibold text-[#1a1a1a] leading-tight mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/60 font-medium leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Image area */}
                  <div className="px-4 pb-4">
                    <div className="rounded-2xl overflow-hidden h-[280px] relative">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Read more button overlay */}
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold text-[#1a1a1a] group-hover:bg-white transition-colors shadow-sm">
                          Mehr erfahren
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </div>
                      {/* Deadline badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                          Frist: {program.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedProgram === program.id && (
                    <div className="px-6 pb-6">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/80">
                        <h4 className="text-sm font-bold mb-3 text-[#1a1a1a]">Voraussetzungen</h4>
                        <ul className="space-y-2.5 text-sm text-[#1a1a1a]/70">
                          <li className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: program.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Hauptwohnsitz im Stadtgebiet Heinsberg
                          </li>
                          <li className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: program.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Antragstellung vor Maßnahmenbeginn
                          </li>
                          <li className="flex items-start gap-2.5">
                            <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: program.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            Fachgerechte Ausführung durch zertifizierte Betriebe
                          </li>
                        </ul>
                        <div className="flex gap-3 mt-6">
                          <button className="btn btn-primary">
                            Antrag stellen
                          </button>
                          <button className="btn btn-secondary">
                            PDF herunterladen
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-24 px-6 bg-[#f8f8f5]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="serif text-3xl md:text-4xl font-medium">Anträge & Richtlinien</h2>
            <p className="text-slate-500 font-medium mt-4 max-w-[500px] mx-auto">
              Alle Formulare und Richtlinien zum Herunterladen. Füllen Sie den Antrag aus und reichen Sie ihn bei der Stadtverwaltung ein.
            </p>
          </div>

          <div className="space-y-3">
            {guidelines.map((doc, i) => (
              <div
                key={i}
                className={`reveal stagger-${Math.min(i + 1, 6)} flex items-center justify-between p-5 bg-white rounded-xl border border-[#e5e5e0] hover:border-[#52b788] hover:shadow-sm transition-all duration-300 cursor-pointer group`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#fef2f2] flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a1a]">{doc.title}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{doc.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">{doc.type} · {doc.size}</span>
                  <div className="w-8 h-8 rounded-full bg-[#f0f0ed] flex items-center justify-center group-hover:bg-[#2d6a4f] group-hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center reveal">
          <div className="bg-[#0a0a0a] rounded-2xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="serif text-3xl md:text-4xl font-medium mb-4">Fragen zur Förderung?</h3>
              <p className="text-slate-400 font-medium mb-8 max-w-md mx-auto">
                Das Klimaschutzteam berät Sie gerne persönlich zu allen Fördermöglichkeiten.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:klimaschutz@heinsberg.de"
                  className="btn btn-white"
                >
                  Kontakt aufnehmen
                </a>
                <a
                  href="https://heinsapp.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  In der HeinsApp öffnen
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Foerderung;
