
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
