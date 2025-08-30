
import { createServerClient } from '@/lib/supabase/server'
import AdminProfileForm from './profile-form'

export default async function EditUser({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container"><div className="card" style={{marginTop:20}}>Not authorized</div></div>

  const { data: me } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (me?.role !== 'super_admin') return <div className="container"><div className="card" style={{marginTop:20}}>Forbidden</div></div>

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', params.id).single()

  return (
    <div className="container"><div className="card" style={{marginTop:20}}>
      <h1>Edit Profile</h1>
      <AdminProfileForm initial={profile} />
    </div></div>
  )
}
