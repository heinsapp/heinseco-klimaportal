import { supabase } from './supabase';
import type {
  BlogPost,
  KlimaEvent,
  FundingProgram,
  Project,
  ChargingStation,
  DashboardMetric,
  MetricDetail,
  KlimaTip,
  Milestone,
  Fact,
} from './types';

// ============================================
// Simple in-memory cache with 5-minute TTL
// ============================================

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  return null;
}

function setCache(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() });
}

export function invalidateCache(key?: string) {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
}

// ============================================
// Generic fetch with error handling
// ============================================

async function fetchTable<T>(
  table: string,
  orderBy: string = 'display_order',
  filter?: { column: string; value: unknown }
): Promise<T[]> {
  const cached = getCached<T[]>(table);
  if (cached) return cached;

  try {
    let query = supabase.from(table).select('*').order(orderBy, { ascending: true });

    if (filter) {
      query = query.eq(filter.column, filter.value);
    }

    const { data, error } = await query;

    if (error) throw error;
    const result = (data as T[]) || [];
    setCache(table, result);
    return result;
  } catch (err) {
    console.warn(`Failed to fetch ${table}:`, err);
    return [];
  }
}

// ============================================
// Public data fetchers
// ============================================

export const getBlogPosts = () =>
  fetchTable<BlogPost>('blog_posts', 'display_order');

export const getEvents = () =>
  fetchTable<KlimaEvent>('events', 'display_order');

export const getFundingPrograms = () =>
  fetchTable<FundingProgram>('funding_programs', 'display_order');

export const getProjects = () =>
  fetchTable<Project>('projects', 'display_order');

export const getChargingStations = () =>
  fetchTable<ChargingStation>('charging_stations', 'id');

export const getDashboardMetrics = () =>
  fetchTable<DashboardMetric>('dashboard_metrics', 'display_order');

export const getTips = () =>
  fetchTable<KlimaTip>('tips', 'display_order');

export const getMilestones = () =>
  fetchTable<Milestone>('milestones', 'display_order');

export const getFacts = () =>
  fetchTable<Fact>('facts', 'display_order');

// Single-record fetch for metric detail pages
export async function getMetricDetail(metricId: string): Promise<MetricDetail | null> {
  const cacheKey = `metric_detail_${metricId}`;
  const cached = getCached<MetricDetail>(cacheKey);
  if (cached) return cached;

  try {
    const { data, error } = await supabase
      .from('metric_details')
      .select('*')
      .eq('metric_id', metricId)
      .single();

    if (error) throw error;
    if (data) setCache(cacheKey, data);
    return data as MetricDetail;
  } catch (err) {
    console.warn(`Failed to fetch metric detail ${metricId}:`, err);
    return null;
  }
}
