import type { ApiPaginatedResponse } from "@/shared/api";
import type { User } from "./types";

export interface GetUsersParams {
  limit?: number;
  skip?: number;
  search?: string;
  signal?: AbortSignal;
}

export type GetUsersResponse = ApiPaginatedResponse<User, 'users'>

export interface UsersRepository {
  getUsers: (params: GetUsersParams) => Promise<GetUsersResponse>;
}

export const UsersRepository: UsersRepository = {
  getUsers: ({
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

    return fetch(url.toString(), { signal })
      .then((response) => response.json())
  }
}
