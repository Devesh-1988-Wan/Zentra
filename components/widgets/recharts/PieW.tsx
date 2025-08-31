'use client';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const data = [
  { name:'North', value: 400 },
  { name:'South', value: 300 },
  { name:'East', value: 300 },
  { name:'West', value: 200 },
];
const colors=['#2EAC69','#FFA33E','#7FCFA1','#A3AAB4'];
export default function PieW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, i)=> <Cell key={i} fill={colors[i%colors.length]}/>) }
          </Pie>
          <Tooltip/><Legend/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
