import type { CartItem } from "../../types";

export const calculateTotal = (items: CartItem[]) => {
  return {
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0,
    ),
  };
};