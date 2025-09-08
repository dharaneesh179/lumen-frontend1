import React, { useEffect, useState } from "react";
import "./SupplierList.css"; // external CSS for styling

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/suppliers")
      .then((res) => res.json())
      .then((data) => setSuppliers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="supplier-container">
      <h2 className="title">Suppliers</h2>
      <div className="supplier-grid">
        {suppliers.map((s) => (
          <div className="supplier-card" key={s.id}>
            <h3>{s.name}</h3>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Phone:</strong> {s.phone}</p>
            <p><strong>Address:</strong> {s.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupplierList;
