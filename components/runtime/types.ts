export type WidgetKind =
  | 'kpi' | 'multi-kpi' | 'line' | 'area' | 'bar' | 'stacked-bar' | 'combo' | 'pie' | 'donut'
  | 'treemap' | 'scatter' | 'bubble' | 'radar' | 'radialbar' | 'funnel' | 'sankey'
  | 'sunburst' | 'heatmap' | 'histogram' | 'boxplot' | 'waterfall' | 'gauge' | 'table'
  | 'pivot' | 'slicer' | 'date-range' | 'number-range' | 'markdown';

export interface WidgetInstance { id: string; kind: WidgetKind; title?: string; config?: any; }
