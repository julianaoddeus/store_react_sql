import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, X } from "lucide-react";
import { api } from "../services/api";
import ProductCard from "../_components/ProductCard";
import type { ResponseProducts } from "../types";
import { useDebounce } from "../hooks/usedebounce";
import Pagination from "../_components/Pagination";
import { MINUTES_30 } from "../lib/constants/constants";

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const pageSize = 2;

  const debouncedSearch = useDebounce<string>(searchTerm, 500);

  const { data, isLoading, isError } = useQuery<ResponseProducts>({
    queryKey: ["products", page, debouncedSearch],
    queryFn: async () => {
      let url = `/products?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

      if (debouncedSearch) {
        url += `&filters[$or][0][title][$containsi]=${debouncedSearch}`;
        url += `&filters[$or][1][description][$containsi]=${debouncedSearch}`;
      }

      const { data } = await api.get(url);
      return data;
    },

    staleTime: MINUTES_30,
    placeholderData: (previousData) => previousData,
  });

  const products = data?.data;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-destructive">
          Erro ao carregar cursos. Tente novamente.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Cursos</h1>
        <p className="text-secondary">Explore nossa seleção de cursos</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar cursos..."
            className="w-full pl-10 pr-4 py-3 bg-transparent border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </div>

        {/* Category Filter Button */}
        <div className="relative">
          <button
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
              selectedCategory
                ? "border-primary bg-blue-50 text-primary"
                : "border-muted hover:border-primary"
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Clear Filters */}
        {searchTerm && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-3 text-destructive hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
            Limpar filtros
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-secondary mb-4">
        {products?.length} produto(s) encontrado(s)
      </p>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-6 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.documentId} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary text-lg">Nenhum produto encontrado.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-primary hover:underline"
          >
            Limpar filtros e ver todos
          </button>
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} meta={data?.meta} setPage={setPage} />
    </div>
  );
}

export default Products;
