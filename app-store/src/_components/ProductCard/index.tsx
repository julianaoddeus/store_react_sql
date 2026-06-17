import { memo } from "react";
import { Link } from "react-router";
import type { Product } from "../../types";

import { formatCurrency } from "../../utils";

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {


  return (
    <div className="bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <Link
        to={`/products/${product.id}`}
        className="block relative aspect-square overflow-hidden"
      >
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "NOT FOUND";
          }}
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-pink-700 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-secondary text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
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
