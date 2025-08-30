import Link from 'next/link'
import { createServerClient } from '@/utils/supabase/server'

export default async function AdminProfileManagement() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="page-shell"><div className="page-shell-inner">Not authorized</div></div>

  const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (me?.role !== 'super_admin') {
    return <div className="page-shell"><div className="page-shell-inner">Forbidden</div></div>
  }

  const { data: profiles, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  if (error) return <div className="page-shell"><div className="page-shell-inner">Error: {error.message}</div></div>

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <h1>Profile Management</h1>
        <table className="table">
          <thead>
            <tr><th>Email</th><th>Name</th><th>Role</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {profiles?.map((p: any) => (
              <tr key={p.id}>
                <td>{p.email}</td>
                <td>{p.display_name}</td>
                <td>{p.role}</td>
                <td><Link href={`/admin/profile-management/${p.id}`}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
