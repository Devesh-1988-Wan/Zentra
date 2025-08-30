import { createServerClient } from '@/utils/supabase/server'
import ProfileForm from './profile-form'

export default async function ProfilePage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="page-shell"><div className="page-shell-inner">Not authorized</div></div>

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="page-shell">
      <div className="page-shell-inner">
        <h1>Your Profile</h1>
        <ProfileForm initial={profile} />
      </div>
    </div>
  )
}
