
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isSuperAdmin } from '@/utils/auth/isSuperAdmin'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) redirect('/sign-in')
  if (!isSuperAdmin(data.user.email)) redirect('/')

  return (
    <div>
      <h1>Admin</h1>
      <p>Welcome, {data.user.email}</p>
      <ul>
        <li><a href="/profile">Manage Profile</a></li>
      </ul>
    </div>
  )
}
