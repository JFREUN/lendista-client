import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import service from "../api/service";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditProduct({productId, setShowEdit,setHideAllProducts, setUpdate, update}) {
  const [product, setProduct] = useState({});
  const storedToken = localStorage.getItem("authToken");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [inStock, setInStock] = useState("");

  const navigate = useNavigate();


  const getProduct = () => {
    axios
      .get(`${API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProduct = response.data;
        setProduct(oneProduct);
        setName(oneProduct.name);
        setCredits(oneProduct.credits);
        setImageUrl(oneProduct.imageUrl);
        setInStock(oneProduct.inStock);
      })
      .catch((err) => console.log("Single Product error: ", err));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      imageUrl,
      credits,
      inStock,
    };

    axios
      .put(`${API_URL}/api/products/${productId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setShowEdit(false);
        setHideAllProducts(false);
      })
      .catch(err => console.log("Edit Error: ", err))
  };

  const deleteProduct = () => {
    axios
      .delete(`${API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setShowEdit(false)
        setHideAllProducts(false)
        setUpdate(!update)
      })
      .catch((err) => console.log("Delete Error: ",err));
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="addProductPage">
      <form className="addProductForm" onSubmit={handleSubmit}>
      <img className="editImg" src={imageUrl} alt="" />

      <h3>Edit Product: {name} </h3>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Credits
          <input type="number"  value={credits} onChange={(e)=> setCredits(e.target.value)}/>
        </label>
      
        <label>
          Image:
          <input type="file" onChange={(e) => handleFileUpload(e)} />{" "}
        </label>
        <label>
          In Stock?
          <div className="radio">
            <label>
              Yes
              <input
                type="radio"
                value="true"
                className="stockRadio"
                checked={inStock === true}
                onChange={() => setInStock(true)}
              />
            </label>
            <label>
              No, (rented)
              <input
                type="radio"
                value="false"
                checked={inStock === false}
                onChange={() => setInStock(false)}
              />
            </label>
          </div>
        </label>
        <div className="editButtons">
        <button type="submit" className="adminLink">Edit</button>
        <button type="button" className="adminLink deleteBtn" onClick={deleteProduct}>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
