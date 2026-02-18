
import React, { useState, useEffect } from 'react';

const Navigation: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'nav-scrolled py-2'
        : 'bg-[#fcfcf9]/60 backdrop-blur-sm py-0'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => onNavigate?.('home')} className="flex items-center group">
            <div className="flex items-center space-x-0 border border-[#e5e5e0] rounded-lg overflow-hidden px-3 py-1 bg-white/50 group-hover:border-[#52b788] transition-colors duration-300">
              <span className="serif text-xl font-medium pr-3 border-r border-[#e5e5e0] group-hover:border-[#52b788] transition-colors duration-300">Heins</span>
              <span className="serif text-xl italic font-light pl-3 text-slate-500 group-hover:text-[#2d6a4f] transition-colors duration-300">Eco</span>
            </div>
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate?.('blog')}
              className="hidden md:block px-5 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-[#2d6a4f] hover:bg-[#dcfce7]/50 transition-all duration-300"
            >
              Blog
            </button>
            <button
              onClick={() => onNavigate?.('home')}
              className="hidden md:block px-6 py-2.5 rounded-full border border-[#1a1a1a] text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
            >
              Maßnahmen entdecken
            </button>
            <button className="p-2.5 rounded-full bg-[#1a1a1a] text-white hover:bg-[#2d6a4f] hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
