import React from "react";
import { Link } from "react-router-dom";

function AllProducts({ allProducts, handleEdit }) {
  return (
    <div className="componentPage">
      <h3>All Products</h3>
      <table className="productTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                {product.inStock ? <td>In Stock</td> : <td>Rented</td>}
                <td>
                  <Link onClick={() => handleEdit(product._id)}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
