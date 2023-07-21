import axios from "axios";
import React, { useEffect, useState } from "react";
const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function ReturnedProducts({ allProducts, update, setUpdate }) {
  const [returned, setReturned] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const confirmReturn = (id, userId) => {
    axios
      .put(
        `${API_URL}/api/products/${id}`,
        { inStock: true, renter: null },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        axios
          .get(`${API_URL}/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const user = response.data;

            // Find the item in rentedProducts array
            const itemIndex = user.rentedProducts.findIndex(
              (item) => item._id === id
            );

            if (itemIndex !== -1) {
              // Remove the item from rentedProducts
              const removedItem = user.rentedProducts.splice(itemIndex, 1)[0];

              // Add the item to pastRented
              user.pastRented.push(removedItem);

              // Update the user object on the server
              axios
                .put(`${API_URL}/api/user/${userId}`, user, {
                  headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                  console.log("User object updated with return information.");
                  setUpdate(!update);
                })
                .catch((err) => console.log("Update User Error: ", err));
            }
          })
          .catch((err) => console.log("Fetch User Error: ", err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setReturned(
      allProducts.filter(
        (item) => item.returned === true && item.inStock === false
      )
    );
  }, [allProducts, update]);

  return (
    <div className="componentPage">
      <h3>Returns to approve</h3>{" "}
      {returned.length > 0 ? (
        <table className="productTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returned.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>Returned</td>
                  <td>
                    <button
                      onClick={() =>
                        confirmReturn(product._id, product.renter._id)
                      }
                      className="confirmBtn"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <span>No returns to approve</span>
      )}
    </div>
  );
}

export default ReturnedProducts;
