import { useState, useEffect, useCallback } from 'react';
import * as dataService from '../lib/data';
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
} from '../lib/types';

// ============================================
// Generic hook for fetching data from Supabase
// ============================================

interface UseDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useSupabaseData<T>(
  fetcher: () => Promise<T[]>,
  deps: unknown[] = []
): UseDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Fehler beim Laden');
        setLoading(false);
      });
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// ============================================
// Specific hooks for each content type
// ============================================

export const useBlogPosts = () =>
  useSupabaseData<BlogPost>(dataService.getBlogPosts);

export const useEvents = () =>
  useSupabaseData<KlimaEvent>(dataService.getEvents);

export const useFundingPrograms = () =>
  useSupabaseData<FundingProgram>(dataService.getFundingPrograms);

export const useProjects = () =>
  useSupabaseData<Project>(dataService.getProjects);

export const useChargingStations = () =>
  useSupabaseData<ChargingStation>(dataService.getChargingStations);

export const useDashboardMetrics = () =>
  useSupabaseData<DashboardMetric>(dataService.getDashboardMetrics);

export const useTips = () =>
  useSupabaseData<KlimaTip>(dataService.getTips);

export const useMilestones = () =>
  useSupabaseData<Milestone>(dataService.getMilestones);

export const useFacts = () =>
  useSupabaseData<Fact>(dataService.getFacts);

// ============================================
// Single-record hook for metric details
// ============================================

interface UseMetricDetailResult {
  data: MetricDetail | null;
  loading: boolean;
  error: string | null;
}

export function useMetricDetail(metricId: string): UseMetricDetailResult {
  const [data, setData] = useState<MetricDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!metricId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    dataService
      .getMetricDetail(metricId)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Fehler beim Laden');
        setLoading(false);
      });
  }, [metricId]);

  return { data, loading, error };
}
