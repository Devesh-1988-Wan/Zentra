import { createClient } from '@/utils/supabase/server'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

type Widget = {
  id: string;
  type: string;
  config: {
    value?: string;
  };
};

export default async function ViewDashboard(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()
  const { data: widgets, error } = await supabase
    .from('dashboard_widgets')
    .select('*')
    .eq('dashboard_id', params.id);

  if (error) {
    console.error('Error fetching widgets:', error);
    return <div className="p-6">Error fetching widgets.</div>;
  }

  return (
    <div className="p-6 grid grid-cols-12 gap-3">
      {widgets?.map((w: Widget) => (
        <div key={w.id} className="border rounded p-3 col-span-3">
          <div className="text-sm opacity-70">{w.type}</div>
          <div className="text-2xl font-semibold">{w.config?.value ?? '-'}</div>
        </div>
      ))}
    </div>
  )
}