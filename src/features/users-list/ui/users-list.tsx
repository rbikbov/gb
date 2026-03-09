import type { User as UserType } from '@/entities/user/model/types';
import { UserCard } from '@/entities/user';
import { Paginator, Loader } from '@/shared/ui';
import { useEffect, useState } from 'react';
import type { ApiPaginatedResponse } from '@/shared/api';
import { useUsersListDesp } from '../deps';
import { useDebounced } from '@/shared/lib/hooks/useDebounced';

export function UsersList() {
  const { getUsers } = useUsersListDesp();

  const [usersResponse, setUsersResponse] = useState<ApiPaginatedResponse<UserType, 'users'> | null>(null);
  const [paginationState, setPaginationState] = useState({ skip: 0, limit: 10 });

  const [debouncedPagination] = useDebounced(paginationState, 1000);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getUsers({
          skip: debouncedPagination.skip,
          limit: debouncedPagination.limit,
          signal: abortController.signal,
        });

        setUsersResponse(response);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      abortController.abort();
    };
  }, [debouncedPagination, getUsers]);

  const handlePageChange = (newState: { skip: number; limit: number }) => {
    setPaginationState(newState);
  };

  if (error) {
    return (
      <div className='p-4 text-center'>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh]">
      {Array.isArray(usersResponse?.users) && usersResponse.users.length > 0 && (
        <div className='grid grid-cols-5'>
          {usersResponse.users.map((user) => (
            <div className='p-4' key={user.id}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}

      <div className='p-4'>
        <Paginator
          limit={paginationState.limit}
          skip={paginationState.skip}
          total={usersResponse?.total || 0}
          onPageChange={handlePageChange}
          showAllPages={true}
        />
      </div>

      <Loader isLoading={loading} size="lg" />
    </div>
  );
}
