import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Layout from './Layout'

describe('Layout', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Layout>Test content</Layout>
      </MemoryRouter>
    )

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <MemoryRouter>
        <Layout title="Test Page">Test content</Layout>
      </MemoryRouter>
    )

    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })

  it('renders children when not loading', () => {
    render(
      <MemoryRouter>
        <Layout>Child content</Layout>
      </MemoryRouter>
    )

    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('shows Skeleton when loading', () => {
    render(
      <MemoryRouter>
        <Layout loading>Child content</Layout>
      </MemoryRouter>
    )

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})
