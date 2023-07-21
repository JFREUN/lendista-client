import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreditCardUi from "../components/CreditCardUi";
import UserDetails from "../components/UserDetails";
import MembershipChoice from "../components/MembershipChoice";
import axios from "axios";

const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [membership, setMembership] = useState("");
  const [page, setPage] = useState(0);
  const [role, setRole] = useState("");
  const [credits, setCredits] = useState(0);
  const [paymentCard, setPaymentCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const nextPage = () => {
    setPage(page + 1);
  };

  const lastPage = () => {
    setPage(page - 1);
  };

  const handleRole = () => {
    setRole("Member");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Modify the regular expression pattern
    // const pattern = /[\d ]{16,22}|[|]{16,22}/;

    // Check if payment card details are filled
    if (
      !paymentCard.name ||
      !paymentCard.number ||
      !paymentCard.expiry ||
      !paymentCard.cvv
    ) {
      setErrorMessage("Please fill in the payment card details");
      return;
    }

    // Create an object representing the request body
    const requestBody = {
      email,
      password,
      name,
      membership,
      role,
      paymentCard,
      credits,
    };

    // if (!pattern.test(paymentCard.number)) {
    //   setErrorMessage("Invalid payment card number");
    //   return;
    // }

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log("Sign up success!", response);
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="loginPage">
      <h1>Sign Up</h1>
      <p>Sign up to rent the newest trends!</p>

      <form onSubmit={handleSignupSubmit} className="loginForm">
        {page === 0 && (
          <>
            <UserDetails
              email={email}
              handleEmail={handleEmail}
              password={password}
              handlePassword={handlePassword}
              name={name}
              handleName={handleName}
            />
            <button type="button" onClick={nextPage} className="loginBtn">
              Next
            </button>
          </>
        )}

        {page === 1 && (
          <>
            <MembershipChoice
              membership={membership}
              setMembership={setMembership}
              credits={credits}
              setCredits={setCredits}
            />
            <div className="btnsDiv">
              <button type="button" onClick={lastPage} className="loginBtn">
                Back
              </button>
              <button type="button" onClick={nextPage} className="loginBtn">
                Next
              </button>
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <CreditCardUi
              setPaymentCard={setPaymentCard}
              paymentCard={paymentCard}
              nextPage={nextPage}
            />
            <div className="btnsDiv">
              <button type="button" onClick={lastPage} className="loginBtn">
                Back
              </button>
              <button type="button" onClick={nextPage} className="loginBtn">
                Next
              </button>
            </div>
          </>
        )}
        {page === 3 && (
          <div className="pageWrapper">
          <div className="finalPage">
            <h3>Ready to go?</h3>
            <p className="finalP">Name: {name}</p>
            <p className="finalP">E-Mail: {email}</p>
            <p className="finalP">Membership: {membership}</p>
            <label className="tcRadio">
              <input
                type="checkbox"
                checked={role}
                onChange={handleRole}
                required="required"
              />
              Do you agree to our T&Cs?
            </label>
            </div>
            <button className="submitBtn" type="submit">Sign Up</button>
            <button type="button" onClick={lastPage} className="loginBtn back">
              Back
            </button>
          </div>
        )}
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"} className="signupLink">
        {" "}
        Login
      </Link>
      <p className="adminP">Want to sign-up as an Admin?</p>
      <Link to={"/admin/signup"} className="signupLink">
        {" "}
        Admin Signup
      </Link>
    </div>
  );
}

export default SignUpPage;
