import './globals.css';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = { title: 'Zentra Advanced Dashboard', description: 'Powerful BI-like dashboard' };

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en"><body>
      <header className="border-b">
        <nav className="container flex items-center justify-between py-3">
          <Link href="/" className="font-semibold text-primary-500">Zentra</Link>
          <div className="space-x-4 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/gallery" className="hover:underline">Visual Gallery</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </div>
        </nav>
      </header>
      <main className="container py-6">{children}</main>
    </body></html>
  );
}
