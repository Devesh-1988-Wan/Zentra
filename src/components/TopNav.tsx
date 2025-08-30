'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function TopNav() {
  const supabase = createClient()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null))
  }, [supabase])

  return (
    <nav className="topnav">
      <div>
        <Link href="/">Zentra</Link>
        <Link href="/(auth)/sign-in">Sign in</Link>
        <Link href="/(auth)/sign-up">Sign up</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/admin/profile-management">Admin</Link>
      </div>
      <div>
        {email ? (
          <button onClick={() => supabase.auth.signOut().then(()=>location.href='/(auth)/sign-in')}>Sign out</button>
        ) : null}
      </div>
    </nav>
  )
}
