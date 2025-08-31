
import DashboardList from '@/components/DashboardList';

export const metadata = { title: 'Dashboards' };

export default function DashboardsPage() {
  // If you have organization context, pass orgId to filter
  // const orgId = useOrgId();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboards</h1>
      <DashboardList />
    </main>
  );
}
