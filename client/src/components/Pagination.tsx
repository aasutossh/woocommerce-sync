interface PaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (newPage: number) => void
  onLimitChange: (newLimit: number) => void
}

export function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit)

  return (
    <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
      <div className="text-sm text-gray-600">
        Showing page <span className="font-medium">{page}</span> of{' '}
        <span className="font-medium">{totalPages || 1}</span>, total{' '}
        <span className="font-medium">{total}</span> items
      </div>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 bg-white border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 bg-white border rounded disabled:opacity-50"
        >
          Next
        </button>

        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="ml-4 border px-2 py-1 rounded text-sm"
        >
          {[12, 24, 60, 120].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
