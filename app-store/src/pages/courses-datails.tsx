import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, GraduationCap  } from "lucide-react";

import { api } from "../services/api";

import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/auth_slice";

import type { Courses } from "../types";

import { formatCurrency } from "../utils";

const url = "http://localhost:3001/api";

interface ResponseSingleCourse {
  data: Courses;
}
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useSelector(selectAuth);

  const { data, isLoading, isError } = useQuery<ResponseSingleCourse>({
    queryKey: ["product", id, isAuthenticated],
    queryFn: async () => {
      const { data } = await api.get(`${url}/courses/${id}`);
      return { data };
    },
    enabled: !!id,
  });

  const product = data?.data;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-32 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-xl" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-10 bg-muted rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-destructive mb-4">Produto não encontrado.</p>
        <Link to="/courses" className="text-primary hover:underline">
          Voltar aos cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar aos cursos
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-700 shadow-sm">
          <img
            src={product.imageURL}
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">
            {product?.name}
          </h1>

          <p className="text-secondary leading-relaxed mb-6">
            {product?.description}
          </p>

          <div className="text-3xl font-bold text-primary mb-8">
            {formatCurrency(product?.price)}
          </div>
         
         

          {/* Add to Cart Button */}
          {isAuthenticated ? (
            <button className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg">
              <GraduationCap  className="w-6 h-6" />
              Fazer inscrição
            </button>
          ) : (
            <p className="text-center text-secondary mt-4">
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>{" "}
              para para poder se inscrever
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
