import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ShoppingCart, Plus } from "lucide-react";

import type { Product } from "../../types";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/slices/auth_slice";
import { useAppDispatch } from "../../store";
import { toast } from "react-toastify";
import { addCartItemAsync } from "../../store/slices/cart-slice";
import { generateImageURL } from "../../lib/utils/generate-image-url";
import { formatCurrency } from "../../utils";

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {
  const { isAuthenticated } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity] = useState(1);

  const imageURL = generateImageURL(product?.image?.url);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;

    if (!isAuthenticated) {
      toast.warn("Faça login para adicionar ao carrinho!");
      return navigate("/login");
    }

    await dispatch(addCartItemAsync({ product, quantity })).unwrap();
    toast.success(`${quantity} - ${product.title} adicionado(s) ao carrinho!`);
  }, [dispatch, product, quantity, isAuthenticated, navigate]);

  return (
    <div className="bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <Link
        to={`/products/${product.documentId}`}
        className="block relative aspect-square overflow-hidden"
      >
        <img
          src={imageURL}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "NOT FOUND";
          }}
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.documentId}`}>
          <h3 className="text-lg font-semibold text-pink-700 hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="text-secondary text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label={`Adicionar ${product.title} ao carrinho`}
          >
            <ShoppingCart className="w-4 h-4" />
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export const ProductCard = memo(
  ProductCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.price === nextProps.product.price
    );
  },
);

export default ProductCard;
