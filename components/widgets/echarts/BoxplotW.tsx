'use client';
import EChart from './EChart';
// Simple static five-number summary for two series
const option = {
  tooltip: { trigger:'item' },
  xAxis: { type:'category', data:['A','B']},
  yAxis: { type:'value' },
  series: [
    { type:'boxplot', data:[ [10,20,30,40,50], [15,25,35,45,60] ] }
  ]
};
export default function BoxplotW(){ return <EChart option={option}/> }
