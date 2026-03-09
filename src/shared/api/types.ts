export type ApiPaginatedResponse<T, K extends string = 'data'> = {
  [key in K]: T[]
} & {
  total: number
  skip: number
  limit: number
}

export interface PaginationParams {
  skip?: number
  limit?: number
}
