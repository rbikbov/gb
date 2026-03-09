import { useEffect, useState } from 'react';
import type { ApiPaginatedResponse } from '@/shared/api';
import { UsersList } from "@/features/users-list/ui/users-list"
import { UsersRepository } from '@/entities/user/model/users.repository';
import type { User as UserType } from '@/entities/user/model/types';
import { UsersPageProvider } from './users-page.provider';
import { PageLayout } from '@/shared/ui/layouts/PageLayout';

export function UsersPage() {
  const [usersResponse, setUsersResponse] = useState<ApiPaginatedResponse<UserType, 'users'> | null>(null);

  useEffect(() => {
    console.log('Load users');
    UsersRepository.getUsers().then((response) => {
      setUsersResponse(response);
    });
  }, []);

  return (
    <UsersPageProvider>
      <PageLayout>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Users list</h1>
        </div>
        <div>
          {Array.isArray(usersResponse?.users) && <UsersList usersList={usersResponse.users} />}
        </div>
      </PageLayout>
    </UsersPageProvider>
  )
}
