import type { User } from '@/entities/user/model/types';

interface UsersTableProps {
  users: User[];
}

const TableCell = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 whitespace-nowrap text-sm text-gray-900 ${className}`}>
    {children}
  </td>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
    {children}
  </th>
);

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className='overflow-x-auto rounded-lg shadow-sm border border-gray-200'>
      <table className='w-full bg-white'>
        <thead>
          <tr className='border-b border-gray-200'>
            <TableHeader>Avatar</TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>City</TableHeader>
            <TableHeader>Role</TableHeader>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {users.map((user) => (
            <tr key={user.id} className='hover:bg-gray-50 transition-colors duration-150'>
              <TableCell>
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  loading="lazy"
                />
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company?.name}</TableCell>
              <TableCell>{user.address?.city}</TableCell>
              <TableCell>{user.role}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
