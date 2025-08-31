'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { isSuperAdmin } from '@/utils/auth/isSuperAdmin'

export default function AdminLink() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const run = async () => {
      const flag = (process.env.NEXT_PUBLIC_SHOW_ADMIN_ON_AUTH || 'false').toLowerCase() === 'true'
      if (!flag) return setShow(false)
      const supabase = createClient()
      const canSee = await isSuperAdmin(supabase)
      setShow(canSee)
    }
    run()
  }, [])

  if (!show) return null

  return (
    <div style={{ marginTop: 12 }}>
      <Link href="/admin" className="text-sm underline text-primary">Go to Admin</Link>
    </div>
  )
}