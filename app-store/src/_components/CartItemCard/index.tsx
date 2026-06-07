import { memo, useCallback } from "react";
import { Link } from "react-router";
import { Plus, Minus, Trash2 } from "lucide-react";

import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import type { CartItem } from "../../types";
import { generateImageURL } from "../../lib/utils/generate-image-url";
import type { AppDispatch } from "../../store";
import {
  removeCartItemAsync,
  updateCartItemAsync,
} from "../../store/slices/cart-slice";
import { formatCurrency } from "../../utils";

interface CartItemCardProps {
  item: CartItem;
  quantity: number;
}

function CartItemCardPage({ item }: CartItemCardProps) {
  const { documentId, quantity, product } = item;
  const imageUrl = generateImageURL(product?.image?.url);
  const itemTotal = product?.price * quantity;
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = useCallback(async () => {
    await dispatch(removeCartItemAsync(documentId));
    toast.info(`${product.title} removido do carrinho`);
  }, [dispatch, documentId, product.title]);

  return (
    <div className="flex gap-4 bg-gray-800 rounded-xl p-4 shadow-sm">
      <Link to={`/products/${documentId}`} className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={product?.title}
          className="w-24 h-24 object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/100x100?text=Sem+Imagem";
          }}
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <Link
          to={`/products/${documentId}`}
          className="text-lg font-semibold text-pink-700 hover:text-primary transition-colors"
        >
          {product?.title}
        </Link>

        <span className="text-secondary text-sm">
          {formatCurrency(product?.price)} cada
        </span>

        <div className="flex items-center gap-4 mt-auto pt-2">
          <div className="flex items-center border border-muted rounded-lg">
            <button
              onClick={() =>
                dispatch(
                  updateCartItemAsync({
                    documentId: documentId,
                    quantity: quantity - 1,
                  }),
                )
              }
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() =>
                dispatch(
                  updateCartItemAsync({
                    documentId: documentId,
                    quantity: quantity + 1,
                  }),
                )
              }
              className="p-2 hover:bg-muted transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="p-2 text-destructive hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remover item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Item Total */}
      <div className="flex flex-col items-end justify-between">
        <span className="text-lg font-bold text-primary">
          {formatCurrency(itemTotal)}
        </span>
      </div>
    </div>
  );
}

export const CartItemCard = memo(CartItemCardPage, (prevProps, nextProps) => {
  return (
    prevProps.item?.documentId === nextProps.item?.documentId &&
    prevProps.quantity === nextProps.quantity
  );
});

export default CartItemCard;
