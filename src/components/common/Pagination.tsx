interface Props {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, limit, total, onPageChange }: Props) => {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">

      {/* Showing info */}
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => page > 1 && onPageChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded border ${
            page === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded border ${
              p === page
                ? "bg-emerald-500 text-white border-emerald-500"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => page < totalPages && onPageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded border ${
            page === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
