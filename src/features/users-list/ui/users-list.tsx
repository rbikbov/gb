import type { User as UserType } from '@/entities/user/model/types';
import { UserCard } from '@/entities/user';
import { Paginator, Loader, SearchInput } from '@/shared/ui';
import { useEffect, useState } from 'react';
import type { ApiPaginatedResponse } from '@/shared/api';
import { useUsersListDesp } from '../deps';
import { useDebounced } from '@/shared/lib/hooks/useDebounced';
import { useUrlQuery } from '@/shared/lib/hooks/useUrlQuery';

export function UsersList() {
  const { getUsers } = useUsersListDesp();
  const { queryParams, syncWithState } = useUrlQuery();

  const [usersResponse, setUsersResponse] = useState<ApiPaginatedResponse<UserType, 'users'> | null>(null);
  
  // Initialize state from URL parameters
  const [paginationState, setPaginationState] = useState(() => {
    const limit = queryParams.limit || 10;
    const skip = queryParams.page ? (queryParams.page - 1) * limit : 0;
    return { skip, limit };
  });
  
  const [searchQuery, setSearchQuery] = useState(() => queryParams.search || '');

  const [debouncedPagination] = useDebounced(paginationState, 1000);
  const [debouncedSearch] = useDebounced(searchQuery, 1000);

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
          search: debouncedSearch,
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
  }, [debouncedPagination, debouncedSearch, getUsers]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPaginationState((prev) => ({ ...prev, skip: 0 }));
  };

  const handlePageChange = (newState: { skip: number; limit: number }) => {
    setPaginationState(newState);
  };

  // Sync state with URL when it changes
  useEffect(() => {
    syncWithState({
      skip: paginationState.skip,
      limit: paginationState.limit,
      search: searchQuery
    });
  }, [paginationState, searchQuery, syncWithState]);

  if (error) {
    return (
      <div className='p-4 text-center'>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  const searchNoData = debouncedSearch && !loading && !usersResponse?.users?.length;

  const hasData = Array.isArray(usersResponse?.users) && usersResponse.users.length > 0;

  return (
    <div className="relative min-h-[80vh]">
      <div className='py-4 sticky top-0 z-10 bg-neutral-800'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <SearchInput 
            className="col-span-full xl:col-span-1"
            value={searchQuery} 
            onChange={handleSearchChange} 
          />

          <Paginator
            className="col-span-full xl:col-span-3"
            limit={paginationState.limit}
            skip={paginationState.skip}
            total={usersResponse?.total || 0}
            onPageChange={handlePageChange}
            showAllPages={false}
          />
        </div>
      </div>

      {searchNoData && (
        <div className='p-4 text-center'>
          <p className="text-white-500">No data</p>
        </div>
      )}

      {hasData && (
        <div className='mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch'>
          {usersResponse.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

      <Loader isLoading={loading} size="lg" />
    </div>
  );
}
