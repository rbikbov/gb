import { usersListDepsContext } from "@/features/users-list";
import { UsersRepository } from "@/entities/user/model/users.repository";

export const UsersPageProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <usersListDepsContext.Provider
      value={{
        getUsers: UsersRepository.getUsers,
      }}
    >
      {children}
    </usersListDepsContext.Provider>
  );
};
