'use client';
import EChart from './EChart';
const option = {
  tooltip: {},
  series: [{
    type: 'sunburst', radius: [0, '85%'],
    data: [ {name:'North', value:6, children:[{name:'A',value:2},{name:'B',value:4}]}, {name:'South',value:4, children:[{name:'C',value:1},{name:'D',value:3}]} ]
  }]
};
export default function SunburstW(){ return <EChart option={option}/> }
