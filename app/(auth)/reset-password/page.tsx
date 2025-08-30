
'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const site = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
    const redirectTo = `${site}/update-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) return setError(error.message)
    setSent(true)
  }

  return (
    <div>
      <h1>Reset password</h1>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Send reset link</button>
      </form>
      {sent && <p>Reset link sent. Check your inbox.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
