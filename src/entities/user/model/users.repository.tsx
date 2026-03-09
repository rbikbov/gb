export const UsersRepository = {
  getUsers: ({
    limit = 10,
    skip = 0,
  }: {
    limit?: number;
    skip?: number;
  } = {}) => {
    const baseURL = 'https://dummyjson.com'
    const path = '/users'
    const url = new URL(baseURL + path)
    url.searchParams.append('limit', (limit || 10).toString())
    url.searchParams.append('skip', (skip || 0).toString())

    return fetch(url.toString())
      .then((response) => response.json())
      .then((data) => data)
  }
}
