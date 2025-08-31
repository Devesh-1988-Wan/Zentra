import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

type Dashboard = {
  id: string;
  title: string;
  description: string;
  updated_at: string;
};

export default async function DashboardsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return (
      <div className="p-6">
        Please <Link href="/sign-in" className="underline">sign in</Link>.
      </div>
    );
  }

  const { data: dashboards, error } = await supabase
    .from('dashboards')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching dashboards:', error);
    return <div className="p-6">Error fetching dashboards.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboards</h1>
        <form action="/api/create-dashboard" method="post">
          <input type="hidden" name="title" value="Untitled Dashboard" />
          <button className="bg-[hsl(var(--brand))] text-white rounded px-3 py-2">New Dashboard</button>
        </form>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboards?.map((d: Dashboard) => (
          <li key={d.id} className="border rounded p-4">
            <h3 className="font-medium">{d.title}</h3>
            <p className="text-sm opacity-70">{d.description}</p>
            <div className="mt-3 space-x-3">
              <Link className="underline" href={`/dashboards/${d.id}/edit`}>Edit</Link>
              <Link className="underline" href={`/dashboards/${d.id}/view`}>View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}