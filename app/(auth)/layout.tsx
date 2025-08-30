
import type { ReactNode } from 'react'
import AdminLink from '@/components/AdminLink'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: 420, margin: '48px auto', padding: 24 }}>
      {children}
      <AdminLink />
    </div>
  )
}
