
import '@/styles/amla-theme.css'
import TopNav from '@/components/TopNav'

export const metadata = { title: 'Zentra • AMLA', description: 'AMLA-themed leadership dashboard' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main className="content">{children}</main>
      </body>
    </html>
  )
}
