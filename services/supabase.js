import {createClient} from '@supabase/supabase-js';

const SUPA_URL = 'https://vysboynyxfhqcrctfrek.supabase.co';
const SUPA_ANONKEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5c2JveW55eGZocWNyY3RmcmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDgyNjgsImV4cCI6MjA1ODAyNDI2OH0.lBbeGfye2BgvwUAc4OZavu8ss4iVV6qWatmR-sRFB-w';

export const supabase = createClient(SUPA_URL,SUPA_ANONKEY);