import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ipglcejtzonamkpsbwgz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwZ2xjZWp0em9uYW1rcHNid2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NjM4ODIsImV4cCI6MjA0OTAzOTg4Mn0.qcLyGr2mWtKw1oWv0l7HPdmXOCuCtu-jyRSPt_nLnuk";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);