'use client';
import dynamic from 'next/dynamic';
import type { FC } from 'react';

type Widget = { id:string; kind:'kpi'|'line'|'bar'|'table'|'richtext'; title?:string; config:any };

const KPI = dynamic(()=>import('./widgets/KPI'));
const Line = dynamic(()=>import('./widgets/Line'));
const Bar = dynamic(()=>import('./widgets/Bar'));
const Table = dynamic(()=>import('./widgets/Table'));
const RichText = dynamic(()=>import('./widgets/RichText'));

export const WidgetGrid: FC<{ widgets: Widget[] }> = ({ widgets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {widgets.map(w => (
        <div key={w.id} className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{w.title ?? w.kind.toUpperCase()}</h3>
            <button className="text-sm text-primary-700">Edit</button>
          </div>
          {w.kind === 'kpi' && <KPI {...w} />}
          {w.kind === 'line' && <Line {...w} />}
          {w.kind === 'bar' && <Bar {...w} />}
          {w.kind === 'table' && <Table {...w} />}
          {w.kind === 'richtext' && <RichText {...w} />}
        </div>
      ))}
    </div>
  );
};
