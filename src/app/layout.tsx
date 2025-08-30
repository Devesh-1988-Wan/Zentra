import './globals.css'
import TopNav from '@/components/TopNav'

export const metadata = {
  title: 'Zentra Admin',
  description: 'Leadership dashboard auth pack',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  )
}
