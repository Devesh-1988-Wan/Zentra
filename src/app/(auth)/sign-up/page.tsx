'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm` } })
    if (error) setError(error.message)
    else alert('Check your email to confirm your account')
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <p className="text-red-600">{error}</p>}
        <button disabled={loading} className="bg-[hsl(var(--brand))] text-white rounded px-4 py-2">{loading? 'Creating...' : 'Sign up'}</button>
      </form>
      <div className="mt-4 text-sm">
        <Link href="/sign-in" className="underline">Back to sign in</Link>
      </div>
    </div>
  )
}
