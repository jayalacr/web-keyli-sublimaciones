import { createClient } from "@supabase/supabase-js";

// Cliente con service role — bypassa RLS. Sólo importar desde código server-only
// (Server Actions / route handlers del admin), nunca desde un Client Component.
export function supabaseAdmin() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}
