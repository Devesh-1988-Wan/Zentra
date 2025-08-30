-- Existing schema...

-- New tables for BI features

CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    source_type TEXT NOT NULL, -- e.g., 'postgresql', 'mysql', 'bigquery'
    connection_details JSONB NOT NULL, -- Encrypted connection string
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE data_source_credentials (
    id SERIAL PRIMARY KEY,
    data_source_id INTEGER REFERENCES data_sources(id),
    user_id UUID REFERENCES auth.users(id),
    username TEXT,
    password TEXT, -- Encrypted
    token TEXT, -- Encrypted
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE data_models (
    id SERIAL PRIMARY KEY,
    data_source_id INTEGER REFERENCES data_sources(id),
    user_id UUID REFERENCES auth.users(id),
    model_schema JSONB NOT NULL, -- Store table relationships, calculated columns, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE dashboard_permissions (
    id SERIAL PRIMARY KEY,
    dashboard_id INTEGER REFERENCES dashboards(id),
    user_id UUID REFERENCES auth.users(id),
    permission_level TEXT NOT NULL, -- e.g., 'view', 'edit', 'share'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE dashboard_comments (
    id SERIAL PRIMARY KEY,
    dashboard_id INTEGER REFERENCES dashboards(id),
    user_id UUID REFERENCES auth.users(id),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);