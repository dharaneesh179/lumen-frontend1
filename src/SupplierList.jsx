import React, { useEffect, useState } from "react";
import "./SupplierList.css";

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // get JWT token

    fetch("http://localhost:8080/api/suppliers", {
      headers: {
        Authorization: `Bearer ${token}` // send token in Authorization header
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch suppliers");
        return res.json();
      })
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
