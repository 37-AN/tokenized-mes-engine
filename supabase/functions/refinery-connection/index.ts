import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Refinery connection function called');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Simulate refinery data
    const refineryData = {
      device_id: 'dev-1',
      data_type: "temperature",
      value: Math.random() * 100,
      quality_score: 0.95,
      metadata: { source: "ai-refinery" }
    }

    // Insert the data into refined_industrial_data table
    const { data, error } = await supabase
      .from('refined_industrial_data')
      .insert([refineryData])
      .select();

    if (error) {
      console.error('Error inserting refinery data:', error);
      throw error;
    }

    console.log('Successfully inserted refinery data:', data);

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in refinery-connection function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})