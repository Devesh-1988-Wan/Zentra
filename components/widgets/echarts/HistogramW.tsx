'use client';
import EChart from './EChart';
const raw = Array.from({length: 200}, ()=> Math.round(Math.random()*100));
const buckets = 10, max=100, size=max/buckets;
const hist = Array.from({length:buckets}, (_,i)=> raw.filter(v=> v>=i*size && v<(i+1)*size).length);
const option = {
  tooltip: {},
  xAxis: { type:'category', data: Array.from({length:buckets}, (_,i)=> `${i*size}-${(i+1)*size}`) },
  yAxis: { type:'value' },
  series: [{ type:'bar', data: hist }]
};
export default function HistogramW(){ return <EChart option={option}/> }
