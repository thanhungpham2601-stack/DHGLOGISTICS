import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Supabase connection failed:', error.message);
    process.exit(1);
  }
  console.log('Supabase connected OK. URL:', supabaseUrl);
  console.log('Session:', data.session);
}

main();
