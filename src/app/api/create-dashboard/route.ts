import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: Request) {
  const form = await req.formData()
  const title = String(form.get('title') || 'Untitled')
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(new URL('/sign-in', req.url))

  // This line is the one to check
  const { data, error } = await supabase.from('dashboards').insert({ title, owner_id: user.id, is_private: false }).select('id').single()
  
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.redirect(new URL(`/dashboards/${data.id}/edit`, req.url))
}