
'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

type Props = { email: string }

export default function ProfileForm({ email }: Props) {
  const supabase = createClient()
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.updateUser({ data: { displayName } })
    if (error) return setMessage(error.message)
    setMessage('Profile updated')
  }

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) return setMessage(error.message)
    setMessage('Password changed')
    setPassword('')
  }

  return (
    <div>
      <h1>Super Admin Profile</h1>
      <p>Email (read-only): <strong>{email}</strong></p>

      <form onSubmit={saveProfile} style={{ marginTop: 16 }}>
        <label>Display name</label>
        <input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" />
        <button type="submit">Save profile</button>
      </form>

      <form onSubmit={changePassword} style={{ marginTop: 16 }}>
        <label>New password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Change password</button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  )
}
