import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { CartItem, Product, ResponseCartItems } from "../../types";
import { logout } from "./auth_slice";
import { api } from "../../services/api";
import { calculateTotal } from "../../lib/utils/calculate-total";

const StatusCart = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
} as const;

type StatusCart = (typeof StatusCart)[keyof typeof StatusCart];

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
  status: StatusCart;
  error: string | null;
  processingItemIds: string[];
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  status: StatusCart.IDLE,
  error: null,
  processingItemIds: [],
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<ResponseCartItems>(
        "/cart-items?populate[product][populate][image]=*",
      );
      return data.data;
    } catch {
      return rejectWithValue("Não foi possível carregar o carrinho.");
    }
  },
);

export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async (
    { product, quantity = 1 }: { product: Product; quantity?: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { data: existing } = await api.get<ResponseCartItems>(
        `/cart-items?filters[product][documentId][$eq]=${product.documentId}&populate[product][populate][image]=*`,
      );
      const existingItem = existing.data[0] ?? null;

      if (existingItem) {
        await dispatch(
          updateCartItemAsync({
            documentId: existingItem.documentId,
            quantity: existingItem.quantity + quantity,
          }),
        );
        return null;
      }

      const { data } = await api.post("/cart-items", {
        data: {
          product: product.documentId,
          quantity,
        },
      });

      return { ...data.data, product } as CartItem;
    } catch (error) {
      console.error("=== ERRO === cart-slice", error);
      return rejectWithValue("Não foi possível adicionar o item ao carrinho.");
    }
  },
);
export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (documentId: string, { rejectWithValue }) => {
    try {
      console.log("delete", documentId);
      await api.delete(`/cart-items/${documentId}`);
      return documentId;
    } catch {
      return rejectWithValue("Não foi possível remover o item.");
    }
  },
);

export const updateCartItemAsync = createAsyncThunk(
  "cart/updateCartItemAsync",
  async (
    { documentId, quantity }: { documentId: string; quantity: number },
    { rejectWithValue },
  ) => {
    try {
      console.log("updateCartItemAsync", documentId);
      const { data } = await api.put(`/cart-items/${documentId}`, {
        data: { quantity },
      });
      return data.data as CartItem;
    } catch {
      return rejectWithValue("Não foi possível atualizar o item.");
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });

    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = StatusCart.LOADING;
      state.error = null;
    });

    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.status = StatusCart.SUCCEEDED;
      state.items = action.payload;
      const totals = calculateTotal(action.payload);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    });

    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.status = StatusCart.FAILED;
      state.items = [];
      state.error = action.payload as string;
    });

    builder.addCase(addCartItemAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.items.push(action.payload);
        const totals = calculateTotal(state.items);
        state.totalAmount = totals.totalAmount;
        state.totalQuantity = totals.totalQuantity;
      }
    });

    builder.addCase(updateCartItemAsync.pending, (state, action) => {
      state.processingItemIds.push(action.meta.arg.documentId);
    });

    builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg.documentId,
      );
      const index = state.items.findIndex(
        (item) => item.documentId === action.payload.documentId,
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
      const totals = calculateTotal(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    });
    builder.addCase(updateCartItemAsync.rejected, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg.documentId,
      );
    });

    builder.addCase(removeCartItemAsync.pending, (state, action) => {
      state.processingItemIds.push(action.meta.arg);
    });

    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.payload,
      );
      state.items = state.items.filter(
        (item) => item.documentId !== action.payload,
      );
      const totals = calculateTotal(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    });
    builder.addCase(removeCartItemAsync.rejected, (state, action) => {
      state.processingItemIds = state.processingItemIds.filter(
        (id) => id !== action.meta.arg,
      );
    });
  },
});

export const selectCart = (state: RootState) => state.cart;
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
