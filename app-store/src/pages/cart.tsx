import { useCallback, useEffect } from "react";

import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  fetchCartItems,
  removeCartItemAsync,
  selectCart,
} from "../store/slices/cart-slice";
import type { AppDispatch } from "../store";

import { calculateTotal } from "../lib/utils/calculate-total";
import { formatCurrency } from "../utils";
import CartItemCard from "../_components/CartItemCard";
import { addCourseAsync } from "../store/slices/course-slice";
import type { CartItem, Course } from "../types";

export function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector(selectCart);
  const { totalAmount } = calculateTotal(items);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    if (items.length === 0) return;

    dispatch(clearCart());
    toast.success("Carrinho limpo com sucesso!");
  }, [dispatch, items.length]);

  const mapCartItemToCourse = (item: CartItem): Partial<Course> => {
    const now = new Date();

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 12);

    return {
      progress: 0,
      inicialDate: now,
      durationInMonths: 12,
      expiresAt,
      documentId: item.product.documentId,
      product: item.product,
    };
  };

  const handleCheckout = useCallback(async () => {
    if (items.length === 0) {
      toast.warn("Seu carrinho está vazio!");
      return;
    }

    try {
      await Promise.all(
        items.map((item) =>
          dispatch(addCourseAsync(mapCartItemToCourse(item))).unwrap(),
        ),
      );

      setTimeout(async () => {
        await Promise.all(
          items.map((item) => dispatch(removeCartItemAsync(item.documentId))),
        );
      }, 5000);

      toast.success("Compra realizada com sucesso!");
    } catch (error) {
      console.error("====ERRO ==== cart page", error);
      toast.error("Erro ao finalizar compra. Tente novamente.");
    }
  }, [dispatch, items]);

  // Carrinho vazio
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-600 mb-2">
            Seu carrinho está vazio
          </h1>
          <p className="text-secondary mb-6">
            Explore nossos cursos e adicione ao seu carrinho.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 border-2 border-pink-400 text-pink-400 rounded-lg font-medium hover:text-pink-500 hover:border-pink-500 hover:bg-opacity-10  transition-colors"
          >
            Ver cursos disponíeis
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Carrinho</h1>
          <p className="text-secondary mt-1">
            {items.length} {items.length === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
          Limpar carrinho
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemCard
              key={item.documentId}
              item={item}
              quantity={item?.quantity}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-pink-700 mb-6">
              Resumo do Pedido
            </h2>

            {/* Items Summary */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div
                  key={item?.documentId}
                  className="flex justify-between text-sm"
                >
                  <span className="text-secondary">
                    {item?.product?.title} x{item.quantity}
                  </span>
                  <span className="text-foreground">
                    {formatCurrency(item?.product?.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-muted pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary">
                  R$ {totalAmount}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              Finalizar Compra
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/products"
              className="block text-center text-primary hover:underline mt-4"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
