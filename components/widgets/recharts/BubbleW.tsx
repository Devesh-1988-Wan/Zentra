'use client';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = Array.from({length: 30}, ()=>({ x: Math.random()*100, y: Math.random()*100, z: 20+Math.random()*80 }));
export default function BubbleW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid/>
          <XAxis type="number" dataKey="x"/>
          <YAxis type="number" dataKey="y"/>
          <ZAxis dataKey="z" range={[60,400]} />
          <Tooltip/>
          <Scatter data={data} fill="#2EAC69" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
