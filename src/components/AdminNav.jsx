import React from 'react'

function AdminNav({handleAllProducts, handleAllUsers, handleForm, handleReturned}) {
  return (
    <div className='dashboardMenu'>
    <button onClick={handleForm} className="triggerWrapper linkHover">Add a product</button>
    <button onClick={handleReturned} className="triggerWrapper linkHover">Approve Returns</button>
    <button onClick={handleAllProducts} className="triggerWrapper linkHover">All Products</button>
    <button onClick={handleAllUsers} className="triggerWrapper linkHover">All Users</button>

    </div>
  )
}

export default AdminNav