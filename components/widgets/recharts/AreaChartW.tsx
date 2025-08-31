'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = Array.from({length: 24}, (_,i)=>({ name: `W${i+1}`, a: Math.round(50+Math.random()*40), b: Math.round(40+Math.random()*30) }));
export default function AreaChartW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2EAC69" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#2EAC69" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="a" stroke="#2EAC69" fill="url(#g1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
