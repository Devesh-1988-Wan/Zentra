'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import GridLayout, { Layout } from 'react-grid-layout'
import { createClient } from '@/utils/supabase/client'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default function EditDashboard() {
  const { id } = useParams<{ id: string }>()
  const supabase = createClient()
  const [layout, setLayout] = useState<Layout[]>([])
  const [widgets, setWidgets] = useState<any[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    ;(async () => {
      const { data: d } = await supabase.from('dashboards').select('*').eq('id', id).single()
      if (d) setTitle(d.title)
      const { data: w } = await supabase.from('dashboard_widgets').select('*').eq('dashboard_id', id)
      if (w) {
        setWidgets(w)
        setLayout(w.map((x:any) => ({ i: x.id, x: x.x, y: x.y, w: x.w, h: x.h })))
      }
    })()
  }, [id])

  const addKPI = async () => {
    const insert = { dashboard_id: id, type: 'kpi', x: 0, y: Infinity, w: 3, h: 2, config: { label: 'KPI', value: 100, delta: 5 } }
    const { data } = await supabase.from('dashboard_widgets').insert(insert).select('*').single()
    if (data) {
      setWidgets(prev=>[...prev, data])
      setLayout(prev=>[...prev, { i: data.id, x: data.x, y: data.y, w: data.w, h: data.h }])
    }
  }

  const onLayoutChange = async (l: Layout[]) => {
    setLayout(l)
    // persist positions
    await Promise.all(l.map(item => {
      return supabase.from('dashboard_widgets').update({ x: item.x, y: item.y, w: item.w, h: item.h }).eq('id', item.i)
    }))
  }

  const publish = async () => {
    const { data, error } = await supabase.functions.invoke('publish-dashboard', { body: { dashboard_id: id } })
    alert(error ? error.message : 'Published!')
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2">
        <input className="border rounded px-2 py-1" value={title} onChange={e=>setTitle(e.target.value)} onBlur={async()=>{ await supabase.from('dashboards').update({ title }).eq('id', id) }} />
        <button onClick={addKPI} className="bg-[hsl(var(--brand))] text-white rounded px-3 py-1">Add KPI</button>
        <button onClick={publish} className="border rounded px-3 py-1">Publish</button>
      </div>
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={40} width={1200} onLayoutChange={onLayoutChange}>
        {widgets.map(w => (
          <div key={w.id} className="border rounded p-2 bg-white">
            <strong>{w.config?.label || w.type}</strong>
            <div className="text-2xl">{w.config?.value}</div>
          </div>
        ))}
      </GridLayout>
    </div>
  )
}
