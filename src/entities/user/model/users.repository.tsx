import type { ApiPaginatedResponse } from "@/shared/api";
import type { User } from "./types";

export interface GetUsersParams {
  limit?: number;
  skip?: number;
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
    signal,
  }: {
    limit?: number;
    skip?: number;
    signal?: AbortSignal;
  } = {}) => {
    const baseURL = 'https://dummyjson.com'
    const path = '/users'
    const url = new URL(baseURL + path)
    url.searchParams.append('limit', (limit || 10).toString())
    url.searchParams.append('skip', (skip || 0).toString())

    return fetch(url.toString(), { signal })
      .then((response) => response.json())
  }
}
