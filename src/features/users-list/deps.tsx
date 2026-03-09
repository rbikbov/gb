import { createStrictContext, useStrictContext } from "@/shared/lib/react";

type UsersListDeps = {
};

export const usersListDepsContext = createStrictContext<UsersListDeps>();

export const useUsersListDesp = () => useStrictContext(usersListDepsContext);
