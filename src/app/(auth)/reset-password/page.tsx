
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/(auth)/update-password` })
    setStatus(error ? error.message : 'Check your email for the reset link.')
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: '56px auto' }}>
        <h1 style={{ color: 'var(--amla-primary-dark)' }}>Reset your password</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input className="input" type="email" placeholder="name@company.com" value={email}
            onChange={e => setEmail(e.target.value)} required />
          <button className="btn" type="submit">Send reset link</button>
          {status && <p className="muted">{status}</p>}
        </form>
      </div>
    </div>
  )
}
