import { usersListDepsContext } from "@/features/users-list";

export const UsersPageProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <usersListDepsContext.Provider
      value={{
      }}
    >
      {children}
    </usersListDepsContext.Provider>
  );
};
