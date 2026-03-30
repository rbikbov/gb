import { UsersList } from '@/features/users-list'

import { PageLayout } from '@/shared/ui'

import { UsersPageProvider } from './users-page.provider'

export function UsersPage() {
  return (
    <UsersPageProvider>
      <PageLayout>
        <header>
          <h1 className="text-4xl font-bold mb-8 text-center">Users</h1>
        </header>
        <section aria-labelledby="users-list-heading" className="flex-1 flex flex-col">
          <h2 id="users-list-heading" className="sr-only">Users List</h2>
          <div className="flex-1 flex flex-col">
            <UsersList />
          </div>
        </section>
      </PageLayout>
    </UsersPageProvider>
  )
}
