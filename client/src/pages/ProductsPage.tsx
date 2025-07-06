import { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { Pagination } from 'components/Pagination'
import { useDebounce } from '../hooks/useDebounce'
import { IProductWithOrderCount } from 'types/product'
import ProductCard from 'components/ProductCard'
import EmptyState from 'components/EmptyState'

export default function ProductsPage() {
  const API_BASE = import.meta.env.VITE_API_BASE
  const [products, setProducts] = useState<IProductWithOrderCount[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = () => {
    const params = new URLSearchParams({
      page: page.toString(),
      search: debouncedQuery,
      sortBy,
      sortOrder,
      limit: limit.toString()
    })
    fetch(`${API_BASE}/products?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        setProducts(data.data)
        setTotal(data.total)
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setError(err.message || 'Failed to fetch products')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(fetchProducts, [debouncedQuery, sortBy, sortOrder, page])

  return (
    <Layout title="Products" loading={loading}>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search name or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded-xl w-full sm:w-64"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!products.length && !error && <EmptyState title="No product found" />}

        {error && (
          <div className="p-4 rounded-2xl bg-red-100 text-red-700 border border-red-300">
            <strong>Error:</strong> {error}
          </div>
        )}

        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={(newPage) => setPage(newPage)}
          onLimitChange={(newLimit) => {
            setLimit(newLimit)
            setPage(1)
          }}
        />
      </div>
    </Layout>
  )
}
