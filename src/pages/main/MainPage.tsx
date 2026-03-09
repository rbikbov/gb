import { Counter } from '@/features/counter'

function MainPage() {
  return (
    <div className="container min-h-screen mx-auto py-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Users list</h1>
        <div className="rounded-lg p-8">
          <Counter />
          <p className="mt-4 text-sm text-gray-600">
            Edit <code className="px-1 rounded">src/pages/main/MainPage.tsx</code> and save to test HMR
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainPage
