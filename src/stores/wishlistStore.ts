import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/database';

interface WishlistItem {
  id: number;
  user_id: string;
  product_id: number;
  created_at: string;
  product?: Product;
}

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  fetchWishlist: (userId: string) => Promise<void>;
  addToWishlist: (userId: string, productId: number) => Promise<{ error: Error | null }>;
  removeFromWishlist: (userId: string, productId: number) => Promise<{ error: Error | null }>;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async (userId) => {
    set({ isLoading: true });
    
    const { data, error } = await (supabase
      .from('wishlist' as any)
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId) as any);

    if (!error && data) {
      set({ items: data as WishlistItem[] });
    }
    
    set({ isLoading: false });
  },

  addToWishlist: async (userId, productId) => {
    try {
      const { error } = await (supabase
        .from('wishlist' as any)
        .insert({
          user_id: userId,
          product_id: productId,
        }) as any);

      if (error) throw error;

      await get().fetchWishlist(userId);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  removeFromWishlist: async (userId, productId) => {
    try {
      const { error } = await (supabase
        .from('wishlist' as any)
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId) as any);

      if (error) throw error;

      set({ items: get().items.filter(item => item.product_id !== productId) });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  isInWishlist: (productId) => {
    return get().items.some(item => item.product_id === productId);
  },

  clearWishlist: () => {
    set({ items: [] });
  },
}));
