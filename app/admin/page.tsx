'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function AdminDashboard() {
  const { session } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Welcome</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {session?.user?.email}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Posts</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  )
}
