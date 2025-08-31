'use client';

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

export type Dashboard = {
  id: string;
  title: string;
  org_id?: string | null; // optional to match query
  updated_at: string;
  config?: any;
};

export default function DashboardList({ orgId }: { orgId?: string }) {
  const [rows, setRows] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboards() {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('dashboards')
          .select('id, title, updated_at, org_id') // include org_id for consistency
          .order('updated_at', { ascending: false });

        if (orgId) query = query.eq('org_id', orgId);

        const { data, error } = await query;

        if (error) {
          console.error('[Dashboards fetch error]', error);
          if (!cancelled) setError(error.message || 'Unknown error');
          return;
        }

        if (!cancelled) setRows(data ?? []);
      } catch (e: any) {
        console.error('[Dashboards fetch exception]', e);
        if (!cancelled) setError(e?.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDashboards();
    return () => { cancelled = true; };
  }, [orgId, supabase]);

  if (loading) return <div>Loading dashboards…</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!rows.length) return <div>No dashboards yet.</div>;

  return (
    <ul className="space-y-2">
      {rows.map((d) => (
        <li key={d.id} className="rounded border p-3">
          <div className="font-medium">{d.title}</div>
          <div className="text-xs text-gray-500">
            Updated {new Date(d.updated_at).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}