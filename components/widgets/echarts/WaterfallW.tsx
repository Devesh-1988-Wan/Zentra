'use client';
import EChart from './EChart';
const x = ['Sales','Consulting','Net revenue','Purchases','Other expenses','Profit'];
const increase = [60,80,0,0,0,0];
const decrease = [0,0,0,40,20,0];
const base = [0,0,140,100,80,0];
const option = { tooltip: { trigger:'axis', axisPointer:{ type:'shadow' } }, xAxis: { type:'category', data:x }, yAxis: { type:'value' }, series: [ { type:'bar', stack:'total', itemStyle:{ borderColor:'transparent', color:'transparent' }, data: base }, { name:'Increase', type:'bar', stack:'total', data: increase, itemStyle:{ color:'#2EAC69' } }, { name:'Decrease', type:'bar', stack:'total', data: decrease, itemStyle:{ color:'#D92D20' } } ] };
export default function WaterfallW(){ return <EChart option={option}/> }
