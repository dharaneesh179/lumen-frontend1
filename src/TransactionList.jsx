import React, { useEffect, useState } from "react";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // get JWT token

    fetch("http://localhost:8080/api/transactions", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch transactions");
        return res.json();
      })
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transactions</h2>
      <table
        style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>User</th>
            <th>Role</th>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Reorder Point</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.quantity}</td>
              <td>{new Date(t.transactionDate).toLocaleString()}</td>
              <td>{t.user.username}</td>
              <td>{t.user.role}</td>
              <td>{t.product.name}</td>
              <td>{t.product.category}</td>
              <td>{t.product.stockLevel}</td>
              <td>{t.product.reorderPoint}</td>
              <td>{t.product.price ? `₹${t.product.price}` : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
