'use client';
import EChart from './EChart';
const hours = ['12a','1a','2a','3a','4a','5a','6a','7a'];
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const data = [] as any[];
for(let i=0;i<days.length;i++) for(let j=0;j<hours.length;j++) data.push([j,i,Math.round(Math.random()*10)]);
const option = { tooltip: {}, xAxis: { type: 'category', data: hours, splitArea: { show: true } }, yAxis: { type: 'category', data: days, splitArea: { show: true } }, visualMap: { min:0, max:10, calculable:true, orient:'horizontal', left:'center', bottom:0 }, series: [{ name:'Punch Card', type:'heatmap', data, emphasis: { itemStyle: { shadowBlur: 10 } } }] };
export default function HeatmapW(){ return <EChart option={option} style={{height:300}}/> }
