import React, { useState, useEffect } from "react";
import axios from "axios";

function AddItem() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const handleAddItem = () => {
    axios
      .post("http://localhost:5000/api/items", { name: newItemName })
      .then((response) => {
        setItems([...items, response.data]);
        setNewItemName("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };
  return (
    <div>
      <h1>React App</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="New item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
}

export default AddItem;
