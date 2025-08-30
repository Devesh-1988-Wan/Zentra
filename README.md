
# Zentra Dashboard

This repository contains the configuration and components for the AMLA-themed Zentra dashboard, including widget definitions, theme tokens, icon integration, and Supabase setup.

## 🖼 Theme Setup

The AMLA theme is defined in `amla_theme_tokens.json` and includes:
- Primary and secondary color tokens
- Typography tokens (Poppins, Roboto, Arial)

## 📊 Widget Configuration

Widgets are defined in `widget_config.json` and include:
- KPI, Bar, Donut, Table, Progress, Text
- Heatmap, Timeline, Map, Bullet Chart, Sparkline, Gauge
- Filter Panel, User Avatar, Notification

## 🎨 Icon Integration

Icons for widgets are mapped in `supabase_icon_config.json` and sourced from free libraries like Icons8, Flaticon, Freepik, Iconoir.

## 🧱 Supabase Setup

Run the SQL schema in Supabase Studio:
```sql
CREATE TABLE widget_icons (
    id SERIAL PRIMARY KEY,
    widget_type TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    source_url TEXT NOT NULL
);
```

Then use `supabase_sync_script.py` to populate the table:
```bash
python supabase_sync_script.py
```

## ⚛️ Frontend Integration

Use the `WidgetIcons.js` React component to display icons:
```jsx
import WidgetIcons from './components/WidgetIcons';

function DashboardEditor() {
  return (
    <div>
      <h2>Widget Library</h2>
      <WidgetIcons />
    </div>
  );
}
```

## 📁 File Structure
```
zentra/
├── public/
│   ├── supabase_icon_config.json
│   ├── widget_config.json
│   └── amla_theme_tokens.json
├── src/
│   └── components/
│       └── WidgetIcons.js
├── supabase_widget_icon_schema.sql
├── supabase_sync_script.py
└── README.md
```

## 🧩 Credits
- AMLA theme from `amla-theme-template.pdf`
- Icons from Icons8, Flaticon, Freepik, Iconoir

