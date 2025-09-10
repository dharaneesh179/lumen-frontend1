import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // get JWT token

    fetch("http://localhost:8080/api/users", {
      headers: {
        Authorization: `Bearer ${token}`, // send token in header
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users"); // handle errors
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
