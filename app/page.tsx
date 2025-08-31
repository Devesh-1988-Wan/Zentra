import { KPICard } from "../components/KPICard";
import { TrendLine } from "../components/TrendLine";

const data = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 132 },
  { label: 'Mar', value: 128 },
  { label: 'Apr', value: 145 },
  { label: 'May', value: 153 },
  { label: 'Jun', value: 168 },
];

export default function Page() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Executive Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Revenue" value={16800000} target={16000000} prior={14200000} currency="₹" />
        <KPICard label="Gross Margin %" value={36.2} target={35} prior={33.9} currency="" />
        <KPICard label="Pipeline (₹ Cr)" value={21.4} target={18.0} prior={15.1} currency="" />
        <KPICard label="NPS" value={58} target={55} prior={47} currency="" />
      </div>
      <div className="card">
        <div className="mb-2 text-muted text-sm">Run-rate trend</div>
        {/* map to AMLA brand color via CSS var */}
        <TrendLine data={data} dataKey="value" color="var(--amla-brand)" />
      </div>
    </main>
  );
}
