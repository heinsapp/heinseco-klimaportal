
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const milestones = [
  {
    year: '2020',
    title: 'Klimanotstand erklärt',
    description: 'Der Kreis Heinsberg erklärt den Klimanotstand und verpflichtet sich zu konkreten Maßnahmen.',
    status: 'done',
  },
  {
    year: '2021',
    title: 'Solaroffensive gestartet',
    description: 'Förderprogramm für 1.000 neue Photovoltaik-Anlagen auf privaten und öffentlichen Dächern.',
    status: 'done',
  },
  {
    year: '2022',
    title: 'Radwegenetz erweitert',
    description: '45km neue Radwege verbinden alle Ortsteile. Fahrradstellplätze an allen Bahnhöfen.',
    status: 'done',
  },
  {
    year: '2023',
    title: 'Klimaneutrales Rathaus',
    description: 'Vollständige Umstellung der kommunalen Gebäude auf erneuerbare Energien und Wärmepumpen.',
    status: 'done',
  },
  {
    year: '2025',
    title: '50% Erneuerbare',
    description: 'Halbierung der fossilen Energieabhängigkeit. Ausbau von Windkraft und Geothermie.',
    status: 'active',
  },
  {
    year: '2030',
    title: 'Klimaneutral 2030',
    description: 'Vollständige Klimaneutralität des Kreises Heinsberg. Kompensation der Restemissionen.',
    status: 'future',
  },
];

const Timeline: React.FC = () => {
  const revealRef = useScrollReveal();

  return (
    <section
      ref={revealRef}
      className="py-32 px-6 bg-white relative overflow-hidden"
    >
      {/* Falling leaves — denser than hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: '3%',  size: 20, color: '#a3b18a', duration: 12, delay: 0,    drift: '70px',  spin: '360deg', sway: 3.2 },
          { left: '10%', size: 14, color: '#52b788', duration: 16, delay: 2,    drift: '-45px', spin: '-280deg', sway: 4.2 },
          { left: '18%', size: 24, color: '#b7c9a0', duration: 14, delay: 5,    drift: '55px',  spin: '400deg', sway: 2.8 },
          { left: '27%', size: 11, color: '#2d6a4f', duration: 20, delay: 1,    drift: '-60px', spin: '-320deg', sway: 5 },
          { left: '35%', size: 18, color: '#d4dcc5', duration: 13, delay: 7,    drift: '40px',  spin: '300deg', sway: 3.5 },
          { left: '43%', size: 15, color: '#a3b18a', duration: 18, delay: 3.5,  drift: '-50px', spin: '-370deg', sway: 4.5 },
          { left: '52%', size: 22, color: '#52b788', duration: 11, delay: 9,    drift: '65px',  spin: '340deg', sway: 3 },
          { left: '60%', size: 13, color: '#2d6a4f', duration: 17, delay: 0.5,  drift: '-35px', spin: '-290deg', sway: 4.8 },
          { left: '70%', size: 19, color: '#b7c9a0', duration: 15, delay: 6,    drift: '75px',  spin: '420deg', sway: 2.6 },
          { left: '78%', size: 16, color: '#d4dcc5', duration: 21, delay: 4,    drift: '-55px', spin: '-350deg', sway: 3.8 },
          { left: '87%', size: 25, color: '#a3b18a', duration: 12, delay: 8,    drift: '50px',  spin: '310deg', sway: 4 },
          { left: '95%', size: 12, color: '#52b788', duration: 19, delay: 11,   drift: '-70px', spin: '-400deg', sway: 5.2 },
        ].map((leaf, i) => (
          <div
            key={i}
            className="leaf"
            style={{
              left: leaf.left,
              top: '-5%',
              '--leaf-duration': `${leaf.duration}s`,
              '--leaf-delay': `${leaf.delay}s`,
              '--leaf-drift': leaf.drift,
              '--leaf-spin': leaf.spin,
              '--leaf-sway': `${leaf.sway}s`,
            } as React.CSSProperties}
          >
            <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" fill={leaf.color} opacity="0.5">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.5-3.5 10.5-8 .5-1.17 1-2.5 1-4-.17-1.5-1.5-2-2.5 0z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-[1000px] mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="reveal serif text-4xl md:text-7xl font-bold tracking-tight text-[#1a1a1a]">
            Unser Weg zu <br /><span className="gradient-text">Klimaneutral 2030</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#e5e5e0] md:-translate-x-px"></div>

          {milestones.map((m, i) => (
            <div
              key={i}
              className={`reveal stagger-${(i % 3) + 1} relative flex items-start mb-12 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot on the line */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className={`w-4 h-4 rounded-full border-4 border-white ${
                  m.status === 'done' ? 'bg-[#2d6a4f]' :
                  m.status === 'active' ? 'bg-[#52b788] shadow-[0_0_12px_rgba(82,183,136,0.5)]' :
                  'bg-[#e5e5e0]'
                }`}></div>
              </div>

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${
                i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
              }`}>
                <div className="info-card rounded-2xl p-6 space-y-2">
                  <div className={`flex items-center gap-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      m.status === 'done' ? 'bg-[#dcfce7] text-[#2d6a4f]' :
                      m.status === 'active' ? 'bg-[#2d6a4f] text-white' :
                      'bg-slate-100 text-slate-400'
                    }`}>{m.year}</span>
                    {m.status === 'active' && (
                      <span className="text-[10px] font-bold uppercase text-[#52b788] tracking-wider">Aktuell</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{m.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{m.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
