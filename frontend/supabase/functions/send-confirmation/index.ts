import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { name, email, phone, address, notifyOnLaunch } = await req.json();

    // Store subscriber data
    const { data, error: insertError } = await supabase
      .from('subscribers')
      .insert([
        { name, email, phone, address, notify_on_launch: notifyOnLaunch }
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    // Send email using Edge Runtime
    const emailContent = notifyOnLaunch
      ? `Hello ${name},\n\nThank you for signing up! We'll notify you when we launch.\n\nBest regards,\nYourBrand Team`
      : `Hello ${name},\n\nThank you for your interest in our platform!\n\nBest regards,\nYourBrand Team`;

    const emailData = {
      to: email,
      subject: notifyOnLaunch ? 'Thanks for subscribing to launch updates!' : 'Thank you for your interest',
      text: emailContent,
    };

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    // Update email sent status
    await supabase
      .from('subscribers')
      .update({ email_sent: true })
      .eq('id', data.id);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});