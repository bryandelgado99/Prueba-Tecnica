import { createClient } from "@supabase/supabase-js";

// Client and services API keys
const superbase_service =  import.meta.env.VITE_SUPERBASE_PROJECT_URL
const supabase_Key = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(superbase_service, supabase_Key);

export default supabase