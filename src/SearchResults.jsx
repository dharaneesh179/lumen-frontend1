import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductList.css"; // reuse the same CSS styles

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Extract search query from URL (example: /search?q=wire)
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    fetch("http://localhost:8080/api/products") // your backend API
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products (case-insensitive, partial match)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p>Loading search results...</p>;

  return (
    <div className="product-container">
      <h2 className="title">Search Results for: "{query}"</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.imageUrl} alt={p.name} className="product-img" />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
