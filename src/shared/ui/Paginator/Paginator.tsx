import type { PaginatorProps } from './types'

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export function Paginator({
  limit,
  skip,
  total,
  onPageChange,
  showAllPages = false,
  className = '',
}: PaginatorProps) {
  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange({
        skip: skip - limit,
        limit,
        oldPage: currentPage,
        newPage: currentPage - 1
      })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange( {
        skip: skip + limit,
        limit,
        oldPage: currentPage,
        newPage: currentPage + 1
      })
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange({
      skip: (page - 1) * limit,
      limit,
      oldPage: currentPage,
      newPage: page
    })
  }

  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7 || showAllPages) {
      // If there are few pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show the first page
      pages.push(1)

      // Add "..." if current page is further than 3
      if (currentPage > 3) {
        pages.push('...')
      }

      // Show range around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i)
        }
      }

      // Add "..." if current page is far from the end
      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show the last page
      pages.push(totalPages)

      // Remove duplicates only for numbers, keep "..."
      const uniquePages: (number | string)[] = []
      const seen = new Set<number | string>()

      for (const page of pages) {
        if (page === '...' || !seen.has(page)) {
          uniquePages.push(page)
          seen.add(page)
        }
      }

      return uniquePages
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-gray-200">
        Показано {skip + 1}-{Math.min(skip + limit, total)} из {total} записей
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex space-x-1">
          {getVisiblePages().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm font-medium text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageClick(page as number)}
                className={`px-3 py-2 text-sm font-medium rounded-md cursor-pointer disabled:cursor-not-allowed ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}
