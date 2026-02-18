
import React from 'react';

const facts = [
  '🌡️ Die globale Durchschnittstemperatur ist um 1,1°C gestiegen',
  '🌊 Der Meeresspiegel steigt um 3,6mm pro Jahr',
  '🏭 Deutschland emittiert 746 Mio. Tonnen CO₂ jährlich',
  '🌳 Wälder absorbieren ca. 30% des menschlichen CO₂',
  '⚡ Erneuerbare decken 48,5% des deutschen Stroms',
  '♻️ Nur 17% des weltweiten Plastikmülls werden recycelt',
  '🔥 2023 war das heißeste Jahr seit Beginn der Aufzeichnungen',
  '💧 Wasserknappheit betrifft 2 Milliarden Menschen weltweit',
];

const FactsTicker: React.FC = () => {
  return (
    <div className="py-6 bg-[#1a1a1a] overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10"></div>
      <div className="ticker-track">
        {[...facts, ...facts].map((fact, i) => (
          <span key={i} className="text-sm text-white/60 font-medium whitespace-nowrap px-8 hover:text-white/90 transition-colors cursor-default">
            {fact}
            <span className="text-white/20 ml-8">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default FactsTicker;
