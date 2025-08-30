'use client';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
const data = [
  { name: '18-24', uv: 31, fill: '#2EAC69' },
  { name: '25-34', uv: 45, fill: '#FFA33E' },
  { name: '35-44', uv: 24, fill: '#7FCFA1' }
];
export default function RadialBarW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart innerRadius="20%" outerRadius="90%" data={data}>
          <RadialBar background dataKey="uv" />
          <Legend />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
