import { createClient } from "@supabase/supabase-js";

// Revisa si las variables de entorno se leen correctamente
const superbase_service = import.meta.env.VITE_SUPERBASE_PROJECT_URL;
const supabase_Key = import.meta.env.VITE_SUPERBASE_API_KEY;

if (!superbase_service || !supabase_Key) {
  console.error("Error: Las variables de entorno de Supabase no están configuradas correctamente.");
}

const supabase = createClient(superbase_service, supabase_Key);

export default supabase;
