import React, { useState, useEffect } from 'react';
import { fetchAllRecords, createRecord, updateRecord, deleteRecord } from '../../lib/admin';
import { uploadImage } from '../../lib/storage';

// ============================================
// Admin Panel - Einfach & Benutzerfreundlich
// ============================================

interface AdminPanelProps {
  onLogout: () => void;
  onBack: () => void;
}

type Section =
  | 'blog_posts'
  | 'events'
  | 'funding_programs'
  | 'projects'
  | 'tips'
  | 'milestones'
  | 'facts'
  | 'charging_stations'
  | 'dashboard_metrics'
  | 'metric_details';

const sections: { key: Section; label: string; icon: string; desc: string }[] = [
  { key: 'blog_posts', label: 'Blog-Beitraege', icon: '📝', desc: 'Artikel verwalten' },
  { key: 'events', label: 'Veranstaltungen', icon: '📅', desc: 'Termine & Events' },
  { key: 'funding_programs', label: 'Foerderprogramme', icon: '💰', desc: 'Foerderungen bearbeiten' },
  { key: 'projects', label: 'Projekte', icon: '🏗️', desc: 'Laufende Projekte' },
  { key: 'tips', label: 'Klima-Tipps', icon: '💡', desc: 'Tipps fuer Buerger' },
  { key: 'milestones', label: 'Meilensteine', icon: '🗓️', desc: 'Timeline bearbeiten' },
  { key: 'facts', label: 'Fakten-Ticker', icon: '🔢', desc: 'Laufband-Texte' },
  { key: 'dashboard_metrics', label: 'Kennzahlen', icon: '📊', desc: 'Zahlen auf der Startseite' },
  { key: 'charging_stations', label: 'Ladestationen', icon: '⚡', desc: 'E-Lade-Standorte' },
  { key: 'metric_details', label: 'Detail-Artikel', icon: '📈', desc: 'Vertiefende Texte' },
];

// ============================================
// Feld-Definitionen (vereinfacht)
// ============================================

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'image' | 'textarray';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  hidden?: boolean; // fuer technische Felder
}

