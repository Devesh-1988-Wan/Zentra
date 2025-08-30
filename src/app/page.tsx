
import { createServerClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="container">
      <div className="card" style={{ marginTop: 20 }}>
        <h1>Leadership Dashboard</h1>
        {user ? (
          <p>Welcome, {user.email}</p>
        ) : (
          <p>Please sign in to see your widgets.</p>
        )}
      </div>
    </div>
  )
}
