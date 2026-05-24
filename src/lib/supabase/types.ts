// Tipos generados desde Supabase — correr:
// npx supabase gen types typescript --project-id TU_PROJECT_ID > src/lib/supabase/types.ts
// Por ahora vacío hasta conectar Supabase

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