const tableFields: Record<Section, FieldDef[]> = {
  blog_posts: [
    { key: 'id', label: 'Kurzname (URL)', type: 'text', required: true, placeholder: 'z.B. mein-blogpost' },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'Titel des Beitrags' },
    { key: 'author', label: 'Autor', type: 'text', required: true, placeholder: 'Max Mustermann' },
    { key: 'author_role', label: 'Position/Rolle', type: 'text', required: true, placeholder: 'z.B. Klimaschutzmanager' },
    { key: 'date', label: 'Datum', type: 'text', required: true, placeholder: 'z.B. 15. Maerz 2025' },
    { key: 'tag', label: 'Kategorie', type: 'text', required: true, placeholder: 'z.B. Energie' },
    { key: 'excerpt', label: 'Kurztext (Vorschau)', type: 'textarea', required: true, placeholder: 'Kurze Beschreibung fuer die Uebersicht...' },
    { key: 'read_time', label: 'Lesezeit', type: 'text', required: true, placeholder: 'z.B. 5 Min.' },
    { key: 'color', label: 'Kartenfarbe', type: 'select', required: true, options: ['#2d6a4f', '#1a5276', '#7d3c98', '#b9770e', '#1e8449', '#2e86c1'] },
    { key: 'image', label: 'Bild', type: 'image', required: true },
    { key: 'paragraphs', label: 'Text-Absaetze', type: 'textarray', required: true },
    { key: 'pull_quote', label: 'Hervorgehobenes Zitat (optional)', type: 'textarea', placeholder: 'Ein besonders wichtiger Satz...' },
    { key: 'pull_quote_author', label: 'Zitat von (optional)', type: 'text', placeholder: 'Name der Person' },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
    { key: 'is_published', label: 'Veroeffentlicht', type: 'boolean' },
  ],
  events: [
    { key: 'id', label: 'Kurzname (URL)', type: 'text', required: true, placeholder: 'z.B. sommerfest-2025' },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'Name der Veranstaltung' },
    { key: 'description', label: 'Beschreibung', type: 'textarea', required: true, placeholder: 'Was passiert bei der Veranstaltung?' },
    { key: 'date', label: 'Startdatum', type: 'text', required: true, placeholder: 'z.B. 2025-06-15' },
    { key: 'end_date', label: 'Enddatum (optional)', type: 'text', placeholder: 'z.B. 2025-06-16' },
    { key: 'location', label: 'Ort', type: 'text', required: true, placeholder: 'z.B. Rathaus, Marktplatz' },
    { key: 'category', label: 'Kategorie', type: 'select', options: ['allgemein', 'stadtradeln', 'gartenpraemierung', 'workshop'], required: true },
    { key: 'image', label: 'Bild', type: 'image', required: true },
    { key: 'link', label: 'Link (optional)', type: 'text', placeholder: 'https://...' },
    { key: 'heins_app', label: 'In HeinsApp anzeigen', type: 'boolean' },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
    { key: 'is_published', label: 'Veroeffentlicht', type: 'boolean' },
  ],
  funding_programs: [
    { key: 'id', label: 'Kurzname (URL)', type: 'text', required: true, placeholder: 'z.B. solar-foerderung' },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'Name des Programms' },
    { key: 'description', label: 'Beschreibung', type: 'textarea', required: true, placeholder: 'Was wird gefoerdert?' },
    { key: 'amount', label: 'Foerderbetrag', type: 'text', required: true, placeholder: 'z.B. Bis zu 5.000 Euro' },
    { key: 'deadline', label: 'Bewerbungsfrist', type: 'text', required: true, placeholder: 'z.B. 31.12.2025' },
    { key: 'category', label: 'Kategorie', type: 'text', required: true, placeholder: 'z.B. Energie, Mobilitaet' },
    { key: 'tag', label: 'Kennzeichnung', type: 'text', required: true, placeholder: 'z.B. NEU, BELIEBT' },
    { key: 'color', label: 'Farbe', type: 'select', required: true, options: ['#2d6a4f', '#1a5276', '#7d3c98', '#b9770e'] },
    { key: 'bg_color', label: 'Hintergrundfarbe', type: 'select', required: true, options: ['#f0fdf4', '#eff6ff', '#faf5ff', '#fef3c7'] },
    { key: 'image', label: 'Bild', type: 'image', required: true },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
    { key: 'is_published', label: 'Veroeffentlicht', type: 'boolean' },
  ],
  projects: [
    { key: 'id', label: 'Kurzname (URL)', type: 'text', required: true, placeholder: 'z.B. radweg-ausbau' },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'Name des Projekts' },
    { key: 'description', label: 'Beschreibung', type: 'textarea', required: true, placeholder: 'Was ist das Ziel des Projekts?' },
    { key: 'status', label: 'Status', type: 'select', options: ['laufend', 'abgeschlossen', 'geplant'], required: true },
    { key: 'category', label: 'Kategorie', type: 'text', required: true, placeholder: 'z.B. Mobilitaet' },
    { key: 'image', label: 'Bild', type: 'image', required: true },
    { key: 'start_date', label: 'Startdatum', type: 'text', required: true, placeholder: 'z.B. Januar 2025' },
    { key: 'blog_id', label: 'Verlinkter Blog-Beitrag (optional)', type: 'text', placeholder: 'z.B. radweg-blogpost' },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
    { key: 'is_published', label: 'Veroeffentlicht', type: 'boolean' },
  ],
  tips: [
    { key: 'icon_key', label: 'Symbol', type: 'select', options: ['bike', 'home', 'leaf', 'sun', 'droplet'], required: true },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'z.B. Energiesparen im Haushalt' },
    { key: 'front_text', label: 'Vorschautext', type: 'textarea', required: true, placeholder: 'Kurzer Text fuer die Kartenansicht' },
    { key: 'savings', label: 'Einsparung', type: 'text', required: true, placeholder: 'z.B. Bis zu 200 Euro/Jahr' },
    { key: 'image', label: 'Bild', type: 'image', required: true },
    { key: 'details', label: 'Detail-Tipps', type: 'textarray', required: true },
    { key: 'fact', label: 'Wussten-Sie-Fakt', type: 'textarea', required: true, placeholder: 'Ein interessanter Fakt...' },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
    { key: 'is_published', label: 'Veroeffentlicht', type: 'boolean' },
  ],
  milestones: [
    { key: 'year', label: 'Jahr', type: 'text', required: true, placeholder: 'z.B. 2025' },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'Was wurde erreicht?' },
    { key: 'description', label: 'Beschreibung', type: 'textarea', required: true },
    { key: 'status', label: 'Status', type: 'select', options: ['done', 'active', 'future'], required: true },
    { key: 'color', label: 'Farbe', type: 'select', required: true, options: ['#2d6a4f', '#1a5276', '#7d3c98', '#b9770e', '#1e8449'] },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
  ],
  facts: [
    { key: 'content', label: 'Text', type: 'textarea', required: true, placeholder: 'Fakten-Text fuer das Laufband...' },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
    { key: 'is_active', label: 'Aktiv', type: 'boolean' },
  ],
  dashboard_metrics: [
    { key: 'id', label: 'Kurzname', type: 'text', required: true, placeholder: 'z.B. solar' },
    { key: 'title', label: 'Titel', type: 'text', required: true, placeholder: 'z.B. Solaranlagen' },
    { key: 'value', label: 'Aktueller Wert', type: 'number', required: true },
    { key: 'unit', label: 'Einheit (optional)', type: 'text', placeholder: 'z.B. kWh, km, %' },
    { key: 'prefix', label: 'Vorzeichen (optional)', type: 'text', placeholder: 'z.B. +, -, ~' },
    { key: 'subtitle', label: 'Untertitel', type: 'text', required: true, placeholder: 'Kurze Erklaerung' },
    { key: 'category', label: 'Kategorie', type: 'text', required: true, placeholder: 'z.B. Energie' },
    { key: 'net_change', label: 'Aenderung', type: 'text', required: true, placeholder: 'z.B. +12%' },
    { key: 'net_label', label: 'Aenderung Beschreibung', type: 'text', required: true, placeholder: 'z.B. gegenueber Vorjahr' },
    { key: 'display_order', label: 'Reihenfolge', type: 'number' },
  ],
  charging_stations: [
    { key: 'id', label: 'Kurzname', type: 'text', required: true, placeholder: 'z.B. rathaus-station' },
    { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'z.B. Ladestation Rathaus' },
    { key: 'address', label: 'Adresse', type: 'text', required: true, placeholder: 'Strasse und Hausnummer' },
    { key: 'lat', label: 'Breitengrad', type: 'number', required: true },
    { key: 'lng', label: 'Laengengrad', type: 'number', required: true },
    { key: 'type', label: 'Ladetyp', type: 'select', options: ['ac', 'dc', 'both'], required: true },
    { key: 'power', label: 'Leistung', type: 'text', required: true, placeholder: 'z.B. 22 kW' },
    { key: 'connectors', label: 'Anzahl Anschluesse', type: 'number', required: true },
    { key: 'operator', label: 'Betreiber', type: 'text', required: true },
    { key: 'status', label: 'Status', type: 'select', options: ['active', 'planned', 'maintenance'], required: true },
  ],
  metric_details: [
    { key: 'id', label: 'ID', type: 'text', hidden: true },
    { key: 'metric_id', label: 'Zugehoerige Kennzahl', type: 'text', required: true, placeholder: 'z.B. solar, radwege' },
    { key: 'headline', label: 'Ueberschrift', type: 'text', required: true, placeholder: 'Titel des Artikels' },
    { key: 'lead', label: 'Einleitung', type: 'textarea', required: true, placeholder: 'Einleitender Absatz...' },
    { key: 'paragraphs', label: 'Text-Absaetze', type: 'textarray', required: true },
    { key: 'pull_quote', label: 'Hervorgehobenes Zitat (optional)', type: 'textarea', placeholder: 'Ein besonders wichtiger Satz...' },
    { key: 'pull_quote_author', label: 'Zitat von (optional)', type: 'text', placeholder: 'Name der Person' },
  ],
};

