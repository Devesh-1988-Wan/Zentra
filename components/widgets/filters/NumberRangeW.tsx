'use client';
export default function NumberRangeW(){
  return (
    <div className="flex items-center gap-2">
      <input type="number" placeholder="Min" className="border rounded-md px-2 py-1 w-28"/>
      <span>to</span>
      <input type="number" placeholder="Max" className="border rounded-md px-2 py-1 w-28"/>
    </div>
  );
}
