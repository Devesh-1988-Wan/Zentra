import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function DataSourcesPage() {
  const supabase = createClient();
  const { data: dataSources } = await supabase.from('data_sources').select('*');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Sources</h1>
      <Link href="/data-sources/new">
        <a className="bg-blue-500 text-white px-4 py-2 rounded">New Data Source</a>
      </Link>
      <div className="mt-4">
        {dataSources?.map((ds) => (
          <div key={ds.id} className="border p-4 my-2 rounded">
            <h2 className="text-xl">{ds.source_type}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}