import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function KPICard({
  label,
  value,
  target,
  prior,
  currency = "₹",
}: {
  label: string;
  value: number;
  target?: number;
  prior?: number;
  currency?: string;
}) {
  const variance = target !== undefined ? value - target : undefined;
  const yoy = prior !== undefined ? ((value - prior) / Math.max(1, prior)) * 100 : undefined;
  const good = variance !== undefined ? variance >= 0 : yoy !== undefined ? yoy >= 0 : true;

  return (
    <div className="rounded-xl bg-surface p-4 shadow-md">
      <div className="text-muted text-sm">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-text">
        {currency}{value.toLocaleString()}
      </div>
      <div className="mt-2 flex items-center gap-3 text-sm">
        {variance !== undefined && (
          <span className={`inline-flex items-center ${good ? "text-success" : "text-danger"}`}>
            {good ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="ml-1">
              Δ vs Target: {currency}
              {Math.abs(variance).toLocaleString()}
            </span>
          </span>
        )}
        {yoy !== undefined && (
          <span className={`inline-flex items-center ${yoy >= 0 ? "text-success" : "text-danger"}`}>
            {yoy >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="ml-1">YoY: {Math.abs(yoy).toFixed(1)}%</span>
          </span>
        )}
      </div>
    </div>
  );
}
