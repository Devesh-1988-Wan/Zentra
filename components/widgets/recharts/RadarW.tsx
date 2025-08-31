'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
const data = [
  { subject: 'Quality', A: 120 },
  { subject: 'Speed', A: 98 },
  { subject: 'Cost', A: 86 },
  { subject: 'UX', A: 99 },
  { subject: 'Scale', A: 85 }
];
export default function RadarW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar dataKey="A" stroke="#2EAC69" fill="#2EAC69" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