// ============================================
// Toast-Benachrichtigung
// ============================================

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-lg text-base font-medium animate-in slide-in-from-top
      ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'}`}>
      {type === 'success' ? '✓ ' : '✕ '}{message}
    </div>
  );
}

// ============================================
// Haupt-Komponente
// ============================================

type View =
  | { page: 'home' }
  | { page: 'list'; section: Section }
  | { page: 'edit'; section: Section; record: any; isNew: boolean };

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onBack }) => {
  const [view, setView] = useState<View>({ page: 'home' });
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [recordCounts, setRecordCounts] = useState<Record<string, number>>({});

  // Lade Anzahl der Eintraege fuer Startseite
  useEffect(() => {
    if (view.page === 'home') {
      sections.forEach(async (s) => {
        try {
          const orderBy = s.key === 'charging_stations' ? 'id' : 'display_order';
          const data = await fetchAllRecords(s.key, orderBy);
          setRecordCounts((prev) => ({ ...prev, [s.key]: data.length }));
        } catch { /* ignore */ }
      });
    }
  }, [view.page]);

  // Lade Records wenn Sektion geoeffnet wird
  const openSection = async (section: Section) => {
    setLoading(true);
    setView({ page: 'list', section });
    try {
      const orderBy = section === 'charging_stations' ? 'id' : 'display_order';
      const data = await fetchAllRecords(section, orderBy);
      setRecords(data);
    } catch {
      setRecords([]);
      showToast('Laden fehlgeschlagen', 'error');
    }
    setLoading(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Neuen Eintrag erstellen
  const startCreate = (section: Section) => {
    const fields = tableFields[section];
    const newRecord: any = {};
    fields.forEach((f) => {
      if (f.type === 'boolean') newRecord[f.key] = true;
      else if (f.type === 'number') newRecord[f.key] = 0;
      else if (f.type === 'textarray') newRecord[f.key] = [''];
      else newRecord[f.key] = '';
    });
    setView({ page: 'edit', section, record: newRecord, isNew: true });
  };

  // Eintrag bearbeiten
  const startEdit = (section: Section, record: any) => {
    setView({ page: 'edit', section, record: { ...record }, isNew: false });
  };

  // Speichern
  const handleSave = async () => {
    if (view.page !== 'edit') return;
    setSaving(true);

    try {
      const cleaned = { ...view.record };
      delete cleaned.created_at;
      delete cleaned.updated_at;

      if (view.isNew) {
        await createRecord(view.section, cleaned);
        showToast('Erfolgreich erstellt!', 'success');
      } else {
        const { id, ...updates } = cleaned;
        await updateRecord(view.section, id, updates);
        showToast('Erfolgreich gespeichert!', 'success');
      }

      await openSection(view.section);
    } catch (err: any) {
      showToast('Fehler: ' + (err.message || 'Unbekannter Fehler'), 'error');
    }

    setSaving(false);
  };

  // Loeschen
  const handleDelete = async (section: Section, record: any) => {
    const name = record.title || record.content || record.name || record.id;
    if (!confirm(`Wirklich loeschen?\n\n"${name}"\n\nDies kann nicht rueckgaengig gemacht werden.`)) return;

    try {
      await deleteRecord(section, record.id);
      showToast('Geloescht!', 'success');
      await openSection(section);
    } catch (err: any) {
      showToast('Loeschen fehlgeschlagen: ' + err.message, 'error');
    }
  };

  // Feld-Wert aendern
  const updateField = (key: string, value: any) => {
    if (view.page !== 'edit') return;
    setView({ ...view, record: { ...view.record, [key]: value } });
  };

  const currentSection = view.page !== 'home'
    ? sections.find((s) => s.key === (view.page === 'list' ? view.section : (view as any).section))
    : null;

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Kopfzeile */}
      <header className="bg-white border-b border-[#e0e0da] px-6 py-4 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2d6a4f] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1a1a1a]">Verwaltung</h1>
              <p className="text-xs text-[#1a1a1a]/40">HeinsEco Klimaportal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-sm text-[#2d6a4f] hover:text-[#245a42] px-4 py-2 rounded-xl hover:bg-[#2d6a4f]/5 transition-colors font-medium"
            >
              Zur Website
            </button>
            <button
              onClick={onLogout}
              className="text-sm text-red-500 hover:text-red-700 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* ============================================ */}
        {/* STARTSEITE - Grosse Karten */}
        {/* ============================================ */}
        {view.page === 'home' && (
          <>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Was moechten Sie bearbeiten?</h2>
            <p className="text-base text-[#1a1a1a]/50 mb-8">Waehlen Sie einen Bereich aus</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.map((s) => (
                <button
                  key={s.key}
                  onClick={() => openSection(s.key)}
                  className="bg-white rounded-2xl border border-[#e0e0da] p-6 text-left hover:shadow-md hover:border-[#2d6a4f]/30 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{s.icon}</span>
                    {recordCounts[s.key] !== undefined && (
                      <span className="text-sm text-[#1a1a1a]/30 bg-[#f5f5f0] px-2.5 py-1 rounded-lg">
                        {recordCounts[s.key]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a] mt-3 group-hover:text-[#2d6a4f] transition-colors">
                    {s.label}
                  </h3>
                  <p className="text-sm text-[#1a1a1a]/50 mt-1">{s.desc}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ============================================ */}
        {/* LISTE - Eintraege einer Sektion */}
        {/* ============================================ */}
        {view.page === 'list' && currentSection && (
          <>
            {/* Zurueck-Button */}
            <button
              onClick={() => setView({ page: 'home' })}
              className="flex items-center gap-2 text-base text-[#2d6a4f] hover:text-[#245a42] mb-6 font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Zurueck
            </button>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1a1a1a]">
                  {currentSection.icon} {currentSection.label}
                </h2>
                <p className="text-sm text-[#1a1a1a]/40 mt-1">
                  {records.length} {records.length === 1 ? 'Eintrag' : 'Eintraege'}
                </p>
              </div>
              <button
                onClick={() => startCreate(view.section)}
                className="px-5 py-3 rounded-2xl bg-[#2d6a4f] text-white text-base font-medium hover:bg-[#245a42] transition-colors flex items-center gap-2 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Neu erstellen
              </button>
            </div>

            {loading ? (
              <div className="text-center py-16 text-[#1a1a1a]/30">
                <div className="animate-spin w-8 h-8 border-3 border-[#2d6a4f] border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-base">Wird geladen...</p>
              </div>
            ) : records.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-[#e0e0da]">
                <p className="text-xl text-[#1a1a1a]/30 mb-2">Noch keine Eintraege</p>
                <p className="text-base text-[#1a1a1a]/20">Klicken Sie auf "Neu erstellen"</p>
              </div>
            ) : (
              <div className="space-y-3">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="bg-white rounded-2xl border border-[#e0e0da] p-5 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-semibold text-[#1a1a1a] truncate">
                          {record.title || record.content || record.name || record.headline || record.id}
                        </p>
                        <p className="text-sm text-[#1a1a1a]/40 mt-0.5 truncate">
                          {record.date && `${record.date} · `}
                          {record.category || record.tag || record.year || ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {record.is_published === false && (
                          <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                            Entwurf
                          </span>
                        )}
                        <button
                          onClick={() => startEdit(view.section, record)}
                          className="px-4 py-2 rounded-xl bg-[#2d6a4f]/10 text-[#2d6a4f] text-sm font-medium hover:bg-[#2d6a4f]/20 transition-colors"
                        >
                          Bearbeiten
                        </button>
                        <button
                          onClick={() => handleDelete(view.section, record)}
                          className="p-2 rounded-xl text-[#1a1a1a]/20 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Loeschen"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ============================================ */}
        {/* BEARBEITEN - Formular */}
        {/* ============================================ */}
        {view.page === 'edit' && currentSection && (
          <>
            {/* Zurueck-Button */}
            <button
              onClick={() => openSection(view.section)}
              className="flex items-center gap-2 text-base text-[#2d6a4f] hover:text-[#245a42] mb-6 font-medium"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Zurueck zu {currentSection.label}
            </button>

            <div className="bg-white rounded-2xl border border-[#e0e0da] p-8 max-w-2xl">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">
                {view.isNew ? `${currentSection.icon} Neuen Eintrag erstellen` : `${currentSection.icon} Eintrag bearbeiten`}
              </h2>

              <div className="space-y-5">
                {tableFields[view.section]
                  .filter((f) => !f.hidden)
                  .map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-[#1a1a1a]/70 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>
                      {renderField(field, view.record[field.key], updateField)}
                    </div>
                  ))}
              </div>

              {/* Speichern / Abbrechen */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-[#e0e0da]">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3.5 rounded-2xl bg-[#2d6a4f] text-white text-base font-semibold hover:bg-[#245a42] transition-colors disabled:opacity-50 shadow-sm"
                >
                  {saving ? 'Wird gespeichert...' : view.isNew ? 'Erstellen' : 'Speichern'}
                </button>
                <button
                  onClick={() => openSection(view.section)}
                  className="px-6 py-3.5 rounded-2xl border border-[#e0e0da] text-base text-[#1a1a1a]/60 hover:bg-[#f5f5f0] transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

// ============================================
// Feld-Renderer (vereinfacht, groessere Elemente)
// ============================================

function renderField(
  field: FieldDef,
  value: any,
  onChange: (key: string, value: any) => void
) {
  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-[#e0e0da] bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]/20 focus:border-[#2d6a4f] placeholder:text-[#1a1a1a]/25';

  switch (field.type) {
    case 'textarea':
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={`${inputClass} min-h-[100px] resize-y`}
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          step="any"
          value={value ?? ''}
          onChange={(e) => onChange(field.key, e.target.value ? Number(e.target.value) : null)}
          className={inputClass}
          placeholder={field.placeholder}
          required={field.required}
        />
      );

    case 'boolean':
      return (
        <button
          type="button"
          onClick={() => onChange(field.key, !value)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors w-full ${
            value
              ? 'border-[#2d6a4f] bg-[#2d6a4f]/5 text-[#2d6a4f]'
              : 'border-[#e0e0da] bg-white text-[#1a1a1a]/40'
          }`}
        >
          <div className={`w-12 h-7 rounded-full transition-colors flex items-center ${
            value ? 'bg-[#2d6a4f] justify-end' : 'bg-[#d0d0ca] justify-start'
          }`}>
            <div className="w-5 h-5 bg-white rounded-full mx-1 shadow-sm" />
          </div>
          <span className="text-base font-medium">{value ? 'Ja' : 'Nein'}</span>
        </button>
      );

    case 'select':
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={`${inputClass} cursor-pointer`}
          required={field.required}
        >
          <option value="">Bitte waehlen...</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    case 'image':
      return (
        <div className="space-y-3">
          {value && (
            <img
              src={value}
              alt="Vorschau"
              className="w-full max-w-xs h-40 object-cover rounded-xl border border-[#e0e0da]"
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          )}
          <label className="flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-[#c0c0ba] bg-[#fafaf7] cursor-pointer hover:border-[#2d6a4f] hover:bg-[#2d6a4f]/5 transition-colors">
            <svg className="w-6 h-6 text-[#1a1a1a]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
            <span className="text-base text-[#1a1a1a]/50">
              {value ? 'Anderes Bild waehlen...' : 'Bild hochladen...'}
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const url = await uploadImage(file, 'content');
                  onChange(field.key, url);
                } catch (err: any) {
                  alert('Upload fehlgeschlagen: ' + err.message);
                }
              }}
            />
          </label>
          {value && (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-[#e0e0da] text-sm text-[#1a1a1a]/40"
              placeholder="Oder Bild-URL eingeben"
            />
          )}
        </div>
      );

    case 'textarray':
      const items: string[] = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#f5f5f0] text-sm text-[#1a1a1a]/30 font-medium shrink-0 mt-2">
                {i + 1}
              </div>
              <textarea
                value={item}
                onChange={(e) => {
                  const newArr = [...items];
                  newArr[i] = e.target.value;
                  onChange(field.key, newArr);
                }}
                className={`${inputClass} min-h-[80px] resize-y flex-1`}
                placeholder={`Eintrag ${i + 1}...`}
              />
              <button
                type="button"
                onClick={() => {
                  if (items.length <= 1) return;
                  onChange(field.key, items.filter((_, j) => j !== i));
                }}
                className="p-2 rounded-xl text-[#1a1a1a]/20 hover:text-red-500 hover:bg-red-50 transition-colors self-start mt-2"
                title="Entfernen"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange(field.key, [...items, ''])}
            className="flex items-center gap-2 text-base text-[#2d6a4f] hover:text-[#245a42] font-medium py-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Weiteren Eintrag hinzufuegen
          </button>
        </div>
      );

    default: // text
      return (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={inputClass}
          placeholder={field.placeholder}
          required={field.required}
        />
      );
  }
}

export default AdminPanel;
