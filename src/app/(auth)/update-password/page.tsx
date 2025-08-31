
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function UpdatePasswordPage() {
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') setStatus('Please enter your new password.')
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password })
    setStatus(error ? error.message : 'Password updated successfully.')
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: '56px auto' }}>
        <h1 style={{ color: 'var(--amla-primary-dark)' }}>Set a new password</h1>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input className="input" type="password" placeholder="New password" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={8}/>
          <button className="btn" type="submit">Update password</button>
        </form>
        {status && <p className="muted">{status}</p>}
      </div>
    </div>
  )
}
