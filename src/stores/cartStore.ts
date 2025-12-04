import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { CartItemWithProduct, Product } from '@/types/database';

interface CartState {
  items: CartItemWithProduct[];
  isLoading: boolean;
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string, product: Product, quantity?: number) => Promise<{ error: Error | null }>;
  updateQuantity: (userId: string, productId: number, quantity: number) => Promise<void>;
  removeFromCart: (userId: string, productId: number) => Promise<void>;
  clearCart: (userId: string) => Promise<void>;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,

  fetchCart: async (userId) => {
    set({ isLoading: true });
    
    const { data, error } = await supabase
      .from('cart')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId);

    if (!error && data) {
      set({ items: data as unknown as CartItemWithProduct[] });
    }
    
    set({ isLoading: false });
  },

  addToCart: async (userId, product, quantity = 1) => {
    try {
      const existingItem = get().items.find(item => item.product_id === product.id);

      if (existingItem) {
        await get().updateQuantity(userId, product.id, existingItem.quantity + quantity);
        return { error: null };
      }

      const { error } = await supabase
        .from('cart')
        .insert({
          user_id: userId,
          product_id: product.id,
          quantity,
        } as any);

      if (error) throw error;

      await get().fetchCart(userId);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  updateQuantity: async (userId, productId, quantity) => {
    if (quantity < 1) {
      await get().removeFromCart(userId, productId);
      return;
    }

    const { error } = await supabase
      .from('cart')
      .update({ quantity } as any)
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (!error) {
      set(state => ({
        items: state.items.map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        ),
      }));
    }
  },

  removeFromCart: async (userId, productId) => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (!error) {
      set(state => ({
        items: state.items.filter(item => item.product_id !== productId),
      }));
    }
  },

  clearCart: async (userId) => {
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('user_id', userId);

    if (!error) {
      set({ items: [] });
    }
  },

  getTotal: () => {
    return get().items.reduce((total, item) => {
      return total + (item.products.price * item.quantity);
    }, 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));
