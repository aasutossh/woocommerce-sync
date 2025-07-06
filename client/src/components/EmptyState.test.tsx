import { render, screen } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renders the provided title', () => {
    const testTitle = 'No results found'
    render(<EmptyState title={testTitle} />)

    expect(screen.getByText(testTitle)).toBeInTheDocument()
  })
})
