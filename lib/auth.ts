import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  // Check if user is an admin
  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', data.user.id)
    .single();

  if (!admin) {
    await supabase.auth.signOut();
    throw new Error('Kein Admin-Zugang');
  }

  return data;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession(): Promise<{
  user: User | null;
  session: Session | null;
}> {
  const { data } = await supabase.auth.getSession();
  return {
    user: data.session?.user || null,
    session: data.session,
  };
}

export async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', userId)
    .single();
  return !!data;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
}
