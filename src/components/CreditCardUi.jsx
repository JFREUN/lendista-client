import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
function CreditCardUi({paymentCard, setPaymentCard, nextPage}) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");


const handleSubmit = () => {
  console.log(paymentCard)
  
    nextPage()
  
    setError("Please enter all details.")
  
    
  }

  const handleChangeName = (e) => {
    setPaymentCard((prevState)=> ({...prevState, name: e.target.value}))
  };
  
  const handleChangeNumber = (e) => {
    setPaymentCard((prevState)=> ({...prevState, number: e.target.value}))
  };
  
  const handleChangeExpiry = (e) => {
    setPaymentCard((prevState)=> ({...prevState, expiry: e.target.value}))
  };
  
  const handleChangeCvv = (e) => {
    setPaymentCard((prevState)=> ({...prevState, cvv: e.target.value}))
  };

  return (
    <div className="pageWrapper">
          
            <input
              type="tel"
              name="number"
              placeholder="**** **** **** ****"
              pattern="[\d| ]{16,22}"
              required
              value={paymentCard.number}
              onChange={handleChangeNumber}
            />
            <input
              type="text"
              name="name"
              placeholder="Max Mustermann"
              required
              value={paymentCard.name}
              onChange={handleChangeName}
            />
            <div className="creditGroup">
              <input
                type="tel"
                className="expiry"
                name="expiry"
                placeholder="MM/YY"
                pattern="\d\d/\d\d"
                required
                value={paymentCard.expiry}
                onChange={handleChangeExpiry}
              />
              <input
                type="tel"
                className="expiry"
                name="cvv"
                placeholder="CVV"
                pattern="\d{3,4}"
                required
                value={paymentCard.cvv}
                onChange={handleChangeCvv}
              />
              </div>
          {error && <p>{error}</p>}
          <p>Please confirm your credit card details.</p>
            <button className="submitBtn" type="button" onClick={handleSubmit}>Confirm</button>
    </div>
  );
}
export default CreditCardUi;
