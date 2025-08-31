'use client';
export default function DateRangeW(){
  return (
    <div className="flex items-center gap-2">
      <input type="date" className="border rounded-md px-2 py-1"/>
      <span>to</span>
      <input type="date" className="border rounded-md px-2 py-1"/>
    </div>
  );
}
