
import Link from 'next/link'

export default function AuthIndex() {
  return (
    <div>
      <h1>Authentication</h1>
      <ul>
        <li><Link href="/sign-in">Sign in</Link></li>
        <li><Link href="/sign-up">Sign up</Link></li>
        <li><Link href="/reset-password">Reset password</Link></li>
      </ul>
    </div>
  )
}
