import React, { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import axios from "axios";
import ReturnedProducts from "../components/ReturnedProducts";
import AdminNav from "../components/AdminNav";
import AllProducts from "../components/AllProducts";
import AllUsers from "../components/AllUsers";
import icon from "../images/undraw_thought_process_re_om58.svg";
import EditProduct from "../components/EditProduct";

const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function Dashboard() {
  const [hideForm, setHideForm] = useState(true);
  const [hideAllProducts, setHideAllProducts] = useState(true);
  const [hideReturned, setHideReturned] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [hideUsers, setHideUsers] = useState(true);
  const[showEdit, setShowEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const [productId, setProductId] = useState("")

  const storedToken = localStorage.getItem("authToken");

  const handleForm = () => {
    setHideForm(!hideForm);
    setHideAllProducts(true);
    setHideUsers(true);
    setHideReturned(true);
    setShowEdit(false)
  };

  const handleEdit =(id) => {
    setShowEdit(!showEdit);
    setHideAllProducts(true);
    setProductId(id)
  };

  const handleAllProducts = () => {
    console.log("all products, clicked")
    setHideAllProducts(!hideAllProducts);
    setHideForm(true);
    setHideUsers(true);
    setHideReturned(true);
    setShowEdit(false)
  };
  const handleAllUsers = () => {
    setHideUsers(!hideUsers);
    setHideForm(true);
    setHideAllProducts(true);
    setHideReturned(true);    setShowEdit(false)
  };

  const handleReturned = () => {
    setHideReturned(!hideReturned);
    setHideForm(true);
    setHideAllProducts(true);
    setHideUsers(true);
    setShowEdit(false)
  };

  const getProducts = () => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((err) => console.log("Product List error: ", err));
  };

  const getUsers = () => {
    axios
      .get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => console.log("User List error: ", err));
  };

  useEffect(() => {
    getProducts();
    getUsers();
  }, [update]);

  return (
    <div className="dashboard">


      <AdminNav handleForm={handleForm} handleAllProducts={handleAllProducts} handleAllUsers={handleAllUsers} handleReturned={handleReturned}/>

      <div className="dashboardWrapper">
      <div className="dashboardText">
      <h1> Hey Admin!</h1>
      <p>You made it to your dashboard!</p>
      </div>
      {(hideForm && hideReturned && hideAllProducts && hideUsers && !showEdit) && (
        <img className="dashboardIcon" src={icon} alt="icon" />
      )}
      {!hideForm && <AddProduct setUpdate={setUpdate} update={update} setHideAllProducts={setHideAllProducts} setHideForm={setHideForm}/>}

      {!hideReturned && (
        <ReturnedProducts
          allProducts={allProducts}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      {!hideAllProducts && (
      <AllProducts allProducts={allProducts} handleEdit={handleEdit} />
      )}

      {!hideUsers && (
       <AllUsers allUsers={allUsers}/>
      )}

      {showEdit && (<EditProduct productId={productId} setShowEdit={setShowEdit} setHideAllProducts={setHideAllProducts} setUpdate={setUpdate} update={update}/>)}
    </div>
    </div>
  );
}

export default Dashboard;
