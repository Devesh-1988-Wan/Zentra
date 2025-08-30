import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export default async function Admin(){
  const cookieStore = cookies();
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, { cookies: { get: (key:string)=>cookieStore.get(key)?.value, set: ()=>{}, remove: ()=>{} } });
  const { data: { session } } = await supabase.auth.getSession();
  const email = session?.user?.email;
  const isSuper = email === 'devesh.pillewan@amla.io';
  if(!isSuper){
    return <div className="text-red-600">Access denied. Super admin only.</div>
  }
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin</h1>
      <p className="text-slate-600">You are signed in as <b>{email}</b>.</p>
      <ul className="list-disc pl-6">
        <li>Manage theme tokens</li>
        <li>Import icons</li>
        <li>Review RLS and roles</li>
      </ul>
    </div>
  );
}
