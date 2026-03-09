import { createStrictContext, useStrictContext } from "@/shared/lib/react";
import type { UsersRepository } from "@/entities/user/model/users.repository";

type UsersListDeps = {
  getUsers: UsersRepository['getUsers'];
};

export const usersListDepsContext = createStrictContext<UsersListDeps>();

export const useUsersListDesp = () => useStrictContext(usersListDepsContext);
