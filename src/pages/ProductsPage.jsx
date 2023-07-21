import React, {useState, useEffect} from 'react'

import axios from "axios";
import { Link } from 'react-router-dom';
import searchIcon from "../images/search_FILL0_wght400_GRAD0_opsz48.svg"

const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function ProductsPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [search, setSearch] = useState("");
    const storedToken = localStorage.getItem("authToken");


  const getProducts = () => {
    axios.get(`${API_URL}/api/products`)
    .then(response => {
      setAllProducts(response.data.filter(item => item.inStock === true))
    })
    .catch(err => console.log("Product List error: ", err))
  };

  useEffect(()=> {
    getProducts()
  }, [!search])

  useEffect(()=>{
    if(search){
      axios
      .get(`${API_URL}/api/products/search?name=${search}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((err) => console.log(err));
    }
  }, [search])

  return (
    <div className='productsPage'>
    <h2>Our Pieces</h2>
    <label className='searchLabel'>
      <input type="text" className="searchInput" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      <img src={searchIcon} alt="magnifyingGlass" className='searchIcon'/>

    </label>
    <div className='productsContainer'>

    {allProducts.map(product => {
        return(
       <div className='productDiv' key={product._id}>
       <img src={product.imageUrl} alt="product" />
        <p>{product.name}</p>
        <p>Credits: {product.credits}</p>
        <Link className="productLink hover" to={`/products/${product._id}`}>View</Link>
       </div>
       )
    })}

    </div>

    </div>
  )
}


export default ProductsPage