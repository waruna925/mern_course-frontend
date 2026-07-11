import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./card";
import Loading from "./loading";

export default function SearchProduct() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const searchProducts = async () => {
            try {
                setIsLoading(true);

                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/search?query=${query}`
                );

                setProducts(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        searchProducts();
    }, [query]);

    return (
        <div className="w-full min-h-screen bg-primary py-10">
            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-[400px] max-w-[90%] border rounded-lg px-4 py-2 outline-none"
                />
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-wrap justify-center gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
}