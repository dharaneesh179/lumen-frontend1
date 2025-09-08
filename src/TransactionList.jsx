import React, { useEffect, useState } from "react";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transactions</h2>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "left",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>User</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Role</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Product</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Stock</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reorder Point</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.quantity}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(t.transactionDate).toLocaleString()}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.user.username}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.user.role}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.product.category}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.product.stockLevel}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{t.product.reorderPoint}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {t.product.price ? `₹${t.product.price}` : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
