'use client';
export default function TableW(){
  const rows = [
    { region:'North', sales: 1200, profit: 120 },
    { region:'South', sales: 980, profit: 80 },
    { region:'East', sales: 760, profit: 60 },
  ];
  return (
    <table className="w-full text-sm">
      <thead><tr className="text-left text-slate-600"><th className="py-2">Region</th><th className="py-2">Sales</th><th className="py-2">Profit</th></tr></thead>
      <tbody>
        {rows.map((r)=> (
          <tr key={r.region} className="border-t"><td className="py-2">{r.region}</td><td className="py-2">{r.sales}</td><td className="py-2">{r.profit}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
