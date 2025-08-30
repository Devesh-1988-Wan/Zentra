'use client';
import { Registry } from './registry';
import type { WidgetInstance } from './types';

export function DashboardCanvas({ layout }: { layout: WidgetInstance[] }){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {layout.map(w => {
        const Cmp = Registry[w.kind]?.component;
        return (
          <div key={w.id} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{w.title ?? Registry[w.kind]?.label}</h3>
              <button className="text-xs text-primary-500">Edit</button>
            </div>
            {Cmp ? <Cmp {...w}/> : <div>Unknown widget</div>}
          </div>
        );
      })}
    </div>
  );
}
