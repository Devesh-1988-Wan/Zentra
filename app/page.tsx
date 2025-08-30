import Link from 'next/link';
export default function Page(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Leadership Dashboard</h1>
      <p className="text-slate-600">Create dashboards, add widgets, and manage theme & icons.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="font-medium mb-2">Dashboards</h2>
          <p className="text-sm text-slate-600">Your private dashboards live here.</p>
          <Link className="text-primary-700 underline mt-2 inline-block" href="/dashboard/demo">Open Demo Dashboard</Link>
        </div>
        <div className="card p-4">
          <h2 className="font-medium mb-2">Theme</h2>
          <p className="text-sm text-slate-600">AMLA theme tokens are loaded from JSON and CSS variables.</p>
        </div>
      </div>
    </div>
  );
}
