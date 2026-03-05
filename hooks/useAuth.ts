import { useState, useEffect, useCallback } from 'react';
import { getSession, onAuthStateChange, checkIsAdmin, signIn, signOut } from '../lib/auth';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial session check
    getSession().then(async ({ user }) => {
      setUser(user);
      if (user) {
        const admin = await checkIsAdmin(user.id);
        setIsAdmin(admin);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = onAuthStateChange(async (user) => {
      setUser(user);
      if (user) {
        const admin = await checkIsAdmin(user.id);
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = await signIn(email, password);
    setUser(data.user);
    setIsAdmin(true);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
    setIsAdmin(false);
  }, []);

  return { user, isAdmin, loading, login, logout };
}
