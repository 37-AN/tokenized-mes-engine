import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RefinedData {
  device_id: string;
  data_type: string;
  value: number;
  quality_score?: number;
  metadata?: Record<string, any>;
}

interface ProcessedMetric {
  device_id: string;
  metric_type: string;
  value: number;
  unit?: string;
  metadata?: Record<string, any>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Parse the request body
    const { refinedData } = await req.json() as { refinedData: RefinedData[] }
    console.log('Received refined data:', refinedData)

    if (!Array.isArray(refinedData)) {
      throw new Error('Invalid data format: expected an array of refined data')
    }

    // Store refined data
    const { error: refinedError } = await supabase
      .from('refined_industrial_data')
      .insert(refinedData)

    if (refinedError) {
      console.error('Error storing refined data:', refinedError)
      throw refinedError
    }

    // Process metrics from refined data
    const metrics: ProcessedMetric[] = refinedData.map(data => ({
      device_id: data.device_id,
      metric_type: `processed_${data.data_type}`,
      value: data.value,
      metadata: {
        ...data.metadata,
        quality_score: data.quality_score,
        processed_at: new Date().toISOString()
      }
    }))

    // Store processed metrics
    const { error: metricsError } = await supabase
      .from('mes_metrics')
      .insert(metrics)

    if (metricsError) {
      console.error('Error storing metrics:', metricsError)
      throw metricsError
    }

    // Generate AI insights based on the refined data
    const insights = refinedData
      .filter(data => data.quality_score && data.quality_score < 0.8)
      .map(data => ({
        device_id: data.device_id,
        insight_type: 'quality_alert',
        message: `Low quality score detected for ${data.data_type}: ${data.quality_score}`,
        confidence: 0.9,
        severity: 'warning',
        metadata: {
          data_type: data.data_type,
          value: data.value,
          quality_score: data.quality_score
        }
      }))

    if (insights.length > 0) {
      const { error: insightsError } = await supabase
        .from('ai_insights')
        .insert(insights)

      if (insightsError) {
        console.error('Error storing insights:', insightsError)
        throw insightsError
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data processed successfully',
        processed: {
          refinedData: refinedData.length,
          metrics: metrics.length,
          insights: insights.length
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error processing refined data:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})