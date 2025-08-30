
// src/app/admin/page.example.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isSuperAdmin } from '@/utils/auth/isSuperAdmin'

export default async function AdminPage() {
  const supabase = await createClient()
  const ok = await isSuperAdmin(supabase)
  if (!ok) redirect('/')
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">You have super admin access.</p>
    </main>
  )
}
