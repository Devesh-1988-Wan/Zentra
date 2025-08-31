
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import amla from '@/theme/amla.tokens'

export default function SignInPage() {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  useEffect(() => { supabase.auth.getSession().then(() => setLoading(false)) }, [])
  if (loading) return null
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: '56px auto' }}>
        <h1 style={{ color: 'var(--amla-primary-dark)' }}>Welcome back</h1>
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          providers={[]}
          redirectTo="/"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: amla.colors.brand,
                  brandAccent: amla.colors.brandDark,
                  inputBackground: '#fff',
                  inputText: amla.colors.text,
                },
                radii: { inputBorderRadius: '10px', buttonBorderRadius: '10px' },
                fonts: { bodyFontFamily: amla.font.body }
              }
            }
          }}
        />
        <p className="muted">New here? <Link className="link" href="/(auth)/sign-up">Create an account</Link></p>
        <p className="muted">Forgot password? <Link className="link" href="/(auth)/reset-password">Reset it</Link></p>
      </div>
    </div>
  )
}
