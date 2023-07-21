import React from 'react';
 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import the service file since we need it to send/get the data to/from the server
import service from "../api/service";
 

function AddProduct({setUpdate, update,setHideForm, setHideAllProducts}) {
    const[name, setName] = useState("");
    const[category, setCategory] = useState("");
    const[rating, setRating] = useState(0);
    const [imageUrl,setImageUrl] =useState("");
    const[inStock, setInStock] = useState(true);
    const [credits, setCredits] = useState("");

    const navigate = useNavigate();

    const handleFileUpload = (e) => {
     
        const uploadData = new FormData();
     
        uploadData.append("imageUrl", e.target.files[0]);
        console.log("upload started")
     
        service
          .uploadImage(uploadData)
          .then(response => {
            setImageUrl(response.fileUrl);
            console.log(response.fileUrl)
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

      const handleSubmit = (e) => {
        e.preventDefault();

     
        service
          .createProduct({ name, category, imageUrl,rating ,inStock, credits, rentedAt: ""})
          .then(res => {
            console.log("added new product ", res)
     
            // Reset the form
            setName("");
            setCategory("");
            setRating(0);
            setInStock(true)
            setCredits("");
            setImageUrl("");
            setUpdate(!update);
            setHideAllProducts(false);
            setHideForm(true);
          
            // navigate to another page
            navigate("/admin/dashboard");
          })
          .catch(err => console.log("Error while adding the new movie: ", err));
      };
  return (
    <div className='addProductPage'>

        <form onSubmit={handleSubmit} className='addProductForm'>
        <h3>Add a Product:</h3>

           <label> Name:
            <input placeholder="Name:" type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
            </label>

            <label> Category: 
            <input placeholder="Category:" type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            </label>

            <label> Product Image: 
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            </label>

            <label> Credits: 
            <input type="text" placeholder="Credits: " value={credits} onChange={(e)=>setCredits(e.target.value)}/>
            </label>


            <button className="adminLink" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddProduct