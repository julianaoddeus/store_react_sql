import { useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react";

import { toast } from "react-toastify";
import { api } from "../services/api";

import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/auth_slice";
import { useAppDispatch } from "../store";
import { addCartItemAsync } from "../store/slices/cart-slice";
import type { Product } from "../types";
import { generateImageURL } from "../lib/utils/generate-image-url";
import { formatCurrency } from "../utils";

interface ResponseSingleProduct {
  data: Product;
}

export function ProductDetailPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const { isAuthenticated } = useSelector(selectAuth);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useQuery<ResponseSingleProduct>({
    queryKey: ["product", documentId, isAuthenticated],
    queryFn: async () => {
      const { data } = await api.get(
        `/products/${documentId}?populate=image&fields=*`,
      );
      return data;
    },
    enabled: !!documentId,
  });

  const product = data?.data;
  const imageURL = generateImageURL(product?.image?.url);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    if (!isAuthenticated) {
      toast.warn("Faça login para adicionar ao carrinho!");
      return navigate("/login");
    }

    dispatch(addCartItemAsync({ product, quantity }));
    toast.success(`${quantity} - ${product.title} adicionado(s) ao carrinho!`);
  }, [dispatch, product, quantity, isAuthenticated, navigate]);

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
        <Link to="/products" className="text-primary hover:underline">
          Voltar aos cursos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-secondary hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar aos cursos
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-700 shadow-sm">
          <img
            src={imageURL}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">
            {product?.title}
          </h1>

          <p className="text-secondary leading-relaxed mb-6">
            {product?.description}
          </p>

          <div className="text-3xl font-bold text-primary mb-8">
            {formatCurrency(product?.price)}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-foreground font-medium">Quantidade:</span>
            <div className="flex items-center border border-muted rounded-lg">
              <button
                onClick={decrementQuantity}
                className="p-3 hover:bg-muted transition-colors"
                aria-label="Diminuir quantidade"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="px-6 py-3 font-semibold text-lg">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-3 hover:bg-muted transition-colors"
                aria-label="Aumentar quantidade"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Total:</span>
              <span className="text-2xl font-bold text-foreground">
                {formatCurrency(product?.price * quantity)}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          {isAuthenticated ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              Adicionar ao Carrinho
            </button>
          ) : (
            <p className="text-center text-secondary mt-4">
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>{" "}
              para adicionar ao carrinho
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
