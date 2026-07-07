import { Link, useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();

  return (
    <div className="group w-64 rounded-2xl overflow-hidden border border-secondary/20 bg-primary hover:-translate-y-1.5 hover:shadow-lg transition">

      {/* ALL NAVIGATION CONTENT */}
      <Link to={"/product/" + product.productId}>
        {/* Image */}
        <div className=" h-52 overflow-hidden bg-secondary/10">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>

        {/* Body */}
        <div className="p-4">

          {product.altNames?.[0] && (
            <p className="text-[10px] font-medium uppercase text-secondary/60 mb-1">
              {product.altNames[0]}
            </p>
          )}

          <h2 className="font-serif text-lg text-secondary mb-1.5">
            {product.name}
          </h2>

          <p className="text-[13px] text-secondary/70 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-medium">${product.price}</span>
          </div>

        </div>
      </Link>

      {/* CTA (NO LINK INSIDE) */}
      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() =>
            navigate("/checkout", {
              state: {
                cart: [
                  {
                    product: {
                      productId: product.productId,
                      name: product.name,
                      price: product.price,
                      labelledPrice: product.labelledPrice,
                      images: product.images,
                    },qty: 1
                  },
                ],
              },
            })
          }
          disabled={!product.isAvailable || product.stock === 0}
          className="w-full py-2.5 rounded-xl text-[13px] font-medium bg-secondary text-primary"
        >
          {product.isAvailable && product.stock > 0 ? "Buy Now" : "Notify me"}
        </button>
      </div>

    </div>
  );
}