'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { StoreProvider } from '@/components/providers/StoreProvider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = useAuth()
  const router = useRouter()

  // Protect admin routes
  useEffect(() => {
    if (!session) {
      router.push('/auth?redirectTo=/admin')
    }
  }, [session, router])

  if (!session) {
    return null
  }

  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </StoreProvider>
  )
}
