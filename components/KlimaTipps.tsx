
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

// SVG icon components — clean, no emojis
const icons: Record<string, React.ReactNode> = {
  bike: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h3"/>
    </svg>
  ),
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  leaf: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.5-3.5 10.5-8 .5-1.17 1-2.5 1-4-.17-1.5-1.5-2-2.5 0z"/><path d="M6 15s3-2 6-2"/>
    </svg>
  ),
  sun: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  droplet: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
    </svg>
  ),
};

const tips = [
  {
    iconKey: 'bike',
    title: 'Mobilität umdenken',
    frontText: 'Nachhaltige Fortbewegung',
    savings: '~2,5t CO₂/Jahr',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80',
    stats: [
      { label: 'CO₂ Einsparung', value: '2,5t', sub: 'pro Jahr' },
      { label: 'Kosten gespart', value: '1.800€', sub: 'pro Jahr' },
      { label: 'Fitness Bonus', value: '+40%', sub: 'Aktivität' },
    ],
    details: [
      'Kurzstrecken unter 5km zu Fuß oder mit dem Rad',
      'Jeder Kilometer ohne Auto spart ca. 150g CO₂',
      'Öffentliche Verkehrsmittel statt Zweitwagen',
      'Fahrgemeinschaften für den Arbeitsweg bilden',
      'E-Bikes als Alternative für längere Strecken',
    ],
    fact: 'Der Verkehrssektor verursacht 20% der deutschen CO₂-Emissionen. Schon 3x/Woche Radfahren statt Autofahren macht einen spürbaren Unterschied.',
  },
  {
    iconKey: 'home',
    title: 'Zuhause dämmen',
    frontText: 'Energieeffizienz im Heim',
    savings: '~1,8t CO₂/Jahr',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
    stats: [
      { label: 'Energie gespart', value: '50%', sub: 'Heizkosten' },
      { label: 'Förderung', value: '45.000€', sub: 'KfW max.' },
      { label: 'Amortisation', value: '8-12', sub: 'Jahre' },
    ],
    details: [
      'Wärmedämmung senkt Energieverbrauch um bis zu 50%',
      'KfW-Förderungen bis zu 45.000€ möglich',
      'Fenster-Austausch spart sofort Heizkosten',
      'Smarte Thermostate senken den Verbrauch um 15%',
      'Kellerdecke und Dachboden zuerst dämmen',
    ],
    fact: '35% der Energie in deutschen Haushalten geht durch schlechte Dämmung verloren. Schon die Dämmung der obersten Geschossdecke spart 15% Heizenergie.',
  },
  {
    iconKey: 'leaf',
    title: 'Regional und saisonal',
    frontText: 'Bewusste Ernährung',
    savings: '~0,8t CO₂/Jahr',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80',
    stats: [
      { label: 'CO₂ Einsparung', value: '0,8t', sub: 'pro Jahr' },
      { label: 'Transportweg', value: '-90%', sub: 'regional' },
      { label: 'Bio-Anteil', value: '34%', sub: 'in Heinsberg' },
    ],
    details: [
      'Ein vegetarischer Tag/Woche spart erheblich CO₂',
      'Regionale Produkte vermeiden lange Transportwege',
      'Saisonales Obst & Gemüse statt Gewächshaus-Ware',
      'Lebensmittelverschwendung um 50% reduzieren',
      'Wochenmärkte in Heinsberg unterstützen',
    ],
    fact: 'Ein Kilogramm Rindfleisch verursacht 13kg CO₂ — das entspricht einer Autofahrt von 60km. Pflanzliche Alternativen brauchen 90% weniger Ressourcen.',
  },
  {
    iconKey: 'sun',
    title: 'Solarenergie nutzen',
    frontText: 'Eigenen Strom erzeugen',
    savings: '~0,6t CO₂/Jahr',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    stats: [
      { label: 'Eigenproduktion', value: '600', sub: 'kWh/Jahr' },
      { label: 'Einstiegspreis', value: '300€', sub: 'Balkonkraftwerk' },
      { label: 'Amortisation', value: '3-5', sub: 'Jahre' },
    ],
    details: [
      'Balkonkraftwerke ab 300€ möglich',
      'Bis zu 600kWh Strom pro Jahr selbst erzeugen',
      'Anmeldung beim Netzbetreiber vereinfacht',
      'Amortisation in 3-5 Jahren',
      'Förderung durch Stadt Heinsberg verfügbar',
    ],
    fact: 'Deutschland hatte 2024 über 4 Millionen Solaranlagen. Ein Balkonkraftwerk mit 800W erzeugt genug Strom für Kühlschrank + Waschmaschine eines Jahres.',
  },
  {
    iconKey: 'droplet',
    title: 'Wasser sparen',
    frontText: 'Grundwasser schützen',
    savings: '~15.000L/Jahr',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80',
    stats: [
      { label: 'Wasser gespart', value: '15k', sub: 'Liter/Jahr' },
      { label: 'Kosten', value: '-120€', sub: 'pro Jahr' },
      { label: 'Grundwasser', value: '+8%', sub: 'Regeneration' },
    ],
    details: [
      'Regenwasser in Tonnen oder Zisternen sammeln',
      'Durchflussregler an Wasserhähnen montieren',
      'Rasen seltener bewässern — Trockenrasen nutzen',
      'Duschen statt Baden spart 120L pro Mal',
      'Grauwasser-Systeme für Gartenbewässerung',
    ],
    fact: 'Jeder Deutsche verbraucht durchschnittlich 125 Liter Wasser pro Tag. Mit einfachen Maßnahmen lässt sich das auf unter 90 Liter senken.',
  },
];

