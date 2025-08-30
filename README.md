# Zentra Advanced Dashboard (Starter)

A Next.js + Supabase-ready dashboard UI with a **broad widget catalog** inspired by Power BI, Tableau, and Qlik Sense. Charts use **Recharts** (SVG, React) and **Apache ECharts** (advanced visuals like Sankey, Sunburst, Heatmap, Gauge, Boxplot, Waterfall).

## Visual Catalog
- Recharts: Line, Area, Bar, Stacked Bar, Combo (Bar+Line), Pie, Donut, Treemap, Scatter, Bubble, Radar, Radial Bar, Funnel.
- ECharts: Sankey, Sunburst, Heatmap, Histogram, Boxplot, Waterfall, Gauge.
- Tables & Filters: Table, Pivot (stub), Slicer, Date Range, Number Range, Markdown.

## Run Locally
```bash
cp .env.example .env.local  # fill Supabase keys if using persistence later
pnpm install
pnpm dev
```
Open http://localhost:3000 and explore **Visual Gallery** and **/dashboard/demo**.

## Notes
- Replace stub data with real data via Supabase or your APIs, then pass to widgets.
- Add RLS/roles and migrations (see previous base zip) to persist widgets and layouts.
