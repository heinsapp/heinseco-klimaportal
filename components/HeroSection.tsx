
import React, { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const words = [
    { text: 'Klimaschutz', delay: 0, br: true },
    { text: 'beginnt', delay: 0.15, spacingAfter: true },
    { text: 'hier.', delay: 0.3, italic: true, muted: true, br: true },
    { text: 'Nicht', delay: 0.45 },
    { text: 'irgendwann.', delay: 0.6 },
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Falling leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: '8%',  size: 22, color: '#a3b18a', duration: 14, delay: 0,   drift: '60px',  spin: '340deg', sway: 3.5 },
          { left: '22%', size: 16, color: '#52b788', duration: 18, delay: 3,   drift: '-50px', spin: '-300deg', sway: 4 },
          { left: '45%', size: 20, color: '#b7c9a0', duration: 15, delay: 6,   drift: '70px',  spin: '380deg', sway: 3 },
          { left: '65%', size: 14, color: '#2d6a4f', duration: 20, delay: 1.5, drift: '-40px', spin: '-260deg', sway: 4.5 },
          { left: '80%', size: 18, color: '#a3b18a', duration: 16, delay: 8,   drift: '55px',  spin: '320deg', sway: 3.2 },
          { left: '35%', size: 12, color: '#52b788', duration: 22, delay: 5,   drift: '-65px', spin: '-400deg', sway: 5 },
          { left: '55%', size: 24, color: '#d4dcc5', duration: 13, delay: 10,  drift: '45px',  spin: '290deg', sway: 2.8 },
          { left: '90%', size: 15, color: '#2d6a4f', duration: 19, delay: 7,   drift: '-55px', spin: '-350deg', sway: 3.8 },
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
            <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" fill={leaf.color} opacity="0.45">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 8.5-3.5 10.5-8 .5-1.17 1-2.5 1-4-.17-1.5-1.5-2-2.5 0z" />
            </svg>
          </div>
        ))}
      </div>

      <div className="max-w-[1100px] z-10 space-y-10" style={{ perspective: '1000px' }}>
        {/* Animated heading */}
        <h1 className="serif text-6xl md:text-8xl lg:text-[130px] leading-[0.88] text-[#1a1a1a] tracking-tight">
          {words.map((w, i) => (
            <span
              key={i}
              className={`hero-word ${w.italic ? 'italic font-light' : ''} ${w.muted ? 'text-slate-400' : ''}`}
              style={{
                animationDelay: `${w.delay + 0.3}s`,
                opacity: loaded ? undefined : 0,
                marginLeft: i > 0 && words[i - 1].spacingAfter ? '0.25em' : undefined,
              }}
            >
              {w.text}{!w.br && ' '}
              {w.br && <br className="hidden md:inline" />}
            </span>
          ))}
        </h1>

        {/* Subtitle with fade-in */}
        <p
          className="max-w-xl mx-auto text-slate-500 font-medium leading-relaxed text-lg transition-all duration-1000"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1.2s',
          }}
        >
          Nachhaltigkeit ist kein Versprechen für morgen, sondern unsere Verantwortung für heute.
          Wir gestalten die Zukunft der Energie und Umwelt für kommende Generationen.
        </p>


      </div>
    </section>
  );
};

export default HeroSection;