// Parallax card with 3D tilt on hover
const ParallaxCard: React.FC<{
  tip: typeof tips[0];
  index: number;
  total: number;
  onOpen: (i: number) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}> = ({ tip, index, total, onOpen, hoveredIndex, setHoveredIndex }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1, shadow: 20, glareX: 50, glareY: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, scale: 1.05, shadow: 50, glareX, glareY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1, shadow: 20, glareX: 50, glareY: 50 });
    setHoveredIndex(null);
  }, [setHoveredIndex]);

  // Fan layout
  const mid = (total - 1) / 2;
  const offset = index - mid;
  const baseRotate = offset * 7;
  const baseX = offset * 90;
  const baseY = Math.abs(offset) * 18;
  const isHovered = hoveredIndex === index;

  const fanStyle: React.CSSProperties = {
    transform: `translateX(${baseX}px) translateY(${isHovered ? baseY - 20 : baseY}px) rotate(${baseRotate}deg)`,
    zIndex: isHovered ? 50 : total - Math.abs(offset),
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), z-index 0s',
    left: '50%',
    top: '50%',
    marginLeft: '-120px',
    marginTop: '-170px',
  };

  return (
    <div
      className="absolute cursor-pointer"
      style={fanStyle}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(index)}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="w-[240px] h-[340px] rounded-2xl bg-white border border-[#e5e5e0] overflow-hidden flex flex-col relative"
        style={{
          transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
          boxShadow: `0 ${tilt.shadow}px ${tilt.shadow * 2}px rgba(0,0,0,${0.15 + (tilt.shadow - 20) * 0.004})`,
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease-out',
          willChange: 'transform',
        }}
      >
        {/* Glare overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
            opacity: tilt.scale > 1 ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Image */}
        <div className="h-[170px] bg-[#f0f0ed] relative overflow-hidden">
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: `scale(1.1) translateX(${tilt.rotateY * -0.8}px) translateY(${tilt.rotateX * 0.8}px)`,
            }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <h3 className="text-base font-bold text-[#1a1a1a] leading-tight">{tip.title}</h3>
              <span className="text-[#1a1a1a] opacity-40 shrink-0">{icons[tip.iconKey]}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{tip.frontText}</p>
          </div>
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f0f0ed]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{tip.savings}</span>
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── MOBILE SWIPE CARD ─── */
const MobileSwipeCard: React.FC<{
  tip: typeof tips[0];
  index: number;
  onOpen: (i: number) => void;
}> = ({ tip, index, onOpen }) => (
  <div
    className="flex-shrink-0 w-[75vw] max-w-[280px] snap-center cursor-pointer"
    onClick={() => onOpen(index)}
  >
    <div className="rounded-2xl bg-white border border-[#e5e5e0] overflow-hidden h-full shadow-lg">
      <div className="h-[160px] bg-[#f0f0ed] relative overflow-hidden">
        <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
      <div className="p-5 flex flex-col justify-between" style={{ minHeight: '140px' }}>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-base font-bold text-[#1a1a1a] leading-tight">{tip.title}</h3>
            <span className="text-[#1a1a1a] opacity-40 shrink-0">{icons[tip.iconKey]}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{tip.frontText}</p>
        </div>
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f0f0ed]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{tip.savings}</span>
          <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const KlimaTipps: React.FC = () => {
  const ref = useScrollReveal();
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (index: number) => {
    setSelectedTip(index);
    setTimeout(() => setModalVisible(true), 10);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedTip(null), 400);
  };

  const goModalPrev = () => {
    if (selectedTip === null) return;
    const next = (selectedTip - 1 + tips.length) % tips.length;
    setModalVisible(false);
    setTimeout(() => {
      setSelectedTip(next);
      setTimeout(() => setModalVisible(true), 10);
    }, 250);
  };

  const goModalNext = () => {
    if (selectedTip === null) return;
    const next = (selectedTip + 1) % tips.length;
    setModalVisible(false);
    setTimeout(() => {
      setSelectedTip(next);
      setTimeout(() => setModalVisible(true), 10);
    }, 250);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTip !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedTip]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (selectedTip !== null && e.key === 'ArrowRight') goModalNext();
      if (selectedTip !== null && e.key === 'ArrowLeft') goModalPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedTip]);

  const activeTip = selectedTip !== null ? tips[selectedTip] : null;

  return (
    <section ref={ref} className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-[1400px] mx-auto space-y-8 relative">
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="reveal serif text-4xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
            Was kannst <span className="italic font-light text-white/30">du</span> tun?
          </h2>
          <p className="reveal stagger-1 text-white/40 font-medium text-lg max-w-lg mx-auto">
            Wähle ein Thema und entdecke, wie du im Alltag einen Unterschied machen kannst.
          </p>
        </div>

        {/* Desktop: Fan deck */}
        <div className="reveal stagger-2 hidden lg:flex items-center justify-center">
          <div className="relative flex items-center justify-center" style={{ height: '420px', width: '100%' }}>
            {tips.map((tip, i) => (
              <ParallaxCard
                key={i}
                tip={tip}
                index={i}
                total={tips.length}
                onOpen={openModal}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Swipe carousel */}
        <div className="reveal stagger-2 lg:hidden -mx-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            {tips.map((tip, i) => (
              <MobileSwipeCard key={i} tip={tip} index={i} onOpen={openModal} />
            ))}
            {/* Spacer for last card padding */}
            <div className="flex-shrink-0 w-4"></div>
          </div>
          <p className="text-center text-white/20 text-xs font-medium mt-3 tracking-wider">← swipe →</p>
        </div>
      </div>

      {/* MODAL — rendered via portal to document.body */}
      {selectedTip !== null && activeTip && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999]" style={{ isolation: 'isolate' }}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
              modalVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeModal}
          ></div>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goModalPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goModalNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Centered modal wrapper */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4 md:p-8">
            <div
              className={`relative z-10 pointer-events-auto bg-[#fcfcf9] rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl transition-all duration-500 ${
                modalVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#e5e5e0] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-8 z-10 text-xs font-bold text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {selectedTip + 1} / {tips.length}
            </div>

            {/* Hero image */}
            <div className="relative h-[240px] md:h-[300px] overflow-hidden rounded-t-3xl">
              <img src={activeTip.image} alt={activeTip.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcf9] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <div className="flex items-end gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="serif text-3xl md:text-4xl font-bold text-[#1a1a1a]">{activeTip.title}</h2>
                      <span className="text-[#1a1a1a] opacity-30 shrink-0">{icons[activeTip.iconKey]}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{activeTip.frontText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 px-8 -mt-2">
              {activeTip.stats.map((stat, j) => (
                <div key={j} className="bg-white rounded-2xl p-4 border border-[#e5e5e0] text-center shadow-sm">
                  <p className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">{stat.label}</p>
                  <p className="text-[10px] text-slate-300">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="px-8 py-8 space-y-8">
              <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white/80 text-sm leading-relaxed relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18h6M10 22h4M12 2v1M4.22 4.22l.71.71M1 12h1M21 12h1M18.36 4.22l-.71.71M17 12a5 5 0 00-10 0c0 2.76 2.5 5 2.5 7h5c0-2 2.5-4.24 2.5-7z"/>
                  </svg>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Wusstest du?</p>
                <p>{activeTip.fact}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Konkrete Maßnahmen</h3>
                <div className="space-y-3">
                  {activeTip.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#e5e5e0] hover:border-[#1a1a1a]/20 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {j + 1}
                      </div>
                      <p className="text-sm text-[#1a1a1a] leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-5 rounded-2xl bg-white border border-[#e5e5e0]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Dein Einsparungspotenzial</p>
                  <p className="text-3xl font-bold text-[#1a1a1a] tracking-tight mt-1">{activeTip.savings}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center">
                  {icons[activeTip.iconKey]}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default KlimaTipps;
