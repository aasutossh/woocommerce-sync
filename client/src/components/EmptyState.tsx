import { motion } from 'framer-motion'

export default function EmptyState({ title }: { title: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-lg">{title}</p>
    </motion.div>
  )
}
