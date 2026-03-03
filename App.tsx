
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import FactsTicker from './components/FactsTicker';
import Dashboard from './components/Dashboard';
import KlimaTipps from './components/KlimaTipps';
import Timeline from './components/Timeline';
import MetricDetail from './components/MetricDetail';
import Blog from './components/Blog';
import ChargingMap from './components/ChargingMap';
import Foerderung from './components/Foerderung';
import Events from './components/Events';
import Projekte from './components/Projekte';

type Tab = 'home' | 'blog' | 'metric' | 'map' | 'foerderung' | 'events' | 'projekte';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeMetric, setActiveMetric] = useState<string>('');
  const [blogResetKey, setBlogResetKey] = useState(0);

  const handleNavigate = (tab: string) => {
    if (activeTab === tab) {
      if (tab === 'blog') {
        setBlogResetKey(k => k + 1);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActiveTab(tab as Tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMetricClick = (metricId: string) => {
    setActiveMetric(metricId);
    setActiveTab('metric');
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleMetricBack = () => {
    setActiveTab('home');
    setActiveMetric('');
    setTimeout(() => {
      const dashboard = document.querySelector('.bg-\\[\\#0a0a0a\\]');
      if (dashboard) {
        dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col pt-20">
      <Navigation onNavigate={handleNavigate} activeTab={activeTab} />

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
            <Blog key={blogResetKey} />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="page-enter">
            <ChargingMap />
          </div>
        )}

        {activeTab === 'foerderung' && (
          <div className="page-enter">
            <Foerderung onNavigate={handleNavigate} />
          </div>
        )}

        {activeTab === 'events' && (
          <div className="page-enter">
            <Events onNavigate={handleNavigate} />
          </div>
        )}

        {activeTab === 'projekte' && (
          <div className="page-enter">
            <Projekte onNavigate={handleNavigate} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white relative overflow-hidden">
        {/* Main footer content */}
        <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Brand column */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-[15px] font-semibold tracking-tight">HeinsEco</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                Das Klimaportal für den Kreis Heinsberg. Transparente Daten, konkrete Maßnahmen, gemeinsames Handeln.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="mailto:klimaschutz@heinsberg.de" className="text-xs text-white/30 hover:text-[#52b788] transition-colors">
                  klimaschutz@heinsberg.de
                </a>
              </div>
            </div>

            {/* Nav columns */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Entdecken</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><button onClick={() => handleNavigate('blog')} className="hover:text-white transition-colors">Aktuelles</button></li>
                <li><button onClick={() => handleNavigate('projekte')} className="hover:text-white transition-colors">Projekte</button></li>
                <li><button onClick={() => handleNavigate('events')} className="hover:text-white transition-colors">Events</button></li>
              </ul>
            </div>
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Mitmachen</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><button onClick={() => handleNavigate('foerderung')} className="hover:text-white transition-colors">Förderung</button></li>
                <li><button onClick={() => handleNavigate('map')} className="hover:text-white transition-colors">Ladesäulen</button></li>
                <li><a href="https://heinsapp.de" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">HeinsApp</a></li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">Rechtliches</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Datenschutzerklärung</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Barrierefreiheit</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-white/20">&copy; 2025 Kreis Heinsberg · Klimaschutzmanagement</p>
            <p className="text-[11px] text-white/20">Ein Projekt des Kreises Heinsberg</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
