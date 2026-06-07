import { ChevronLeft, ChevronRight } from "lucide-react";

interface IPagination {
  page: number;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({ page, meta, setPage }: IPagination) => {
  return (
    <>
      {meta?.pagination && meta?.pagination.pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg border border-muted hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(meta?.pagination.pageCount)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-lg border transition-colors ${
                page === i + 1
                  ? "border-primary bg-primary text-white"
                  : "border-muted hover:border-primary"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === meta?.pagination.pageCount}
            className="p-2 rounded-lg border border-muted hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
