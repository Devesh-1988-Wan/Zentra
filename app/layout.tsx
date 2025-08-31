export const metadata = {
  title: 'Zentra Dashboard',
  description: 'Leadership dashboard',
}

import './globals.css'
import '../styles/tokens.css'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg text-text">
        <div className="max-w-7xl mx-auto p-6">{children}</div>
      </body>
    </html>
  )
}
