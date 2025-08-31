'use client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
const data = [ { name:'A', value: 30 }, { name:'B', value: 25 }, { name:'C', value: 20 }, { name:'D', value: 25 } ];
const colors=['#2EAC69','#FFA33E','#7FCFA1','#A3AAB4'];
export default function DonutW(){
  return (
    <div className="h-60">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
            {data.map((_, i)=> <Cell key={i} fill={colors[i%colors.length]} />)}
          </Pie>
          <Tooltip/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
