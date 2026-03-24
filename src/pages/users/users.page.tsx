import { UsersList } from '@/features/users-list'

import { PageLayout } from '@/shared/ui'

import { UsersPageProvider } from './users-page.provider'

export function UsersPage() {
  return (
    <UsersPageProvider>
      <PageLayout>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Users</h1>
        </div>
        <div className="flex-1 flex flex-col">
          <UsersList />
        </div>
      </PageLayout>
    </UsersPageProvider>
  )
}
