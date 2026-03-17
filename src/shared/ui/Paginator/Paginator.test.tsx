import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { Paginator } from '@/shared/ui/Paginator'

describe('Paginator', () => {
  test('should render current page information', () => {
    const { getByText } = render(
      <Paginator
        limit={10}
        skip={0}
        total={100}
        onPageChange={vi.fn()}
        showAllPages={false}
      />
    )

    expect(getByText('Showing 1-10 of 100 items')).toBeInTheDocument()
  })

  test('should render page buttons', () => {
    const onPageChange = vi.fn()
    const { container } = render(
      <Paginator
        limit={10}
        skip={0}
        total={100}
        onPageChange={onPageChange}
        showAllPages={false}
      />
    )

    const buttons = container.querySelectorAll('button[aria-label*="Page"]')
    expect(buttons.length).toBeGreaterThan(0)
  })

  test('should call onPageChange when page button is clicked', () => {
    const onPageChange = vi.fn()
    const { getByRole } = render(
      <Paginator
        limit={10}
        skip={0}
        total={100}
        onPageChange={onPageChange}
        showAllPages={false}
      />
    )

    const pageButton = getByRole('button', { name: 'Page 2' })
    fireEvent.click(pageButton)

    expect(onPageChange).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 10, limit: 10 })
    )
  })

  test('should disable previous button on first page', () => {
    const { getByRole } = render(
      <Paginator
        limit={10}
        skip={0}
        total={100}
        onPageChange={vi.fn()}
        showAllPages={false}
      />
    )

    const prevButton = getByRole('button', { name: /Previous/ })
    expect(prevButton).toBeDisabled()
  })

  test('should disable next button on last page', () => {
    const { getByRole } = render(
      <Paginator
        limit={10}
        skip={90}
        total={100}
        onPageChange={vi.fn()}
        showAllPages={false}
      />
    )

    const nextButton = getByRole('button', { name: /Next/ })
    expect(nextButton).toBeDisabled()
  })

  test('should show ellipsis for many pages', () => {
    const { getAllByText } = render(
      <Paginator
        limit={10}
        skip={40}
        total={100}
        onPageChange={vi.fn()}
        showAllPages={false}
      />
    )

    expect(getAllByText('...')).toHaveLength(2) // их должно быть 2
  })
})
