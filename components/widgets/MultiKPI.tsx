'use client';
export default function MultiKPI(){
  const items = [
    { label:'Revenue', value:'₹12.4M', delta:'+8.2%' },
    { label:'Users', value:'54,210', delta:'+4.1%' },
    { label:'NPS', value:'62', delta:'+3' },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((it)=> (
        <div key={it.label} className="rounded-md border p-3">
          <div className="text-xs text-slate-500">{it.label}</div>
          <div className="text-xl font-semibold">{it.value}</div>
          <div className="text-xs text-green-700">{it.delta}</div>
        </div>
      ))}
    </div>
  );
}
