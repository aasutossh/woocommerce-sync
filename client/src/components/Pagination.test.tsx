import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  const setup = (propsOverride = {}) => {
    const onPageChange = vi.fn()
    const onLimitChange = vi.fn()

    const props = {
      page: 1,
      limit: 12,
      total: 60,
      onPageChange,
      onLimitChange,
      ...propsOverride
    }

    render(<Pagination {...props} />)
    return { onPageChange, onLimitChange }
  }

  it('renders page info correctly', () => {
    setup()
    expect(screen.getByText(/Showing page/i)).toHaveTextContent(
      'Showing page 1 of 5, total 60 items'
    )
  })

  it('disables "Prev" button on first page', () => {
    setup({ page: 1 })
    expect(screen.getByText('Prev')).toBeDisabled()
  })

  it('disables "Next" button on last page', () => {
    setup({ page: 5, limit: 12, total: 60 })
    expect(screen.getByText('Next')).toBeDisabled()
  })

  it('calls onPageChange when "Next" is clicked', () => {
    const { onPageChange } = setup({ page: 2 })
    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange when "Prev" is clicked', () => {
    const { onPageChange } = setup({ page: 3 })
    fireEvent.click(screen.getByText('Prev'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onLimitChange when select changes', () => {
    const { onLimitChange } = setup({ limit: 12 })
    fireEvent.change(screen.getByDisplayValue('12 / page'), {
      target: { value: '60' }
    })
    expect(onLimitChange).toHaveBeenCalledWith(60)
  })
})
