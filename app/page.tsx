import Link from 'next/link';
export default function Page(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Zentra Advanced Dashboard</h1>
      <p className="text-slate-600">A BI-style dashboard builder with rich widgets inspired by Power BI, Tableau, and Qlik.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="card p-4"><h2 className="font-medium">Start</h2><p>Create a new dashboard or open the demo.</p><Link className="text-primary-500 underline" href="/dashboard/demo">Open Demo</Link></div>
        <div className="card p-4"><h2 className="font-medium">Visual Gallery</h2><p>Preview supported charts and widgets.</p><Link className="text-primary-500 underline" href="/gallery">Open Gallery</Link></div>
        <div className="card p-4"><h2 className="font-medium">Admin</h2><p>Manage theme, icons, and data sources.</p><Link className="text-primary-500 underline" href="/admin">Admin</Link></div>
      </div>
    </div>
  );
}
