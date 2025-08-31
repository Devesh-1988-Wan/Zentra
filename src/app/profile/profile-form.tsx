
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ProfileForm({ initial }: { initial: any }) {
  const supabase = createClient()
  const [displayName, setDisplayName] = useState(initial?.display_name ?? '')
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url ?? '')
  const [status, setStatus] = useState<string | null>(null)

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Saving...')
    const user = (await supabase.auth.getUser()).data.user
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: displayName, avatar_url: avatarUrl })
      .eq('id', user?.id)
    setStatus(error ? error.message : 'Saved!')
  }

  return (
    <form onSubmit={onSave} style={{ display:'grid', gap: 12 }}>
      <label>Display name</label>
      <input className="input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
      <label>Avatar URL</label>
      <input className="input" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} />
      <button className="btn" type="submit">Save</button>
      {status && <p className="muted">{status}</p>}
    </form>
  )
}
