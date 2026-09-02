import { createClient } from "@supabase/supabase-js";

// Cliente de sólo lectura para Server/Client Components — usa la anon key, respeta RLS (sólo filas activas).
export function supabasePublic() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
