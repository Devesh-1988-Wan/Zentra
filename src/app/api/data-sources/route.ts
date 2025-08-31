import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data, error } = await supabase.from('data_sources').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { source_type, connection_details } = await request.json();
  const { data, error } = await supabase
    .from('data_sources')
    .insert([{ source_type, connection_details }])
    .select();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}