import { createClient } from '@/utils/supabase/server'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export default async function ViewDashboard({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: widgets } = await supabase.from('dashboard_widgets').select('*').eq('dashboard_id', params.id)

  return (
    <div className="p-6 grid grid-cols-12 gap-3">
      {widgets?.map((w:any)=> (
        <div key={w.id} className="border rounded p-3 col-span-3">
          <div className="text-sm opacity-70">{w.type}</div>
          <div className="text-2xl font-semibold">{w.config?.value ?? '-'}</div>
        </div>
      ))}
    </div>
  )
}
