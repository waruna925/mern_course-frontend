import { Link } from "react-router-dom";

export default function Card({ product }) {
  const hasDiscount = product.labelledPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
    : 0;

  const stockLabel =
    !product.isAvailable || product.stock === 0
      ? "Out of stock"
      : product.stock <= 5
        ? `Low stock · ${product.stock} left`
        : `In stock · ${product.stock} left`;

  const stockColor =
    !product.isAvailable || product.stock === 0
      ? "#E24B4A"
      : product.stock <= 5
        ? "#EF9F27"
        : "#1D9E75";

  return (
    <Link to={"/product/"+product.productId} className="group w-64 rounded-2xl overflow-hidden border border-gray-100 bg-white hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer">

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FAECE7] text-[#993C1D]">
            Sale
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {product.altNames?.[0] && (
          <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400 mb-1">
            {product.altNames[0]}
          </p>
        )}

        <h2 className="font-serif text-lg leading-snug text-gray-900 mb-1.5">
          {product.name}
        </h2>

        <p className="text-[13px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-medium text-gray-900">${product.price}</span>
          {hasDiscount && (
            <>
              <span className="text-sm text-gray-400 line-through">${product.labelledPrice}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E1F5EE] text-[#0F6E56]">
                {discountPct}% off
              </span>
            </>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: stockColor }} />
          <span className="text-xs text-gray-400">{stockLabel}</span>
        </div>

        {/* CTA */}
        <button
          disabled={!product.isAvailable || product.stock === 0}
          className="w-full py-2.5 rounded-xl text-[13px] font-medium tracking-wide
            bg-[#2C2C2A] text-[#F1EFE8] hover:bg-[#444441] active:scale-[0.98]
            transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {product.isAvailable && product.stock > 0 ? "Add to cart" : "Notify me"}
        </button>
      </div>
    </Link>
  );
}