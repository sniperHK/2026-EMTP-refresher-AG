import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

export type QuizBackendKind = 'supabase' | 'dev-api' | 'none'

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    : null

export function getQuizBackendKind(): QuizBackendKind {
  if (supabase) return 'supabase'
  if (import.meta.env.DEV) return 'dev-api'
  return 'none'
}

export function isSupabaseConfigured() {
  return Boolean(supabase)
}
