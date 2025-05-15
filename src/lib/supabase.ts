
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ujedhnbwboblvafmaabo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqZWRobmJ3Ym9ibHZhZm1hYWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNDYwNDUsImV4cCI6MjA2MjYyMjA0NX0.SoF_oR5t1NPdmfqtp3lFRKlitPSOSwZ3vAdYaVHGAHg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
