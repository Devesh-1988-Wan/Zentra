
export function isSuperAdmin(email?: string | null) {
  if (!email) return false
  const raw = process.env.NEXT_PUBLIC_SUPER_ADMINS || ''
  const admins = raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  return admins.includes(email.toLowerCase())
}
