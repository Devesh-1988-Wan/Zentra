
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import ProfileForm from './profile-form'
import { isSuperAdmin } from '@/utils/auth/isSuperAdmin'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) redirect('/sign-in')
  if (!isSuperAdmin(data.user.email)) redirect('/')

  return <ProfileForm email={data.user.email!} />
}
