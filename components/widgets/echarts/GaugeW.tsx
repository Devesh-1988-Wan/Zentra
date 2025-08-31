'use client';
import EChart from './EChart';
const option = { series: [{ type:'gauge', progress:{ show:true }, detail:{ valueAnimation:true, formatter:'{value}%' }, data:[{ value: 72, name:'Target' }] }] };
export default function GaugeW(){ return <EChart option={option}/> }
