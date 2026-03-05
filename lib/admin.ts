import { supabase } from './supabase';
import { invalidateCache } from './data';

// ============================================
// Generic CRUD operations for admin panel
// ============================================

export async function createRecord<T extends Record<string, unknown>>(
  table: string,
  record: T
): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .insert(record)
    .select()
    .single();

  if (error) throw error;
  invalidateCache(table);
  return data as T;
}

export async function updateRecord<T extends Record<string, unknown>>(
  table: string,
  id: string | number,
  updates: Partial<T>
): Promise<T> {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  invalidateCache(table);
  return data as T;
}

export async function deleteRecord(
  table: string,
  id: string | number
): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  invalidateCache(table);
}

export async function fetchAllRecords<T>(
  table: string,
  orderBy: string = 'display_order'
): Promise<T[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order(orderBy, { ascending: true });

  if (error) throw error;
  return (data as T[]) || [];
}

export async function reorderRecords(
  table: string,
  orderedIds: (string | number)[]
): Promise<void> {
  const updates = orderedIds.map((id, i) =>
    supabase.from(table).update({ display_order: i }).eq('id', id)
  );
  await Promise.all(updates);
  invalidateCache(table);
}
