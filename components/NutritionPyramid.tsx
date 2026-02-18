
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const categories = [
  {
    name: 'Energie',
    icon: '⚡',
    color: 'bg-[#2d5a27]',
    hoverBg: 'hover:bg-[#2d5a27]',
    description: 'Wind, Solar & Geothermie als Fundament der lokalen Stromversorgung',
    stat: '48.5% erneuerbar',
  },
  {
    name: 'Regenwasser',
    icon: '💧',
    color: 'bg-blue-600',
    hoverBg: 'hover:bg-blue-600',
    description: 'Dezentrale Regenwassernutzung für Garten, Toiletten und Bewässerung',
    stat: '15.000L/Haushalt',
  },
  {
    name: 'Bodenschutz',
    icon: '🌱',
    color: 'bg-[#3d2b1f]',
    hoverBg: 'hover:bg-[#3d2b1f]',
    description: 'Humusaufbau, Kompostierung und Schutz natürlicher Böden gegen Erosion',
    stat: '2.400ha geschützt',
  },
  {
    name: 'Solarenergie',
    icon: '☀️',
    color: 'bg-amber-500',
    hoverBg: 'hover:bg-amber-500',
    description: 'Photovoltaik auf jedem Dach — Balkonkraftwerke als schneller Einstieg',
    stat: '1.200 Anlagen',
  },
  {
    name: 'Aufforstung',
    icon: '🌳',
    color: 'bg-emerald-600',
    hoverBg: 'hover:bg-emerald-600',
    description: 'Städtische Baumpflanzungen und Renaturierung von Flächen im Kreisgebiet',
    stat: '12.400 Bäume',
  },
];

const NutritionPyramid: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-[#fcfcf9] overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-slate-100/30 to-transparent rounded-full blur-3xl"></div>

      {/* Top Badge */}
      <div className="flex justify-center mb-20">
        <div className="reveal bg-[#e5e5e0] px-6 py-2 rounded-full flex items-center space-x-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
          </div>
          <span>Klima-Pyramide Heinsberg</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-10 z-10">
          <h2 className="reveal text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1a1a1a] leading-[0.9]">
            Energie, Wasser,<br />
            & Erneuerung
          </h2>

          <div className="space-y-6 max-w-md">
            <p className="reveal stagger-1 text-lg font-medium leading-relaxed text-[#1a1a1a]">
              Wir beenden die Verschwendung. Jeder Haushalt muss den Übergang zu effizienter Energienutzung prioritär behandeln. Lokale Ressourcen aus Wind, Sonne und Geothermie bilden das Fundament unserer neuen, grünen Ökonomie.
            </p>

            <div className="reveal stagger-2 flex items-center gap-4 p-4 rounded-2xl bg-[#dcfce7]/50 border border-[#a3b18a]/20">
              <div className="w-12 h-12 rounded-xl bg-[#2d6a4f] flex items-center justify-center text-white text-xl shrink-0">📊</div>
              <div>
                <p className="text-sm font-bold text-[#2d6a4f]">Sparziel 2030</p>
                <p className="text-xs text-slate-500">Reduktion des Energieverbrauchs um 20% pro Kopf</p>
              </div>
            </div>
          </div>

          {/* Progress bars */}
          <div className="reveal stagger-3 space-y-4">
            {[
              { label: 'Erneuerbare Energie', pct: 48.5, color: 'bg-[#2d6a4f]' },
              { label: 'Regenwassernutzung', pct: 32, color: 'bg-blue-500' },
              { label: 'Aufforstungsziel', pct: 65, color: 'bg-emerald-500' },
            ].map((bar, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">{bar.label}</span>
                  <span className="text-slate-400">{bar.pct}%</span>
                </div>
                <div className="h-2 bg-[#e5e5e0] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${bar.color} rounded-full progress-bar`}
                    style={{ width: `${bar.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Interactive category cards */}
        <div className="lg:col-span-7 space-y-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className={`reveal stagger-${(i % 3) + 1} group rounded-3xl p-6 border border-[#e5e5e0] bg-white/60 backdrop-blur-sm transition-all duration-500 hover:border-transparent ${cat.hoverBg} hover:text-white cursor-default`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300 inline-block">{cat.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold">{cat.name}</h3>
                    <p className="text-sm opacity-60 group-hover:opacity-80 transition-opacity">{cat.description}</p>
                  </div>
                </div>
                <span className="hidden sm:block text-xs font-bold uppercase tracking-wider opacity-40 group-hover:opacity-90 whitespace-nowrap pl-4">
                  {cat.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionPyramid;
