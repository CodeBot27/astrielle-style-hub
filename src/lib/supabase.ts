import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = 'https://hvxwbxceuxezsxyaaouh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2eHdieGNldXhlenN4eWFhb3VoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4Njc5NDcsImV4cCI6MjA4MDQ0Mzk0N30.GpaHG-qvRqDTnMLpmcAtSZ6WmSvbp8ay3CjecWAytQc';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
