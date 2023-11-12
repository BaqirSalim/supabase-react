import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hyvxqzckamqjbbptltwr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dnhxemNrYW1xamJicHRsdHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3MzQ0ODMsImV4cCI6MjAxNTMxMDQ4M30._vKdRrtseukumynyWcRH5ElXCqKQYz7V1JzfmdONa94"
);
