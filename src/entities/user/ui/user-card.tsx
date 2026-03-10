import type { User } from '../model/types'

interface UserProps {
  user: User
}

const UserInfo = ({ label, value }: { label: string; value: string }) => (
  <p className="text-sm text-gray-600">
    <span className="font-medium text-gray-900">{label}:</span> {value}
  </p>
)

export function UserCard({ user }: UserProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 max-w bg-white shadow overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
          loading="lazy"
        />
        <h3 className="text-lg font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h3>
      </div>
      <div className="space-y-2">
        <UserInfo label="Email" value={user.email} />
        <UserInfo label="Age" value={user.age.toString()} />
        <UserInfo label="Phone" value={user.phone} />
        <UserInfo label="Username" value={user.username} />
        <UserInfo label="Role" value={user.role} />
        <UserInfo label="Company" value={user.company.name} />
        <UserInfo label="Position" value={user.company.title} />
      </div>
    </div>
  )
}
