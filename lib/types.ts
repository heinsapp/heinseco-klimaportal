// ============================================
// Klimaportal Database Types
// ============================================

export interface BlogPost {
  id: string;
  date: string;
  author: string;
  author_role: string;
  tag: string;
  title: string;
  excerpt: string;
  read_time: string;
  color: string;
  image: string;
  paragraphs: string[];
  pull_quote: string | null;
  pull_quote_author: string | null;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface KlimaEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date: string | null;
  location: string;
  category: string;
  image: string;
  link: string | null;
  heins_app: boolean;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FundingProgram {
  id: string;
  title: string;
  description: string;
  amount: string;
  deadline: string;
  category: string;
  tag: string;
  color: string;
  bg_color: string;
  image: string;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'laufend' | 'abgeschlossen' | 'geplant';
  category: string;
  image: string;
  start_date: string;
  blog_id: string | null;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'ac' | 'dc' | 'both';
  power: string;
  connectors: number;
  operator: string;
  status: 'active' | 'planned' | 'maintenance';
  amenities: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DashboardMetric {
  id: string;
  title: string;
  category: string;
  value: number;
  unit: string | null;
  prefix: string | null;
  net_change: string;
  net_label: string;
  subtitle: string;
  chart_data: number[];
  chart_years: string[];
  pie_data: Array<{ label: string; value: number }>;
  highlights: Array<{ value: string; label: string }>;
  sources: string[];
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface MetricDetail {
  id: string;
  metric_id: string;
  headline: string;
  lead: string;
  paragraphs: string[];
  pull_quote: string | null;
  pull_quote_author: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface KlimaTip {
  id: number;
  icon_key: string;
  title: string;
  front_text: string;
  savings: string;
  image: string;
  stats: Array<{ label: string; value: string; sub: string }>;
  details: string[];
  fact: string;
  display_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  status: 'done' | 'active' | 'future';
  color: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Fact {
  id: number;
  content: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}
