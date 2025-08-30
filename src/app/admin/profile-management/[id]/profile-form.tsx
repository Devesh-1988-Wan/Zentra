'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AdminProfileForm({ initial }: { initial: any }) {
  const supabase = createClient()
  const router = useRouter()
  const [displayName, setDisplayName] = useState(initial?.display_name ?? '')
  const [role, setRole] = useState(initial?.role ?? 'user')
  const [status, setStatus] = useState<string | null>(null)

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Saving...')
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, role })
      .eq('id', initial.id)
    setStatus(error ? error.message : 'Saved!')
    if (!error) router.push('/admin/profile-management')
  }

  return (
    <form onSubmit={onSave} className="stack">
      <label>Email</label>
      <input value={initial.email} disabled />
      <label>Display name</label>
      <input value={displayName} onChange={e => setDisplayName(e.target.value)} />
      <label>Role</label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">user</option>
        <option value="super_admin">super_admin</option>
      </select>
      <button type="submit">Save</button>
      {status && <p className="muted">{status}</p>}
    </form>
  )
}
