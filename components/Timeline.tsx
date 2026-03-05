
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMilestones } from '../hooks/useKlimaData';

const fallbackMilestones = [
  { year: '2020', title: 'Klimanotstand erklärt', description: 'Heinsberg verpflichtet sich zu konkreten Maßnahmen.', status: 'done', color: '#2d6a4f' },
  { year: '2021', title: 'Solaroffensive', description: '1.000 neue PV-Anlagen auf privaten & öffentlichen Dächern.', status: 'done', color: '#40916c' },
  { year: '2022', title: 'Radwegenetz', description: '45km neue Radwege verbinden alle Ortsteile.', status: 'done', color: '#52b788' },
  { year: '2023', title: 'Grünes Rathaus', description: 'Kommunale Gebäude 100% erneuerbar.', status: 'done', color: '#74c69d' },
  { year: '2025', title: '50% Erneuerbare', description: 'Windkraft, Geothermie & Eigenversorgung.', status: 'active', color: '#2d6a4f' },
  { year: '2030', title: 'Klimaneutral', description: 'Vollständige Klimaneutralität für Heinsberg.', status: 'future', color: '#b7e4c7' },
];

const Timeline: React.FC = () => {
  const { data: milestonesData } = useMilestones();
  const milestones = milestonesData.length > 0 ? milestonesData : fallbackMilestones;
  const revealRef = useScrollReveal();

  return (
    <section
      ref={revealRef}
      className="py-32 px-6 bg-[#fcfcf9] relative overflow-hidden"
    >
      {/* Gradient transition from dark section above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52b788] mb-4 block">
            Roadmap
          </span>
          <h2 className="serif text-4xl md:text-6xl font-bold tracking-tight text-[#1a1a1a]">
            Unser Weg zu <br /><span className="gradient-text">Klimaneutral 2030</span>
          </h2>
        </div>

        {/* Road + Milestones — Desktop */}
        <div className="hidden md:block relative reveal stagger-1" style={{ height: 820 }}>

          {/* SVG Road — centered winding */}
          <svg
            className="absolute left-1/2 top-0 h-full pointer-events-none"
            style={{ transform: 'translateX(-50%)', width: 220 }}
            viewBox="0 0 220 820"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Road shadow */}
            <path
              d="M 110 0 C 30 80, 30 120, 110 160 S 190 240, 110 320 S 30 400, 110 480 S 190 560, 110 640 S 50 720, 110 820"
              stroke="#e8e8e4"
              strokeWidth="52"
              strokeLinecap="round"
            />
            {/* Road body */}
            <path
              d="M 110 0 C 30 80, 30 120, 110 160 S 190 240, 110 320 S 30 400, 110 480 S 190 560, 110 640 S 50 720, 110 820"
              stroke="#1a1a1a"
              strokeWidth="44"
              strokeLinecap="round"
            />
            {/* Dashed center line */}
            <path
              d="M 110 0 C 30 80, 30 120, 110 160 S 190 240, 110 320 S 30 400, 110 480 S 190 560, 110 640 S 50 720, 110 820"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="8 10"
              opacity="0.4"
            />
            {/* Green progress overlay */}
            <path
              d="M 110 0 C 30 80, 30 120, 110 160 S 190 240, 110 320 S 30 400, 110 480 S 190 560, 110 640"
              stroke="#2d6a4f"
              strokeWidth="44"
              strokeLinecap="round"
              opacity="0.25"
            />
          </svg>

          {/* Milestone items — absolutely positioned left & right of center road */}
          {milestones.map((m, i) => {
            const isDone = m.status === 'done';
            const isActive = m.status === 'active';
            const isFuture = m.status === 'future';

            // Y positions for each milestone (matching road curve peaks)
            const yPositions = [30, 155, 310, 465, 625, 775];
            const y = yPositions[i];

            // Alternate: even index = left side, odd = right side
            const isLeft = i % 2 === 0;

            return (
              <div
                key={m.year}
                className="absolute flex items-center gap-5"
                style={{
                  top: y,
                  ...(isLeft
                    ? { right: '54%' }
                    : { left: '54%' }),
                  flexDirection: isLeft ? 'row-reverse' : 'row',
                }}
              >
                {/* Pin marker */}
                <div
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center border-[3px] border-white shadow-lg relative"
                  style={{
                    backgroundColor: isFuture ? '#e5e5e0' : m.color,
                    zIndex: 10,
                  }}
                >
                  {isDone && (
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isActive && (
                    <>
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: m.color }} />
                    </>
                  )}
                  {isFuture && (
                    <div className="w-2 h-2 rounded-full bg-white/60" />
                  )}
                </div>

                {/* Content card */}
                <div
                  className={`${isLeft ? 'text-right' : 'text-left'} max-w-[220px]`}
                >
                  <span
                    className="serif text-2xl font-bold block leading-none"
                    style={{ color: isFuture ? '#d0d0c8' : m.color }}
                  >
                    {m.year}
                  </span>
                  <h3 className={`text-[15px] font-bold mt-1 leading-tight ${isFuture ? 'text-[#c8c8c0]' : 'text-[#1a1a1a]'}`}>
                    {m.title}
                  </h3>
                  <p className={`text-[12px] mt-0.5 leading-relaxed ${isFuture ? 'text-[#d4d4cc]' : 'text-[#1a1a1a]/40'}`}>
                    {m.description}
                  </p>
                  {isActive && (
                    <span className="inline-block mt-2 text-[8px] font-bold uppercase tracking-[0.15em] bg-[#2d6a4f] text-white px-2.5 py-1 rounded-full">
                      Aktuell
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Mobile — simple vertical ─── */}
        <div className="md:hidden space-y-6 reveal stagger-1">
          {milestones.map((m, i) => {
            const isDone = m.status === 'done';
            const isActive = m.status === 'active';
            const isFuture = m.status === 'future';
            return (
              <div key={m.year} className="flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                    style={{ backgroundColor: isFuture ? '#e5e5e0' : m.color }}
                  >
                    {isDone && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isActive && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    {isFuture && <div className="w-2 h-2 rounded-full bg-[#b0b0a8]" />}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className={`w-0.5 h-8 ${isDone || isActive ? 'bg-[#2d6a4f]/30' : 'bg-[#e5e5e0]'}`} />
                  )}
                </div>
                <div className="pt-0.5">
                  <span className="serif text-xl font-bold block" style={{ color: isFuture ? '#c0c0b8' : m.color }}>
                    {m.year}
                  </span>
                  <h3 className={`text-sm font-bold ${isFuture ? 'text-[#c0c0b8]' : 'text-[#1a1a1a]'}`}>{m.title}</h3>
                  <p className={`text-xs mt-0.5 ${isFuture ? 'text-[#d4d4d0]' : 'text-[#1a1a1a]/40'}`}>{m.description}</p>
                  {isActive && (
                    <span className="inline-block mt-1.5 text-[8px] font-bold uppercase tracking-wider bg-[#2d6a4f] text-white px-2 py-0.5 rounded-full">
                      Aktuell
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
