import { UsersList } from "@/features/users-list"
import { UsersPageProvider } from './users-page.provider';
import { PageLayout } from '@/shared/ui';

export function UsersPage() {

  return (
    <UsersPageProvider>
      <PageLayout>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Users</h1>
        </div>
        <div className="pb-4">
          <UsersList />
        </div>
      </PageLayout>
    </UsersPageProvider>
  )
}
