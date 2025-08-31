// src/app/page.tsx
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Page() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to Zentra
        </h1>

        <p className="mt-3 text-2xl">
          Your open-source BI tool
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {user ? (
            <Link href="/dashboards" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Go to Dashboards &rarr;</h3>
              <p className="mt-4 text-xl">
                You are logged in.
              </p>
            </Link>
          ) : (
            <Link href="/sign-in" className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Sign In &rarr;</h3>
              <p className="mt-4 text-xl">
                Access your dashboards.
              </p>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}