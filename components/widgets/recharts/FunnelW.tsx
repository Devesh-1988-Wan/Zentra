'use client';
import { FunnelChart, Funnel, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
const data = [
  { value: 100, name: 'Impressions' },
  { value: 60, name: 'Clicks' },
  { value: 30, name: 'Signups' },
  { value: 12, name: 'Purchases' }
];
export default function FunnelW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
