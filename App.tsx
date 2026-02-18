
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FactsTicker from './components/FactsTicker';
import Dashboard from './components/Dashboard';
import KlimaTipps from './components/KlimaTipps';
import Timeline from './components/Timeline';
import MetricDetail from './components/MetricDetail';
import Blog from './components/Blog';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'blog' | 'metric'>('home');
  const [activeMetric, setActiveMetric] = useState<string>('');

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as 'home' | 'blog' | 'metric');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMetricClick = (metricId: string) => {
    setActiveMetric(metricId);
    setActiveTab('metric');
    // Instant scroll to top, then smooth after render
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleMetricBack = () => {
    setActiveTab('home');
    setActiveMetric('');
    // Scroll back to dashboard section after a short delay
    setTimeout(() => {
      const dashboard = document.querySelector('.bg-\\[\\#0a0a0a\\]');
      if (dashboard) {
        dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col pt-20">
      <Navigation onNavigate={handleNavigate} />

      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="page-enter">
            <HeroSection />
            <FactsTicker />
            <Dashboard onMetricClick={handleMetricClick} />
            <KlimaTipps />
            <Timeline />
          </div>
        )}

        {activeTab === 'metric' && (
          <div className="page-enter">
            <MetricDetail metricId={activeMetric} onBack={handleMetricBack} />
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="page-enter">
            <Blog />
          </div>
        )}
      </main>

      {/* Enhanced footer */}
      <footer className="py-24 px-6 md:px-12 border-t border-[#e5e5e0] bg-white relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f8f8f5] to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-16">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center space-x-0 border border-[#e5e5e0] rounded-lg overflow-hidden px-3 py-1 w-fit">
                <span className="serif text-xl font-medium pr-3 border-r border-[#e5e5e0]">Heins</span>
                <span className="serif text-xl italic font-light pl-3 text-slate-500">Eco</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Gestaltung einer nachhaltigen Zukunft durch radikale Transparenz und technologische Innovation.
              </p>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'GitHub'].map((s) => (
                  <a key={s} href="#" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#2d6a4f] transition-colors link-underline px-2 py-1">
                    {s}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#1a1a1a]">Plattformen</h4>
                <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">CO₂ Rechner</a></li>
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Transparenz-Hub</a></li>
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Umweltpolitik</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#1a1a1a]">Institutionen</h4>
                <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Klimaministerium</a></li>
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Energiewende</a></li>
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Förderungen</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-[#1a1a1a]">Rechtliches</h4>
                <ul className="space-y-2.5 text-sm text-slate-500 font-medium">
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Datenschutz</a></li>
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Impressum</a></li>
                  <li><a href="#" className="link-underline hover:text-[#2d6a4f] transition-colors">Barrierefreiheit</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="section-divider mt-16 mb-8"></div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
            <p>© 2025 Nationales Klimazentrum</p>
            <p>Offizielles Kommunikationsorgan</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
