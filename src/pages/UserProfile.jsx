import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function UserProfile() {
  const [rentedItems, setRentedItems] = useState([]);
  const [update, setUpdate] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [pastRented, setPastRented] = useState([]);
  const [showPast, setShowPast] = useState(false);


  const { user } = useContext(AuthContext);
  const userId = user._id;

  const storedToken = localStorage.getItem("authToken");

  const getRentedItems = () => {
    axios
      .get(`${API_URL}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRentedItems(response.data.rentedProducts);
        setActiveUser(response.data);

        const fetchedPastRented = response.data.pastRented;
        const uniquePastRented = fetchedPastRented.reduce((accumulator, item) => {
          const existingItem = accumulator.find((i) => i._id === item._id);
          if (!existingItem) {
            accumulator.push(item);
          }
          return accumulator;
        }, []);
        setPastRented(uniquePastRented);
      })
      .catch((err) => console.log("Error fetching rented items: ", err));
  };

  const handlePast = () => {
    setShowPast(!showPast);
  };

  const updateCredits = (membership) => {
    let updatedCredits;

    if(membership === "S"){
      updatedCredits= 50
    } else if(membership === "M") {
      updatedCredits = 100
    } else {
      updatedCredits = 250
    }

    axios.put(`${API_URL}/api/users/${userId}`, {credits : updatedCredits}, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      console.log("Credits have been updated!")
    })
    .catch(err => console.log("Credit update error: ", err))
  }

  const calculateRemainingDays = (createdDate) => {
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - new Date(createdDate).getTime();
    const remainingDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return remainingDays;
  };

  const calculateRemainingTime = (rentedAt) => {
    const rentalEndDate = rentedAt;
    rentalEndDate.setDate(rentalEndDate.getDate() + 30); // Add 30 days to rentedAt date
    const currentDate = new Date();
    const remainingTime = rentalEndDate.getTime() - currentDate.getTime();

    // Convert remaining time to days
    const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
    console.log(rentedAt);

    return remainingDays;
  };

  const handleReturn = (id) => {
    axios
      .put(`${API_URL}/api/products/${id}`, {
        rentedAt: null,
        returned: true,
      })
      .then((response) => {
        console.log(`Updated rentedAt for item ${id}`);
        setUpdate(!update);
      })
      .catch((err) => console.log("Basket Error: ", err));
  };

  useEffect(() => {
    getRentedItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);


  useEffect(() => {
    const remainingDays = calculateRemainingDays(activeUser.createdAt);

    if (remainingDays % 30 === 0) {
      updateCredits(activeUser.membership);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser]);

  return (
    <div className="userProfile">
        <h2>Hello {activeUser.name}</h2>
        <p>You have {activeUser.credits} credits left.</p>
      <h3>Your Closet:</h3>
      <p className="waitText">
        When you return an item, you have to wait for us to confirm receipt.
      </p>
      {rentedItems.length > 0 ? (
        <ul className="rentedList current">
          {console.log("all items: ", rentedItems)}
          {rentedItems.map((item) => {
            const remainingDays = calculateRemainingTime(
              new Date(item.rentedAt)
            );

            return (
              <li key={item._id} className="productDiv">
                <img src={item.imageUrl} alt="product" className="rentedImg" />

                <div className="rentedText">
                  <p>{item.name}</p>
                  {item.returned ? (
                    <p>Item returned</p>
                  ) : (
                    <p>Deadline: {remainingDays} days</p>
                  )}
                  {item.returned ? (
                    <button disabled={true} className="productLink">
                      Wait...
                    </button>
                  ) : (
                    <Link
                      onClick={() => handleReturn(item._id)}
                      className="productLink return"
                    >
                      Return
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <p className="noRent">You've not rented any items yet!</p>
          <Link to="/products" className="shopLink">
            {" "}
            Check out our Shop
          </Link>
        </>
      )}

      <button className="profileBtn" onClick={handlePast}>
        View past orders
      </button>
      {pastRented.length > 0 && showPast ? (
        <ul className="rentedList pastRent">
          {pastRented.map((item) => {
            return (
              <li key={item._id} className="productDiv">
                <img src={item.imageUrl} alt="product" className="rentedImg" />
                <div className="rentedText">
                  <p>{item.name}</p>
                  <p>{item.credits} Credits</p>
                  <Link to={`/products/${item._id}`} className="productLink">
                    View
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
        </>
      )}
    </div>
  );
}

export default UserProfile;
