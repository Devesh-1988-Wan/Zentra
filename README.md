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

Run the SQL schema in `supabase/sql/01_schema.sql` in Supabase Studio.

Then use `supabase_sync_script.py` to populate the `widget_icons` table:
```bash
python supabase_sync_script.py