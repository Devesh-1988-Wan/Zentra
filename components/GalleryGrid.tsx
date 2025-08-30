'use client';
import { Registry } from '@/components/runtime/registry';
export default function GalleryGrid(){
  const kinds = Object.keys(Registry) as (keyof typeof Registry)[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {kinds.map((k, idx)=>{
        const Cmp = Registry[k].component;
        return (
          <div key={String(k)} className="card p-4">
            <div className="font-medium mb-2">{Registry[k].label}</div>
            <Cmp id={String(idx)} kind={k} />
          </div>
        );
      })}
    </div>
  );
}
