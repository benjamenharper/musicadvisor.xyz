'use client'

import { useAuth } from '@/contexts/AuthContext'
import { BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function AdminHeader() {
  const { session } = useAuth()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center px-6">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <BellIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-right">
            <p className="font-medium text-gray-700 dark:text-gray-200">
              {session?.user?.email}
            </p>
            <p className="text-gray-500 dark:text-gray-400">Admin</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {session?.user?.email?.[0]?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
