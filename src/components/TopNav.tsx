
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TopNav() {
  const supabase = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
  }, [supabase])

  return (
    <div className="topbar">
      <div className="brand">AMLA Dashboard</div>
      <nav>
        <Link href="/">Dashboard</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/admin/profile-management">Admin</Link>
        {!email && <Link href="/(auth)/sign-in">Sign in</Link>}
        {!email && <Link href="/(auth)/sign-up">Sign up</Link>}
        {email && <button className="btn" onClick={() => supabase.auth.signOut().then(()=>location.href='/(auth)/sign-in')}>Sign out</button>}
      </nav>
    </div>
  )
}
