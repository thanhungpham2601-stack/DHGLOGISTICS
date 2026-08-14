import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role_id: string | null;
  role_name: string | null;
  permissions: string[];
}

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  hasPermission: (code: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadProfile(userId: string, email: string | null): Promise<Profile> {
  const { data: profileRow } = await supabase
    .from('profiles')
    .select('id, email, full_name, role_id, roles(name)')
    .eq('id', userId)
    .maybeSingle();

  if (!profileRow) {
    return { id: userId, email, full_name: null, role_id: null, role_name: null, permissions: [] };
  }

  let permissions: string[] = [];
  if (profileRow.role_id) {
    const { data: permRows } = await supabase
      .from('role_permissions')
      .select('permissions(code)')
      .eq('role_id', profileRow.role_id);
    permissions = (permRows ?? [])
      .map((row: any) => row.permissions?.code as string | undefined)
      .filter((code): code is string => Boolean(code));
  }

  return {
    id: profileRow.id,
    email: profileRow.email,
    full_name: profileRow.full_name,
    role_id: profileRow.role_id,
    role_name: (profileRow as any).roles?.name ?? null,
    permissions,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) {
        loadProfile(data.session.user.id, data.session.user.email ?? null)
          .then((p) => mounted && setProfile(p))
          .finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        setLoading(true);
        loadProfile(newSession.user.id, newSession.user.email ?? null)
          .then((p) => mounted && setProfile(p))
          .finally(() => mounted && setLoading(false));
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const hasPermission = (code: string) => profile?.permissions.includes(code) ?? false;

  return (
    <AuthContext.Provider value={{ session, profile, loading, signIn, signOut, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
