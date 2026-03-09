import type { User } from '../model/types'

interface UserProps {
  user: User
}

export function UserCard({ user }: UserProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w-md bg-white shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h3>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600 min-h-10">
          <span className="font-medium text-gray-900">Email:</span> {user.email}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">Phone:</span> {user.phone}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">Age:</span> {user.age}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">Role:</span> {user.role}
        </p>
        <p className="text-sm text-gray-600 min-h-10">
          <span className="font-medium text-gray-900">Company:</span> {user.company.name}
        </p>
        <p className="text-sm text-gray-600 min-h-10">
          <span className="font-medium text-gray-900">Position:</span> {user.company.title}
        </p>
      </div>
    </div>
  )
}
