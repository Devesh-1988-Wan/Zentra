'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = ['A','B','C','D','E','F'].map((k)=>({ name:k, value: Math.round(50+Math.random()*100)}));
export default function BarChartW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2EAC69" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
