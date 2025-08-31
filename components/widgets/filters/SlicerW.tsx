'use client';
export default function SlicerW(){
  const cats = ['North','South','East','West'];
  return (
    <div className="flex flex-wrap gap-2">
      {cats.map(c=> <button key={c} className="px-2 py-1 border rounded-md hover:bg-slate-50">{c}</button>)}
    </div>
  );
}
