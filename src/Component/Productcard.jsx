import React from 'react'
import { Link } from 'react-router-dom';

 const Productcard = ({ products }) => {
  return (
    <div className="card-container">
      <Link to={`/product/${products.id}`}>
        <img src={products.image} alt={products.name} />
      </Link>
      <h3>{products.name}</h3>
      <p>Rs.{products.price}</p>
      {/* You can also make the "Add to Cart" button navigate if preferred */}
      <Link to={`/product/${products.id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
};
   
 

export default Productcard
