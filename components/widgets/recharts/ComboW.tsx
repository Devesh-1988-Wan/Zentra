'use client';
import { ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, ResponsiveContainer } from 'recharts';
const data = Array.from({length: 12}, (_,i)=>({ name:`Q${i+1}`, bar: Math.round(100+Math.random()*50), line: Math.round(80+Math.random()*40)}));
export default function ComboW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey="bar" fill="#A3AAB4"/>
          <Line dataKey="line" stroke="#2EAC69" strokeWidth={2}/>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
