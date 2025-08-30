
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Ensure session exists after redirect from email link
    supabase.auth.getUser().then(({ data }) => {
      setReady(!!data?.user)
    })
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const { error } = await supabase.auth.updateUser({ password })
    if (error) return setError(error.message)
    router.push('/sign-in')
  }

  if (!ready) return <p>Preparing secure session...</p>

  return (
    <div>
      <h1>Choose a new password</h1>
      <form onSubmit={onSubmit}>
        <label>New password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Update password</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
