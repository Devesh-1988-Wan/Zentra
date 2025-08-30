import { Suspense } from 'react';
import { WidgetGrid } from '@/components/WidgetGrid';

export default function DashboardPage({ params }: { params: { id: string } }){
  const demo = params.id === 'demo';
  const widgets = demo ? [
    {id:'1', kind:'kpi', title:'Total Revenue', config:{ format:'currency', delta:{show:true}}},
    {id:'2', kind:'line', title:'Weekly Users', config:{ x:'date', y:'users', smooth:true }},
    {id:'3', kind:'richtext', title:'Notes', config:{ html:'<p>Quarterly review highlights…</p>' }}
  ] : [];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Dashboard: {params.id}</h1>
      <Suspense fallback={<div>Loading…</div>}>
        <WidgetGrid widgets={widgets as any} />
      </Suspense>
    </div>
  );
}
