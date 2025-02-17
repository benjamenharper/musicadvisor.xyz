'use client'

import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  HomeIcon, 
  UserIcon, 
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

export default function UserSidebar() {
  const { session } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  if (!session) return null

  return (
    <aside className="bg-white dark:bg-gray-800 w-64 min-h-screen p-4">
      <nav className="space-y-1">
        <Link
          href="/admin"
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group"
        >
          <HomeIcon className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        <Link
          href="/admin/posts"
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group"
        >
          <DocumentTextIcon className="w-5 h-5 mr-3" />
          Posts
        </Link>

        <Link
          href="/admin/profile"
          className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group"
        >
          <UserIcon className="w-5 h-5 mr-3" />
          Profile
        </Link>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </nav>
    </aside>
  )
}
