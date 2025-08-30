
import { createServerClient } from '@/lib/supabase/server'
import ProfileForm from './profile-form'

export default async function ProfilePage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container"><div className="card" style={{marginTop:20}}>Not authorized</div></div>

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="container">
      <div className="card" style={{ marginTop: 20 }}>
        <h1>Profile</h1>
        <ProfileForm initial={profile} />
      </div>
    </div>
  )
}
