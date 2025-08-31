'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type Dashboard = {
  id: string;
  title: string;
  org_id: string | null;
  updated_at: string;
  config?: any; // optional; populate when DB has this column
};

export default function DashboardList({ orgId }: { orgId?: string }) {
  const [rows, setRows] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('dashboards')
          .select('id, title, updated_at') // "org_id" has been removed from this line.
          .order('updated_at', { ascending: false });

        if (orgId) query = query.eq('org_id', orgId);

        const { data, error } = await query;

        if (error) {
          console.error('[Dashboards fetch error]', {
            message: error.message,
            code: (error as any).code,
            details: (error as any).details,
            hint: (error as any).hint,
          });
          if (!cancelled) setError(error.message);
          return;
        }

        if (!cancelled) setRows(data || []);
      } catch (e: any) {
        console.error('[Dashboards fetch exception]', e);
        if (!cancelled) setError(e?.message || 'Unknown error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [orgId]);

  if (loading) return <div>Loading dashboards…</div>;
  if (error) return <div className="text-red-600">Error fetching dashboards: {error}</div>;
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