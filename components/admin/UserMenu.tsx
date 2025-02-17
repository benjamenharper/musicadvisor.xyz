'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '@/contexts/AuthContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import {
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function UserMenu() {
  const { session } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  if (!session?.user) return null

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex items-center max-w-xs rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
            {session.user.email}
          </div>

          <Menu.Item>
            {({ active }) => (
              <Link
                href="/admin"
                className={classNames(
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                )}
              >
                Dashboard
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <Link
                href="/admin/profile"
                className={classNames(
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                )}
              >
                Profile
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleSignOut}
                className={classNames(
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200'
                )}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
