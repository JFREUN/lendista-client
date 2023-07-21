import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function Basket() {
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [basketCount, setBasketCount] = useState(basket.length);
  const { user } = useContext(AuthContext);
  const [userCredits, setUserCredits] = useState("");
  const[rentedProducts, setRentedProducts] = useState([])
  const userId = user._id;

  const storedToken = localStorage.getItem("authToken");

  const getUser = () => {
    axios
      .get(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setBasket(response.data.basket);
        setRentedProducts(response.data.rentedProducts);
        const totalAmount = response.data.basket.reduce(
          (acc, item) => acc + item.credits,
          0
        );
        setTotal(totalAmount);
        setUserCredits(response.data.credits);
      })
      .catch((err) => console.log("This is a get user error: ", err));
  };

  const handleRent = () => {
    const updatedCredits = userCredits - total;

    const requestBody = {
      rentedProducts: [...rentedProducts, ...basket],
      basket: [],
      credits: updatedCredits,
    };

    axios
      .put(`${API_URL}/api/user/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        basket.forEach((item) => {
          axios
            .put(`${API_URL}/api/products/${item._id}`, {
              rentedAt: new Date(),
              inStock: false, 
              returned: false,
              renter: user
            })
            .then((response) => {
              console.log(`Updated rentedAt for item ${item._id}`);
              setBasketCount(basket.length)
            })
            .catch((err) => console.log("Basket Error: ", err));
        });
      })
      .catch((err) => console.log("Basket Error: ", err));
  };

  const removeItem = (item) => {
    const index = basket.indexOf(item);

    const updatedBasket = [...basket];
    updatedBasket.splice(index, 1);

    const updatedTotal = total - item.credits;

    const requestBody = {
      basket: updatedBasket,
    };

    axios
      .put(`${API_URL}/api/user/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setBasketCount(basket.length);
        setTotal(updatedTotal);
      })
      .catch((err) => console.log("Edit Error: ", err));
  };

  useEffect(() => {
    getUser();
  }, [basketCount]);

  return (
    <div className="basket">
      <h2>Your Basket: </h2>
      {basket.length > 0 ? (
        <>
          <ul className="basketList">
            {basket.map((item) => {

              return (
                <li key={item._id}>
                <div className="nameWrapper">
                <img className="basketImg" src={item.imageUrl} alt="" />
                  <p>{item.name}</p>
                  </div>
                  <div className="creditsWrapper">
                    <p>{item.credits}</p>
                    <button onClick={() => removeItem(item)}>Remove</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="totalDiv">
            <p>Total Credits spent: {total}</p>
            <button onClick={handleRent} className="rentBtn">Rent</button>
          </div>
        </>
      ) : (
        <p>Empty basket! </p>
      )}
    </div>
  );
}

export default Basket;
