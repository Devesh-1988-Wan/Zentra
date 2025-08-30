import './globals.css'
import React from 'react'

export const metadata = { title: 'Zentra Dashboard', description: 'Leadership dashboards' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
