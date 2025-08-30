// deno-lint-ignore-file no-explicit-any
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

serve(async (req) => {
  try {
    const { dashboard_id } = await req.json()
    const url = Deno.env.get('SUPABASE_URL')!
    const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const headers = { 'apikey': key, 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' }

    const dRes = await fetch(`${url}/rest/v1/dashboards?id=eq.${dashboard_id}`, { headers })
    const dashboards: any[] = await dRes.json()
    if (!dashboards.length) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 })

    const wRes = await fetch(`${url}/rest/v1/dashboard_widgets?dashboard_id=eq.${dashboard_id}`, { headers })
    const widgets: any[] = await wRes.json()

    const snapshot = { dashboard: dashboards[0], widgets }

    const vRes = await fetch(`${url}/rest/v1/dashboard_versions`, { method: 'POST', headers, body: JSON.stringify({ dashboard_id, snapshot }) })
    if (!vRes.ok) return new Response(await vRes.text(), { status: 400 })

    await fetch(`${url}/rest/v1/dashboards?id=eq.${dashboard_id}`, { method: 'PATCH', headers, body: JSON.stringify({ status: 'published' }) })

    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
})
