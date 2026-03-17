import { createStrictContext, useStrictContext } from '@/shared/lib/react'

import type { UsersRepository } from '@/entities/user'

type UsersListDeps = {
  getUsers: UsersRepository['getUsers']
}

export const usersListDepsContext = createStrictContext<UsersListDeps>()

export const useUsersListDesp = () => useStrictContext(usersListDepsContext)
