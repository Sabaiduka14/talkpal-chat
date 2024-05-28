import { createClient } from "@supabase/supabase-js";

const API_KEY = process.env.NEXT_PUBLIC_KEY!;
const API_URL = process.env.NEXT_PUBLIC_URL!;

export const supabase = createClient(API_URL, API_KEY);
