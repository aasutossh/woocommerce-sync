import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from 'pages/DashboardPage'
import OrdersPage from 'pages/OrdersPage'
import ProductsPage from 'pages/ProductsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
