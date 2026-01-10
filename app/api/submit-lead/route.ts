import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, websiteUrl, gdprConsent } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !websiteUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // GDPR consent is required
    if (!gdprConsent) {
      return NextResponse.json(
        { error: 'GDPR consent is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if lead already exists
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      // Clear any previous responses for this lead to allow retaking
      await supabase
        .from('responses')
        .delete()
        .eq('lead_id', existing.id);

      // Reset the lead's completion status and update GDPR consent
      await supabase
        .from('leads')
        .update({
          completed_at: null,
          total_score: null,
          score_level: null,
          gmb_score: null,
          keywords_score: null,
          website_score: null,
          gdpr_consent: gdprConsent,
          gdpr_consent_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      return NextResponse.json({ leadId: existing.id, existing: true });
    }

    // Create new lead
    const { data, error } = await supabase
      .from('leads')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        website_url: websiteUrl,
        gdpr_consent: gdprConsent,
        gdpr_consent_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to create lead');
    }

    return NextResponse.json({ leadId: data.id, existing: false });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
