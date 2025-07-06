import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { IProductWithOrderCount } from 'types/product'

interface ProductCardProps {
  product: IProductWithOrderCount
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      data-testid="product-card"
      className="bg-white rounded-2xl shadow p-4 flex gap-4 items-start"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src={product.images?.[0]?.src ?? ''}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-xl"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
        <p className="text-sm mt-1">
          Price:{' '}
          <span className="font-bold text-blue-600">${product.price}</span>
        </p>
        <button
          onClick={() => navigate(`/orders?product_id=${product.id}`)}
          className="mt-2 text-sm text-green-600 hover:underline"
        >
          {product.orderCount} Orders
        </button>

        <div>
          <a
            href={product.permalink}
            className="mt-2 text-sm text-green-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </div>
      </div>
    </motion.div>
  )
}
