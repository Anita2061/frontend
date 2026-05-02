import React from 'react'

const Delete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    // Update local state so the UI refreshes immediately
    setProducts(products.filter(p => p.id !== id));
  } catch (error) {
    alert("Delete failed!");
  }
};

export default Delete
