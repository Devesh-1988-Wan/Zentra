'use client';
import ReactECharts from 'echarts-for-react';
export default function EChart({ option, style }: { option: any; style?: React.CSSProperties }){
  return <ReactECharts option={option} style={{ height: 240, width: '100%', ...(style||{}) }} notMerge={true} lazyUpdate={true} />
}
