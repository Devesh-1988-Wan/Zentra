
CREATE TABLE widget_icons (
    id SERIAL PRIMARY KEY,
    widget_type TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    source_url TEXT NOT NULL
);
