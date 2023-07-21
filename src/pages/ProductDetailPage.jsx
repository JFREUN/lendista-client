import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function ProductDetailPage() {
  const [product, setProduct] = useState("");
  const { productId } = useParams();
  const [basket, setBasket] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [activeUser, setActiveUser] = useState("");

  const storedToken = localStorage.getItem("authToken");

  const { isLoggedIn, user } = useContext(AuthContext);

  const userId = user ? user._id : "";

  const getUser = () => {
    if (user) {
      axios
        .get(`${API_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setBasket(response.data.basket);
          setActiveUser(response.data);
          console.log("active user: ", activeUser);
        })
        .catch((err) => console.log("This is a get user error: ", err));
    }
  };

  const getProduct = () => {
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => console.log("Product Detail Error: ", err));
  };

  const addToBasket = () => {
    const updatedBasket = [...basket, product];

    const requestBody = {
      basket: updatedBasket,
    };

    setBasket(updatedBasket);

    axios
      .put(`${API_URL}/api/user/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setDisabled(true);
      })
      .catch((err) => console.log("Edit Error: ", err));
  };

  useEffect(() => {
    getUser();
    getProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    activeUser && activeUser.basket.find((item) => item._id === product._id)
      ? setDisabled(true)
      : setDisabled(false);

    activeUser && activeUser.credits < product.credits
      ? setDisabled(true)
      : setDisabled(false);
  }, [product, activeUser]);

  return (
    <div className="productPage">
    <div className="productImgWrapper">
      <Link to="/products" className="hover">Back</Link>
      <img src={product.imageUrl} alt="detail" className="productImg" />
    </div>
    <div className="productText">
      <h3 className="productName">{product.name}</h3>
      <p>Credits: {product.credits}</p>
      {isLoggedIn ? (
        <button className="rentLink hover" onClick={() => addToBasket()} disabled={disabled}>
          Rent
        </button>
      ) : (
        
          <Link to="/login" className="rentLink hover">Rent</Link>
        
      )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
