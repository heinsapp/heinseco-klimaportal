
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Leaflet is loaded globally via CDN script tag
declare const L: any;

// ─── Types ──────────────────────────────────────────────
interface ChargingStation {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  type: 'ac' | 'dc' | 'both';
  power: string;
  connectors: number;
  operator: string;
  status: 'active' | 'planned' | 'maintenance';
  amenities: string[];
}

type FilterType = 'all' | 'ac' | 'dc' | 'fast' | 'planned';

// ─── Data ───────────────────────────────────────────────
const stations: ChargingStation[] = [
  {
    id: '1',
    name: 'Rathaus Heinsberg',
    address: 'Apfelstr. 60, 52525 Heinsberg',
    coordinates: [51.0637, 6.0990],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'Stadtwerke Heinsberg',
    status: 'active',
    amenities: ['Parkplatz', '24h'],
  },
  {
    id: '2',
    name: 'Marktplatz Heinsberg',
    address: 'Hochstr., 52525 Heinsberg',
    coordinates: [51.0620, 6.0965],
    type: 'both',
    power: '50 kW',
    connectors: 4,
    operator: 'EnBW',
    status: 'active',
    amenities: ['Parkplatz', 'Einkaufsmöglichkeiten'],
  },
  {
    id: '3',
    name: 'Bahnhof Erkelenz',
    address: 'Bahnhofstr. 12, 41812 Erkelenz',
    coordinates: [51.0796, 6.3164],
    type: 'dc',
    power: '150 kW',
    connectors: 3,
    operator: 'IONITY',
    status: 'active',
    amenities: ['Parkplatz', '24h', 'Bahnhofsnähe'],
  },
  {
    id: '4',
    name: 'Geilenkirchen Zentrum',
    address: 'Konrad-Adenauer-Str. 5, 52511 Geilenkirchen',
    coordinates: [50.9668, 6.1187],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'Stadtwerke Geilenkirchen',
    status: 'active',
    amenities: ['Parkplatz'],
  },
  {
    id: '5',
    name: 'Rathaus Hückelhoven',
    address: 'Rathausplatz 1, 41836 Hückelhoven',
    coordinates: [51.0540, 6.2262],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'NEW AG',
    status: 'active',
    amenities: ['Parkplatz', 'Überdacht'],
  },
  {
    id: '6',
    name: 'Wassenberg Altstadt',
    address: 'Roermonder Str. 25, 41849 Wassenberg',
    coordinates: [51.0998, 6.1536],
    type: 'ac',
    power: '11 kW',
    connectors: 2,
    operator: 'Stadtwerke Heinsberg',
    status: 'active',
    amenities: ['Parkplatz'],
  },
  {
    id: '7',
    name: 'Wegberg Stadtzentrum',
    address: 'Rathausplatz, 41844 Wegberg',
    coordinates: [51.1418, 6.2808],
    type: 'both',
    power: '50 kW',
    connectors: 4,
    operator: 'EnBW',
    status: 'active',
    amenities: ['Parkplatz', '24h', 'Einkaufsmöglichkeiten'],
  },
  {
    id: '8',
    name: 'Übach-Palenberg',
    address: 'Carlstr. 50, 52531 Übach-Palenberg',
    coordinates: [50.9178, 6.1204],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'NEW AG',
    status: 'active',
    amenities: ['Parkplatz'],
  },
  {
    id: '9',
    name: 'Selfkant Gewerbegebiet',
    address: 'Am Rathaus 5, 52538 Selfkant',
    coordinates: [51.0067, 5.8720],
    type: 'dc',
    power: '100 kW',
    connectors: 2,
    operator: 'Allego',
    status: 'active',
    amenities: ['Parkplatz', '24h'],
  },
  {
    id: '10',
    name: 'Gangelt Innenstadt',
    address: 'Sittarder Str. 20, 52538 Gangelt',
    coordinates: [50.9936, 5.9936],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'Stadtwerke Heinsberg',
    status: 'active',
    amenities: ['Parkplatz'],
  },
  {
    id: '11',
    name: 'Waldfeucht',
    address: 'Hauptstr. 8, 52525 Waldfeucht',
    coordinates: [51.0729, 5.9745],
    type: 'ac',
    power: '11 kW',
    connectors: 1,
    operator: 'Stadtwerke Heinsberg',
    status: 'active',
    amenities: [],
  },
  {
    id: '12',
    name: 'RS1 Knotenpunkt Oberbruch',
    address: 'Am Radschnellweg, 52525 Heinsberg-Oberbruch',
    coordinates: [51.0460, 6.1250],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'Kreis Heinsberg',
    status: 'active',
    amenities: ['E-Bike Ladestation', 'Radweg'],
  },
  {
    id: '13',
    name: 'RS1 Knotenpunkt Randerath',
    address: 'Am Radschnellweg, 41836 Randerath',
    coordinates: [51.0580, 6.2400],
    type: 'ac',
    power: '22 kW',
    connectors: 2,
    operator: 'Kreis Heinsberg',
    status: 'planned',
    amenities: ['E-Bike Ladestation', 'Radweg'],
  },
  {
    id: '14',
    name: 'Krankenhaus Heinsberg',
    address: 'Schafhausener Str. 40, 52525 Heinsberg',
    coordinates: [51.0685, 6.1050],
    type: 'dc',
    power: '150 kW',
    connectors: 4,
    operator: 'IONITY',
    status: 'planned',
    amenities: ['Parkplatz', '24h', 'Überdacht'],
  },
  {
    id: '15',
    name: 'Gewerbepark Erkelenz-Süd',
    address: 'An der A46, 41812 Erkelenz',
    coordinates: [51.0650, 6.3250],
    type: 'dc',
    power: '300 kW',
    connectors: 6,
    operator: 'Tesla Supercharger',
    status: 'planned',
    amenities: ['Parkplatz', '24h', 'Autobahnnähe'],
  },
];

