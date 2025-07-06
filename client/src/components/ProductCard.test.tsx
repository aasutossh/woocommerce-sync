import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from './ProductCard'
import { IProductWithOrderCount } from 'types/product'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  }
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockProduct: IProductWithOrderCount = {
    id: 1,
    name: 'Test Product',
    slug: 'test-product',
    permalink: 'https://example.com/product/test-product',
    date_created: '2024-01-01T00:00:00.000Z',
    date_modified: '2024-01-01T00:00:00.000Z',
    price: '29.99',
    regular_price: '29.99',
    sale_price: '',
    sku: 'TEST-SKU-123',
    stock_quantity: 10,
    stock_status: 'instock',
    description: 'Test product description',
    short_description: 'Short description',
    categories: [{ id: 1, name: 'Test Category' }],
    tags: [{ id: 1, name: 'Test Tag' }],
    images: [
      {
        id: 1,
        src: 'https://example.com/image1.jpg',
        alt: 'Test Product Image'
      }
    ],
    orderCount: 5
  }

  it('renders product information correctly', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('SKU: TEST-SKU-123')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('5 Orders')).toBeInTheDocument()
    expect(screen.getByText('Source')).toBeInTheDocument()
  })

  it('renders product image with correct attributes', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg')
    expect(image).toHaveClass('w-20', 'h-20', 'object-cover', 'rounded-xl')
  })

  it('navigates to orders page when orders button is clicked', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const ordersButton = screen.getByText('5 Orders')
    fireEvent.click(ordersButton)

    expect(mockNavigate).toHaveBeenCalledWith('/orders?product_id=1')
  })

  it('renders source link with correct attributes', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const sourceLink = screen.getByText('Source')
    expect(sourceLink).toBeInTheDocument()
    expect(sourceLink).toHaveAttribute(
      'href',
      'https://example.com/product/test-product'
    )
    expect(sourceLink).toHaveAttribute('target', '_blank')
    expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('handles product with no images gracefully', () => {
    const productWithoutImages: IProductWithOrderCount = {
      ...mockProduct,
      images: []
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithoutImages} />
      </TestWrapper>
    )

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '')
  })

  it('handles product with undefined images gracefully', () => {
    const productWithUndefinedImages: IProductWithOrderCount = {
      ...mockProduct,
      images: undefined as any
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithUndefinedImages} />
      </TestWrapper>
    )

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '')
  })

  it('handles zero order count', () => {
    const productWithZeroOrders: IProductWithOrderCount = {
      ...mockProduct,
      orderCount: 0
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithZeroOrders} />
      </TestWrapper>
    )

    expect(screen.getByText('0 Orders')).toBeInTheDocument()
  })

  it('handles high order count', () => {
    const productWithHighOrders: IProductWithOrderCount = {
      ...mockProduct,
      orderCount: 9999
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithHighOrders} />
      </TestWrapper>
    )

    expect(screen.getByText('9999 Orders')).toBeInTheDocument()
  })

  it('handles price formatting correctly', () => {
    const productWithDecimalPrice: IProductWithOrderCount = {
      ...mockProduct,
      price: '0.99'
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithDecimalPrice} />
      </TestWrapper>
    )

    expect(screen.getByText('$0.99')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const cardContainer = screen.getByTestId('product-card')
    expect(cardContainer).toHaveClass(
      'bg-white',
      'rounded-2xl',
      'shadow',
      'p-4',
      'flex',
      'gap-4',
      'items-start'
    )
  })

  it('renders price with correct styling', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const priceElement = screen.getByText('$29.99')
    expect(priceElement).toHaveClass('font-bold', 'text-blue-600')
  })

  it('renders orders button with correct styling', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const ordersButton = screen.getByText('5 Orders')
    expect(ordersButton).toHaveClass(
      'mt-2',
      'text-sm',
      'text-green-600',
      'hover:underline'
    )
  })

  it('renders source link with correct styling', () => {
    render(
      <TestWrapper>
        <ProductCard product={mockProduct} />
      </TestWrapper>
    )

    const sourceLink = screen.getByText('Source')
    expect(sourceLink).toHaveClass(
      'mt-2',
      'text-sm',
      'text-green-600',
      'hover:underline'
    )
  })

  it('handles products with multiple images (uses first image)', () => {
    const productWithMultipleImages: IProductWithOrderCount = {
      ...mockProduct,
      images: [
        { id: 1, src: 'https://example.com/image1.jpg', alt: 'First Image' },
        { id: 2, src: 'https://example.com/image2.jpg', alt: 'Second Image' }
      ]
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithMultipleImages} />
      </TestWrapper>
    )

    const image = screen.getByAltText('Test Product')
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg')
  })

  it('handles long product names', () => {
    const productWithLongName: IProductWithOrderCount = {
      ...mockProduct,
      name: 'This is a very long product name that might wrap to multiple lines in the UI'
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithLongName} />
      </TestWrapper>
    )

    expect(
      screen.getByText(
        'This is a very long product name that might wrap to multiple lines in the UI'
      )
    ).toBeInTheDocument()
  })

  it('handles special characters in product data', () => {
    const productWithSpecialChars: IProductWithOrderCount = {
      ...mockProduct,
      name: 'Product with "quotes" & symbols',
      sku: 'SKU-123!@#'
    }

    render(
      <TestWrapper>
        <ProductCard product={productWithSpecialChars} />
      </TestWrapper>
    )

    expect(
      screen.getByText('Product with "quotes" & symbols')
    ).toBeInTheDocument()
    expect(screen.getByText('SKU: SKU-123!@#')).toBeInTheDocument()
  })

  it('handles out of stock products', () => {
    const outOfStockProduct: IProductWithOrderCount = {
      ...mockProduct,
      stock_status: 'outofstock',
      stock_quantity: 0
    }

    render(
      <TestWrapper>
        <ProductCard product={outOfStockProduct} />
      </TestWrapper>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    // Component renders regardless of stock status
  })
})
