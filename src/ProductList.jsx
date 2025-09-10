import { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList({ searchQuery }) {
  const [products, setProducts] = useState([]);

  // Fetch products from backend with JWT
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // send JWT token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchProducts();
  }, []);

  // Add to cart function
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  // Filter products by search query
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-container">
      <h2 className="title">Products</h2>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-img" />
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            {product.stockLevel <= product.reorderPoint && (
              <p className="stock-warning">⚠ Low Stock</p>
            )}
            <button
              onClick={() => addToCart(product)}
              style={{
                background: "#3498db",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
