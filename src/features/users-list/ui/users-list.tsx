import type { User as UserType } from '@/entities/user/model/types';
import { UserCard } from '@/entities/user';

export function UsersList({ usersList }: { usersList: UserType[] }) {

  return (
    <div className='grid grid-cols-5'>
      {Array.isArray(usersList) &&
        usersList.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
    </div>
  );
}
