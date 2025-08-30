'use server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function addWidget(payload: { dashboard_id: string; kind: string; layout: any; config: any; }){
  const cookieStore = cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, { cookies: { get: (key:string)=>cookieStore.get(key)?.value, set: ()=>{}, remove: ()=>{} } });
  const { data: { user } } = await supabase.auth.getUser();
  const { data: wdata, error: werr } = await supabase.from('widgets').insert({ kind: payload.kind, created_by: user?.id }).select('id').single();
  if (werr) throw werr;
  const { error: derr } = await supabase.from('dashboard_widgets').insert({ dashboard_id: payload.dashboard_id, widget_id: wdata.id, layout: payload.layout, config: payload.config });
  if (derr) throw derr;
}
