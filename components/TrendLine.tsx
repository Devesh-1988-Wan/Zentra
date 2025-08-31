import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export function TrendLine({ data, dataKey, color = "var(--amla-brand)" }: { data: any[]; dataKey: string; color?: string; }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#263241" />
          <XAxis dataKey="label" tick={{ fill: "var(--amla-muted)" }} />
          <YAxis tick={{ fill: "var(--amla-muted)" }} />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
