import './globals.css';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Zentra Dashboard', description: 'Leadership dashboard for AMLA' };

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <nav className="container flex items-center justify-between py-3">
            <Link href="/" className="font-semibold text-primary-700">Zentra</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/admin" className="hover:underline">Admin</Link>
            </div>
          </nav>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
