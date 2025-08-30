'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [phase, setPhase] = useState<'request' | 'update'>('request')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') setPhase('update')
    })
    return () => { sub?.subscription.unsubscribe() }
  }, [])

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    setMessage(error ? error.message : 'Password reset email sent.')
  }

  const updatePwd = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password })
    setMessage(error ? error.message : 'Password updated. You can sign in now.')
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Reset password</h1>
      {phase === 'request' ? (
        <form onSubmit={sendEmail} className="space-y-4">
          <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <button className="bg-[hsl(var(--brand))] text-white rounded px-4 py-2">Send reset link</button>
        </form>
      ) : (
        <form onSubmit={updatePwd} className="space-y-4">
          <input className="w-full border rounded p-2" type="password" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="bg-[hsl(var(--brand))] text-white rounded px-4 py-2">Update password</button>
        </form>
      )}
      {message && <p className="mt-3">{message}</p>}
    </div>
  )
}
