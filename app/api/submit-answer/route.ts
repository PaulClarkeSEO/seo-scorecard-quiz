import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { leadId, questionId, answer, points, category } = await request.json();

    // Validate required fields
    if (!leadId || questionId === undefined || !answer || points === undefined || !category) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if response already exists for this lead and question
    const { data: existing } = await supabase
      .from('responses')
      .select('id')
      .eq('lead_id', leadId)
      .eq('question_id', questionId)
      .single();

    if (existing) {
      // Update existing response
      const { error } = await supabase
        .from('responses')
        .update({
          answer,
          points,
          category
        })
        .eq('id', existing.id);

      if (error) {
        console.error('Supabase update error:', error);
        throw new Error('Failed to update answer');
      }
    } else {
      // Insert new response
      const { error } = await supabase
        .from('responses')
        .insert({
          lead_id: leadId,
          question_id: questionId,
          answer,
          points,
          category
        });

      if (error) {
        console.error('Supabase insert error:', error);
        throw new Error('Failed to save answer');
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving answer:', error);
    return NextResponse.json(
      { error: 'Failed to save answer' },
      { status: 500 }
    );
  }
}
