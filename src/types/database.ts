export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          surname: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          surname?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          surname?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          price: number;
          image: string | null;
          category: string | null;
          is_featured: boolean;
          created_at: string;
          type: string | null;
          style: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          price: number;
          image?: string | null;
          category?: string | null;
          is_featured?: boolean;
          created_at?: string;
          type?: string | null;
          style?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          price?: number;
          image?: string | null;
          category?: string | null;
          is_featured?: boolean;
          created_at?: string;
          type?: string | null;
          style?: string | null;
        };
        Relationships: [];
      };
      cart: {
        Row: {
          id: number;
          user_id: string;
          product_id: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          product_id: number;
          quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          product_id?: number;
          quantity?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: number;
          user_id: string;
          total: number;
          status: string;
          shipping_address: string;
          city: string;
          postal_code: string;
          country: string;
          payment_method: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          total: number;
          status?: string;
          shipping_address: string;
          city: string;
          postal_code: string;
          country: string;
          payment_method?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          total?: number;
          status?: string;
          shipping_address?: string;
          city?: string;
          postal_code?: string;
          country?: string;
          payment_method?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: number;
          order_id: number;
          product_id: number;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: number;
          order_id: number;
          product_id: number;
          quantity: number;
          price: number;
        };
        Update: {
          id?: number;
          order_id?: number;
          product_id?: number;
          quantity?: number;
          price?: number;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type CartItem = Database['public']['Tables']['cart']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];

export interface CartItemWithProduct extends CartItem {
  products: Product;
}

export interface OrderWithItems extends Order {
  order_items: (OrderItem & { products: Product })[];
}
