import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Layout from 'components/Layout'

export default function DashboardPage() {
  const API_BASE = import.meta.env.VITE_API_BASE
  const [stats, setStats] = useState<{
    orders: number
    products: number
  } | null>(null)

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/stats`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        setStats(data)
        setError(null)
      })
      .catch((err) => {
        console.error('Error fetching orders:', err)
        setError(err.message || 'Failed to fetch stats')
      })
  }, [])

  return (
    <Layout title="Dashboard" loading={!stats && !error}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {error ? (
            <div className="p-4 rounded-2xl bg-red-100 text-red-700 border border-red-300">
              <strong>Error:</strong> {error}
            </div>
          ) : (
            <React.Fragment>
              <motion.div
                className="bg-white shadow rounded-2xl p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  {stats?.orders ?? '...'}
                </p>
              </motion.div>

              <motion.div
                className="bg-white shadow rounded-2xl p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats?.products ?? '...'}
                </p>
              </motion.div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Layout>
  )
}
