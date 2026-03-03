
import React, { useState, useEffect } from 'react';

interface NavProps {
  onNavigate?: (tab: string) => void;
  activeTab?: string;
}

const Navigation: React.FC<NavProps> = ({ onNavigate, activeTab = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLink = (tab: string, label: string) => (
    <button
      onClick={() => onNavigate?.(tab)}
      className={`text-[14px] font-medium transition-colors duration-200 ${
        activeTab === tab
          ? 'text-[#1a1a1a]'
          : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 pointer-events-none">
      <div className={`inline-flex items-center gap-8 px-7 py-3.5 rounded-full pointer-events-auto transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/[0.04] border border-[#e5e5e0]/60'
          : 'bg-white/70 backdrop-blur-md border border-[#e5e5e0]/40'
      }`}>

        {/* Logo */}
        <button onClick={() => onNavigate?.('home')} className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-[#1a1a1a] tracking-tight">HeinsEco</span>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-[#e5e5e0]" />

        {/* Nav links */}
        {navLink('blog', 'Aktuelles')}
        {navLink('foerderung', 'Förderung')}
        {navLink('map', 'Ladesäulen')}
        <a
          href="https://heinsapp.de"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-medium text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-200"
        >
          HeinsApp
        </a>


      </div>
    </nav>
  );
};

export default Navigation;
