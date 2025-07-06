import { ReactNode, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  title?: string
  loading?: boolean
}

export default function Layout({ children, title, loading = false }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen flex bg-gray-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
    fixed sm:static z-50 sm:z-auto top-0 left-0 h-screen w-64 bg-white border-r shadow-sm
    transform transition-transform duration-200 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
    flex flex-col
  `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-xl font-bold">Woo Sync</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="sm:hidden text-gray-500"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem to="/" label="Dashboard" />
          <NavItem to="/orders" label="Orders" />
          <NavItem to="/products" label="Products" />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow px-6 py-4 text-lg font-semibold sticky top-0 z-10 flex gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden text-gray-600"
          >
            ☰
          </button>
          {title}
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <Skeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition ${
          isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse" data-testid="skeleton">
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
    </div>
  )
}
