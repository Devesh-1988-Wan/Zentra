import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.from('data_models').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { data_source_id, model_schema } = await request.json();
  const { data, error } = await supabase
    .from('data_models')
    .insert([{ data_source_id, model_schema }])
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}