import type { WidgetInstance } from './types';
export function demoLayout(): WidgetInstance[]{
  return [
    { id:'k1', kind:'kpi', title:'Revenue' },
    { id:'k2', kind:'multi-kpi', title:'KPIs' },
    { id:'c1', kind:'line', title:'Trend' },
    { id:'c2', kind:'stacked-bar', title:'Stacked' },
    { id:'c3', kind:'donut', title:'Share' },
    { id:'c4', kind:'scatter', title:'Relationship' },
    { id:'e1', kind:'sankey', title:'Flow' },
    { id:'e2', kind:'sunburst', title:'Hierarchy' },
    { id:'e3', kind:'gauge', title:'Target' },
    { id:'t1', kind:'table', title:'Table' },
    { id:'f1', kind:'slicer', title:'Category Filter' },
    { id:'f2', kind:'date-range', title:'Date Range' },
  ];
}
