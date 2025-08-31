'use client';
import EChart from './EChart';
const option = { tooltip: { trigger: 'item' }, series: [{ type: 'sankey', data: [ {name:'Source'}, {name:'A'}, {name:'B'}, {name:'C'} ], links: [ {source:'Source', target:'A', value:10}, {source:'Source', target:'B', value:6}, {source:'B', target:'C', value:3} ], lineStyle: { color: 'gradient', curveness: 0.5 } }] };
export default function SankeyW(){ return <EChart option={option}/> }
