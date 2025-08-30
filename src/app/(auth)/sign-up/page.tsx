'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function SignUpPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  useEffect(() => { supabase.auth.getSession().then(() => setLoading(false)) }, [])
  if (loading) return null

  return (
    <div className="auth-shell">
      <h1>Create your account</h1>
      <Auth
        supabaseClient={supabase}
        view="sign_up"
        appearance={{ theme: ThemeSupa, variables: { default: { colors: { brand: 'var(--amla-primary)', brandAccent: '#2abf97' } } } }}
        providers={[]}
        redirectTo="/"
      />
      <p className="muted">Already have an account? <Link href="/(auth)/sign-in">Sign in</Link></p>
    </div>
  )
}