// ─── Filter pills config ────────────────────────────────
const filterIcons: Record<FilterType, React.ReactNode> = {
  all: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  ac: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" /></svg>,
  dc: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  fast: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 3l4 4-4 4" /></svg>,
  planned: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Alle' },
  { key: 'ac', label: 'AC' },
  { key: 'dc', label: 'DC' },
  { key: 'fast', label: 'Schnelllader' },
  { key: 'planned', label: 'Geplant' },
];

// ─── Helper: marker color by type/status ────────────────
const getMarkerColor = (station: ChargingStation): string => {
  if (station.status === 'planned') return '#a3b18a';
  if (station.type === 'dc' || station.type === 'both') return '#52b788';
  return '#2d6a4f';
};

const getTypeBadge = (type: ChargingStation['type']): string => {
  switch (type) {
    case 'dc': return 'DC';
    case 'both': return 'AC/DC';
    default: return 'AC';
  }
};

const getStatusLabel = (status: ChargingStation['status']): string => {
  switch (status) {
    case 'active': return 'Aktiv';
    case 'planned': return 'Geplant';
    case 'maintenance': return 'Wartung';
  }
};

// ─── Stats Bar ──────────────────────────────────────────
const StatsBar: React.FC<{ stations: ChargingStation[] }> = ({ stations }) => {
  const active = stations.filter((s) => s.status === 'active').length;
  const planned = stations.filter((s) => s.status === 'planned').length;
  const totalConnectors = stations.filter((s) => s.status === 'active').reduce((a, s) => a + s.connectors, 0);
  const fastChargers = stations.filter((s) => (s.type === 'dc' || s.type === 'both') && s.status === 'active').length;

  const stats = [
    { value: active, label: 'Aktive Stationen', icon: '⚡' },
    { value: planned, label: 'In Planung', icon: '📍' },
    { value: totalConnectors, label: 'Ladepunkte', icon: '🔌' },
    { value: fastChargers, label: 'Schnelllader', icon: '🚀' },
  ];

  return (
    <div className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className={`text-center reveal stagger-${i + 1}`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="serif text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Station Card ───────────────────────────────────────
const StationCard: React.FC<{
  station: ChargingStation;
  isSelected: boolean;
  onClick: () => void;
}> = ({ station, isSelected, onClick }) => {
  const color = getMarkerColor(station);

  return (
    <button
      onClick={onClick}
      className={`text-left w-full info-card rounded-2xl p-5 transition-all duration-300 ${
        isSelected ? 'ring-2 ring-[#52b788] shadow-lg scale-[1.02]' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full relative"
            style={{ backgroundColor: color }}
          >
            {station.status === 'active' && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: color, opacity: 0.3 }}
              />
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            {getStatusLabel(station.status)}
          </span>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          {getTypeBadge(station.type)}
        </span>
      </div>

      <h3 className="font-semibold text-[#1a1a1a] text-sm mb-1">{station.name}</h3>
      <p className="text-xs text-slate-500 mb-3">{station.address}</p>

      <div className="flex items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {station.power}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {station.connectors} Ladepunkte
        </span>
      </div>

      {station.amenities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {station.amenities.map((a) => (
            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f0ed] text-slate-500 font-medium">
              {a}
            </span>
          ))}
        </div>
      )}
    </button>
  );
};

// ─── Main Component ─────────────────────────────────────
const ChargingMap: React.FC = () => {
  const ref = useScrollReveal();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const filteredStations = useMemo(() => {
    switch (filter) {
      case 'ac':
        return stations.filter((s) => s.type === 'ac' && s.status === 'active');
      case 'dc':
        return stations.filter((s) => (s.type === 'dc' || s.type === 'both') && s.status === 'active');
      case 'fast':
        return stations.filter((s) => {
          const pw = parseInt(s.power);
          return pw >= 50 && s.status === 'active';
        });
      case 'planned':
        return stations.filter((s) => s.status === 'planned');
      default:
        return stations;
    }
  }, [filter]);

  // ─── Initialize Leaflet map ─────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;
    if (typeof L === 'undefined') return;

    const map = L.map(mapContainerRef.current, {
      center: [51.06, 6.10],
      zoom: 11,
      scrollWheelZoom: true,
      zoomControl: false,
    });

    // Add zoom control to bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;
    setMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // ─── Update markers when filter changes ─────────────
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || typeof L === 'undefined') return;

    // Remove existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    {
      // Add new markers
      filteredStations.forEach((station, index) => {
        const color = getMarkerColor(station);
        const isPlanned = station.status === 'planned';
        const isFast = station.type === 'dc' || station.type === 'both';

        const icon = L.divIcon({
          className: 'charging-marker',
          html: `
            <div class="marker-pin" style="
              --marker-color: ${color};
              animation-delay: ${index * 60}ms;
            ">
              <div class="marker-pin-inner ${isPlanned ? 'planned' : ''}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              ${!isPlanned ? '<div class="marker-pulse"></div>' : ''}
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -42],
        });

        const marker = L.marker(station.coordinates, { icon }).addTo(mapInstanceRef.current!);

        // Custom popup content
        const popupContent = `
          <div class="station-popup">
            <div class="station-popup-header">
              <span class="station-popup-badge" style="background:${color}">${getTypeBadge(station.type)}</span>
              <span class="station-popup-status ${station.status}">${getStatusLabel(station.status)}</span>
            </div>
            <h3 class="station-popup-name">${station.name}</h3>
            <p class="station-popup-address">${station.address}</p>
            <div class="station-popup-stats">
              <div class="station-popup-stat">
                <strong>${station.power}</strong>
                <span>Leistung</span>
              </div>
              <div class="station-popup-stat">
                <strong>${station.connectors}</strong>
                <span>Ladepunkte</span>
              </div>
            </div>
            <div class="station-popup-operator">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              ${station.operator}
            </div>
            ${station.amenities.length > 0 ? `
              <div class="station-popup-amenities">
                ${station.amenities.map((a) => `<span class="station-popup-amenity">${a}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 280,
          className: 'custom-leaflet-popup',
        });

        marker.on('click', () => {
          setSelectedStation(station.id);
        });

        markersRef.current.push(marker);
      });
    }
  }, [filteredStations, mapReady]);

  // ─── Fly to station when selected from list ─────────
  const handleStationClick = (stationId: string) => {
    setSelectedStation(stationId);
    const station = stations.find((s) => s.id === stationId);
    if (station && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(station.coordinates, 14, { duration: 0.8 });
      // Open the popup for this marker
      const markerIndex = filteredStations.findIndex((s) => s.id === stationId);
      if (markerIndex !== -1 && markersRef.current[markerIndex]) {
        markersRef.current[markerIndex].openPopup();
      }
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-[#fcfcf9]">
      {/* ─── Header ─────────────────────────────────── */}
      <section className="pt-6 pb-12 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="reveal">
            <h1 className="serif text-4xl md:text-6xl lg:text-7xl font-light text-[#1a1a1a] mb-6 leading-[1.1]">
              Ladesäulen im<br />
              <span className="italic text-[#2d6a4f]">Kreis Heinsberg</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Entdecke alle Ladestationen für Elektrofahrzeuge in deiner Nähe.
              Vom Schnelllader bis zur E-Bike Station.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Filters ────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center gap-2 reveal stagger-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-[#2d6a4f] text-white shadow-lg shadow-[#2d6a4f]/20'
                    : 'bg-white text-slate-600 border border-[#e5e5e0] hover:border-[#52b788] hover:text-[#2d6a4f]'
                }`}
              >
                <span className="mr-1.5 inline-flex">{filterIcons[f.key]}</span>
                {f.label}
                <span className="ml-2 text-xs opacity-70">
                  {f.key === 'all'
                    ? stations.length
                    : f.key === 'ac'
                    ? stations.filter((s) => s.type === 'ac' && s.status === 'active').length
                    : f.key === 'dc'
                    ? stations.filter((s) => (s.type === 'dc' || s.type === 'both') && s.status === 'active').length
                    : f.key === 'fast'
                    ? stations.filter((s) => parseInt(s.power) >= 50 && s.status === 'active').length
                    : stations.filter((s) => s.status === 'planned').length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Map ────────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-[1200px] mx-auto reveal stagger-2">
          <div className="rounded-2xl overflow-hidden border border-[#e5e5e0] shadow-xl shadow-black/5 relative">
            <div
              ref={mapContainerRef}
              className="w-full h-[400px] md:h-[550px] lg:h-[600px] charging-map-container"
            />
            {!mapReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f8f8f5]">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-[#2d6a4f] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-slate-400 font-medium">Karte wird geladen...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ChargingMap;
