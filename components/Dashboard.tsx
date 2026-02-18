
import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal';

// Lyric-style progressive word highlight
const LyricText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const sentence = 'Unser Klima verändert sich direkt vor unserer Haustür. Die gleichen Straßen, die gleichen Felder, die gleichen Viertel, die wir seit Jahrzehnten kennen, werden von Extremwetter bedroht wie nie zuvor.';
  const highlight = 'Heinsberg handelt jetzt.';
  const allWords = sentence.split(' ');
  const highlightWords = highlight.split(' ');
  const totalWords = allWords.length + highlightWords.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Start when section enters viewport, complete when it's about to leave
      const start = windowH * 0.85;
      const end = -rect.height * 0.3;
      const rawProgress = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getWordStyle = (index: number, total: number): React.CSSProperties => {
    // Each word activates at a staggered point in the progress
    const wordStart = index / total;
    const wordEnd = (index + 1.5) / total;
    const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)));

    // Smooth cubic easing
    const eased = wordProgress < 0.5
      ? 4 * wordProgress * wordProgress * wordProgress
      : 1 - Math.pow(-2 * wordProgress + 2, 3) / 2;

    return {
      color: `rgba(26, 26, 26, ${0.12 + eased * 0.88})`,
      transition: 'color 0.15s ease-out',
    };
  };

  const getHighlightStyle = (index: number, total: number): React.CSSProperties => {
    const globalIndex = allWords.length + index;
    const wordStart = globalIndex / total;
    const wordEnd = (globalIndex + 1.5) / total;
    const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)));

    const eased = wordProgress < 0.5
      ? 4 * wordProgress * wordProgress * wordProgress
      : 1 - Math.pow(-2 * wordProgress + 2, 3) / 2;

    return {
      color: `rgba(79, 111, 89, ${0.08 + eased * 0.92})`,
      transition: 'color 0.15s ease-out',
    };
  };

  return (
    <div ref={containerRef}>
      <h2 className="serif text-4xl md:text-6xl leading-[1.1] text-[#1a1a1a]">
        {allWords.map((word, i) => (
          <span key={i} style={getWordStyle(i, totalWords)}>
            {word}{' '}
          </span>
        ))}
        {highlightWords.map((word, i) => (
          <span
            key={`h-${i}`}
            className="italic font-medium"
            style={getHighlightStyle(i, totalWords)}
          >
            {word}{i < highlightWords.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>
    </div>
  );
};

const AnimatedMetricCard: React.FC<{
  title: string;
  value: number;
  unit?: string;
  prefix?: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
  onClick?: () => void;
}> = ({ title, value, unit, prefix, description, children, delay = 0, onClick }) => {
  const counterRef = useAnimatedCounter(value, 2000);

  return (
    <div className={`reveal stagger-${delay + 1} flex flex-col space-y-6 group`}>
      <div
        onClick={onClick}
        className="bg-white rounded-[50px] p-10 flex items-center justify-center min-h-[380px] shadow-sm relative overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-xl card-glow cursor-pointer"
      >
        {/* Background visual */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-70">
          {children}
        </div>

        {/* Animated counter — perfectly centered */}
        <div className="relative z-10 flex items-baseline justify-center">
          {prefix && <span className="text-5xl font-bold tracking-tighter text-[#1a1a1a]">{prefix}</span>}
          <span ref={counterRef} className="text-7xl font-bold tracking-tighter text-[#1a1a1a] metric-value">0</span>
          {unit && <span className="text-xl font-medium text-slate-300 ml-1">{unit}</span>}
        </div>

        {/* Hover hint */}
        <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          <p className="text-xs text-slate-400 font-medium px-6">{description}</p>
        </div>

        {/* Click arrow indicator */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <div className="w-full text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors duration-300">
          {title}
        </span>
      </div>
    </div>
  );
};

const Dashboard: React.FC<{ onMetricClick?: (metricId: string) => void }> = ({ onMetricClick }) => {
  const sectionRef = useScrollReveal();

  return (
    <div className="space-y-0" ref={sectionRef}>
      {/* Intro text with hills background */}
      <section className="relative overflow-hidden">
        {/* Hills background image */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-[70%]">
            <img
              src="/hills-bg.png"
              alt=""
              className="w-full h-full object-cover object-top"
              style={{ opacity: 0.18 }}
            />
            {/* Fade edges for harmony */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcf9] via-transparent to-[#fcfcf9]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcfcf9] via-transparent to-[#fcfcf9]"></div>
          </div>
        </div>

        <div className="text-center max-w-4xl mx-auto px-6 py-32 relative z-10">
          <LyricText />
        </div>
      </section>

      {/* Metrics Dashboard */}
      <section className="bg-[#0a0a0a] py-40 px-6 overflow-hidden relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="max-w-[1400px] mx-auto space-y-24 relative">
          <div className="text-center space-y-6">
            <h2 className="reveal text-white text-5xl md:text-8xl font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9]">
              Wie entwickelt sich <br /> unsere Umweltbilanz?
            </h2>
            <p className="reveal stagger-1 text-white/40 text-lg font-medium max-w-xl mx-auto">
              Echtzeit-Kennzahlen für den Kreis Heinsberg. Daten aus offiziellen Quellen, aktualisiert täglich.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {/* Solaranlagen */}
            <AnimatedMetricCard
              title="Solaranlagen"
              value={1247}
              description="Installierte PV-Anlagen im Kreis Heinsberg"
              delay={0}
              onClick={() => onMetricClick?.('solar')}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  <circle cx="100" cy="100" r="40" stroke="#999" strokeWidth="2"/>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 100 + 50 * Math.cos(rad);
                    const y1 = 100 + 50 * Math.sin(rad);
                    const x2 = 100 + 80 * Math.cos(rad);
                    const y2 = 100 + 80 * Math.sin(rad);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth="2" strokeLinecap="round"/>;
                  })}
                </svg>
              </div>
            </AnimatedMetricCard>

            {/* Radwege */}
            <AnimatedMetricCard
              title="Radwege"
              value={127}
              unit="km"
              description="Ausgebautes Radwegenetz im Kreisgebiet"
              delay={1}
              onClick={() => onMetricClick?.('radwege')}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
                  <path d="M20,140 C60,140 50,60 100,80 C150,100 140,40 180,50 C220,60 200,130 200,140" stroke="#999" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <path d="M10,160 C70,150 80,100 130,110 C180,120 170,70 210,80" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="6 4"/>
                </svg>
              </div>
            </AnimatedMetricCard>

            {/* Einwohner */}
            <AnimatedMetricCard
              title="Einwohner aktiv"
              value={38}
              unit="%"
              description="Bürger beteiligen sich an Klimaschutzprojekten"
              delay={2}
              onClick={() => onMetricClick?.('einwohner')}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
                  {[30, 50, 40, 65, 80, 55, 90, 70, 85].map((h, i) => (
                    <rect key={i} x={12 + i * 20} y={160 - h * 1.5} width="12" height={h * 1.5} rx="6" fill="#999"/>
                  ))}
                </svg>
              </div>
            </AnimatedMetricCard>

            {/* Emissionen gesenkt */}
            <AnimatedMetricCard
              title="Emissionen gesenkt"
              value={18.6}
              unit="kt"
              prefix="-"
              description="Kilotonnen CO₂ weniger als Referenzjahr 2019"
              delay={3}
              onClick={() => onMetricClick?.('emissionen')}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
                  <defs>
                    <linearGradient id="emGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#999" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#999" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M10,30 C40,35 60,50 90,65 C120,80 150,110 180,120 L210,135 L210,160 L10,160 Z" fill="url(#emGrad)"/>
                  <path d="M10,30 C40,35 60,50 90,65 C120,80 150,110 180,120 L210,135" stroke="#999" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  <circle cx="10" cy="30" r="4" fill="#999"/>
                  <circle cx="210" cy="135" r="4" fill="#ccc"/>
                </svg>
              </div>
            </AnimatedMetricCard>
          </div>
        </div>
      </section>

      {/* Quote section */}
      <div className="text-center py-40 bg-[#fcfcf9] text-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-gradient-to-br from-slate-100/40 to-transparent rounded-full blur-3xl"></div>
        </div>
        <p className="reveal serif text-4xl md:text-6xl max-w-4xl mx-auto px-6 italic font-light opacity-30 tracking-tight relative z-10">
          Wir beenden die Ära der fossilen Abhängigkeit. <br /> Gemeinsam schützen wir unsere Zukunft.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
