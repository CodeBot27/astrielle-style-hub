import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  signUp: (email: string, password: string, name: string, surname: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  fetchProfile: (userId: string) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      profile: null,
      isLoading: true,

      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setProfile: (profile) => set({ profile }),
      setIsLoading: (isLoading) => set({ isLoading }),

      signUp: async (email, password, name, surname) => {
        try {
          const redirectUrl = `${window.location.origin}/`;
          
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: redirectUrl,
              data: {
                name,
                surname,
              },
            },
          });

          if (error) throw error;

          if (data.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                name,
                surname,
              } as any);

            if (profileError) {
              console.error('Profile creation error:', profileError);
            }
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },

      signIn: async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          set({ user: data.user, session: data.session });
          
          if (data.user) {
            await get().fetchProfile(data.user.id);
          }

          return { error: null };
        } catch (error) {
          return { error: error as Error };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, profile: null });
      },

      fetchProfile: async (userId) => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();

        if (!error && data) {
          set({ profile: data as Profile });
        }
      },

      initialize: async () => {
        set({ isLoading: true });
        
        supabase.auth.onAuthStateChange(
          (event, session) => {
            set({ session, user: session?.user ?? null });
            
            if (session?.user) {
              setTimeout(() => {
                get().fetchProfile(session.user.id);
              }, 0);
            } else {
              set({ profile: null });
            }
          }
        );

        const { data: { session } } = await supabase.auth.getSession();
        set({ session, user: session?.user ?? null });
        
        if (session?.user) {
          await get().fetchProfile(session.user.id);
        }
        
        set({ isLoading: false });
      },
    }),
    {
      name: 'astrielle-auth',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session,
        profile: state.profile 
      }),
    }
  )
);
