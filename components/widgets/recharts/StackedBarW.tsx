'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const data = ['A','B','C','D','E'].map((k)=>({ name:k, x: Math.round(30+Math.random()*60), y: Math.round(20+Math.random()*40)}));
export default function StackedBarW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip />
          <Bar dataKey="x" stackId="a" fill="#2EAC69" />
          <Bar dataKey="y" stackId="a" fill="#FFA33E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
