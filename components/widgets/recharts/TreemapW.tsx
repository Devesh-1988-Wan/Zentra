'use client';
import { Treemap, ResponsiveContainer } from 'recharts';
const data = [
  { name: 'Category A', size: 400 },
  { name: 'Category B', size: 300 },
  { name: 'Category C', size: 200 },
  { name: 'Category D', size: 100 },
];
export default function TreemapW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap data={data} dataKey="size" ratio={4/3} stroke="#fff" fill="#2EAC69"/>
      </ResponsiveContainer>
    </div>
  );
}
