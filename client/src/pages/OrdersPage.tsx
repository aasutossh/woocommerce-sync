import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from 'components/Layout'
import { Pagination } from 'components/Pagination'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from '../hooks/useDebounce'
import { IOrder } from 'types/order'
import EmptyState from 'components/EmptyState'

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [status, setStatus] = useState('')
  const [sortBy, setSortBy] = useState<'date_created' | 'total'>('date_created')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const [productId, setProductId] = useState<string | null>(null)

  const fetchOrders = () => {
    const API_BASE = import.meta.env.VITE_API_BASE
    const params = new URLSearchParams({
      page: page.toString(),
      search: debouncedQuery,
      status,
      sortBy,
      sortOrder,
      limit: limit.toString()
    })
    if (productId) {
      params.set('product_id', productId)
    }

    fetch(`${API_BASE}/orders?${params.toString()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        setOrders(data.data)
        setTotal(data.total)
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching orders:', err)
        setError(err.message || 'Failed to fetch orders')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(fetchOrders, [
    debouncedQuery,
    status,
    sortBy,
    sortOrder,
    page,
    limit,
    productId
  ])

  useEffect(() => {
    const pid = searchParams.get('product_id')
    setProductId(pid)
    setPage(1)
  }, [searchParams])

  const handleSort = (field: 'date_created' | 'total') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <Layout title="Orders" loading={loading}>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>

        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded-xl w-full sm:w-64"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded-xl"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
          </select>
        </div>

        <div className="bg-white shadow overflow-auto max-h-[600px] border rounded-2xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left">Number</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2" onClick={() => handleSort('total')}>
                  Total{' '}
                  {sortBy === 'total' && (
                    <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2"
                  onClick={() => handleSort('date_created')}
                >
                  Date{' '}
                  {sortBy === 'date_created' && (
                    <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <motion.tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-4 py-2">{order.number}</td>
                  <td className="px-4 py-2">
                    {order.billing.first_name} {order.billing.last_name}
                  </td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">${order.total}</td>
                  <td className="px-4 py-2">
                    {new Date(order.date_created).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {!error && !orders.length && <EmptyState title="No order found" />}
          {error && (
            <div className="p-4 rounded-b-2xl rounded-t-none bg-red-100 text-red-700 border border-red-300">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {selectedOrder && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-2">
                Order #{selectedOrder.number}
              </h2>

              <div className="text-sm space-y-2">
                <p>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Total:</strong> ${selectedOrder.total}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(selectedOrder.date_created).toLocaleString()}
                </p>
                <p>
                  <strong>Customer:</strong> {selectedOrder.billing.first_name}{' '}
                  {selectedOrder.billing.last_name}
                </p>

                <div>
                  <strong>Line Items:</strong>
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    {selectedOrder.line_items.map((item, idx) => (
                      <li key={idx}>
                        {item.quantity} × {item.name} (${item.total})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Billing Address</h4>
                  <p>
                    {selectedOrder.billing.first_name}{' '}
                    {selectedOrder.billing.last_name}
                  </p>
                  <p>{selectedOrder.billing.address_1}</p>
                  {selectedOrder.billing.address_2 && (
                    <p>{selectedOrder.billing.address_2}</p>
                  )}

                  {selectedOrder.billing.company && (
                    <p>{selectedOrder.billing.company}</p>
                  )}
                  <p>
                    {selectedOrder.shipping.city &&
                      `${selectedOrder.shipping.city},`}{' '}
                    {selectedOrder.billing.state}{' '}
                    {selectedOrder.billing.postcode}
                  </p>
                  <p>{selectedOrder.billing.country}</p>
                  <p>{selectedOrder.billing.email}</p>
                  <p>{selectedOrder.billing.phone}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Shipping Address</h4>
                  <p>
                    {selectedOrder.shipping.first_name}{' '}
                    {selectedOrder.shipping.last_name}
                  </p>
                  <p>{selectedOrder.shipping.address_1}</p>
                  {selectedOrder.shipping.address_2 && (
                    <p>{selectedOrder.shipping.address_2}</p>
                  )}

                  {selectedOrder.shipping.company && (
                    <p>{selectedOrder.shipping.company}</p>
                  )}
                  <p>
                    {selectedOrder.shipping.city &&
                      `${selectedOrder.shipping.city},`}{' '}
                    {selectedOrder.shipping.state}{' '}
                    {selectedOrder.shipping.postcode}
                  </p>
                  <p>{selectedOrder.shipping.country}</p>
                </div>
              </div>
            </div>
          </motion.div>
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
