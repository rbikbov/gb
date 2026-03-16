import { UsersResponseDtoSchema } from '@/shared/api';
import { mapUserDtoToModel } from './users.mapper';
import type { UsersResponse } from './types';

export interface GetUsersParams {
  limit?: number;
  skip?: number;
  search?: string;
  signal?: AbortSignal;
}

export interface UsersRepository {
  getUsers: (params: GetUsersParams) => Promise<UsersResponse>;
}

export const UsersRepository: UsersRepository = {
  getUsers: async ({
    limit = 10,
    skip = 0,
    search,
    signal,
  }: {
    limit?: number;
    skip?: number;
    search?: string;
    signal?: AbortSignal;
  } = {}) => {
    const baseURL = 'https://dummyjson.com'
    const path = search ? '/users/search' : '/users'
    const url = new URL(baseURL + path)
    url.searchParams.append('limit', (limit || 10).toString())
    url.searchParams.append('skip', (skip || 0).toString())

    if (search) {
      url.searchParams.append('q', search)
    }

    const response = await fetch(url.toString(), { signal })
    const rawData = await response.json();

    const result = UsersResponseDtoSchema.safeParse(rawData);

    if (!result.success) {
      // e.g. log to sentry
      throw new Error('Data validation failed');
    }

    return {
      users: result.data.users.map(mapUserDtoToModel),
      total: result.data.total,
      skip: result.data.skip,
      limit: result.data.limit,
    }
  }
}
