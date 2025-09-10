import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductList from "./ProductList";
import SupplierList from "./SupplierList";
import TransactionList from "./TransactionList";
import UserList from "./UserList";
import SearchResults from "./SearchResults";
import Cart from "./Cart";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      <header style={{ background: "#282c34", padding: "1rem", color: "white" }}>
        <h1>Lumen Website</h1>
        <nav>
          <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
            <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
            <li><Link to="/products" style={{ color: "white", textDecoration: "none" }}>Products</Link></li>
            <li><Link to="/suppliers" style={{ color: "white", textDecoration: "none" }}>Suppliers</Link></li>
            <li><Link to="/transactions" style={{ color: "white", textDecoration: "none" }}>Transactions</Link></li>
            <li><Link to="/users" style={{ color: "white", textDecoration: "none" }}>Users</Link></li>
            <li><Link to="/cart" style={{ color: "white", textDecoration: "none" }}>🛒 Cart</Link></li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          style={{ marginTop: "10px", padding: "5px", width: "200px" }}
        />
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<h2>Welcome to Lumen Website</h2>} />
          <Route path="/products" element={<ProductList searchQuery={searchQuery} />} />
          <Route path="/suppliers" element={<SupplierList searchQuery={searchQuery} />} />
          <Route path="/transactions" element={<TransactionList searchQuery={searchQuery} />} />
          <Route path="/users" element={<UserList searchQuery={searchQuery} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
