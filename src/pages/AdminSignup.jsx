import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://giddy-coveralls-bat.cyclic.app";

function AdminSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [pageTwo, setPageTwo] = useState(false);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleRole = () => {
    setRole("Admin");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, role };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log("Sign up success!");
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="loginPage">
      <h1>Admin Sign-Up</h1>

      <form onSubmit={handleSignupSubmit} className="loginForm">
        {!pageTwo && (
          <div className="pageWrapper">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            <label className="tcRadio">
              <input
                type="checkbox"
                checked={role}
                onChange={handleRole}
                required="required"
              />
Do you agree to our T&Cs?            </label>
            <button type="submit" className="submitBtn">Sign Up</button>{" "}
          </div>
        )}
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an admin account?</p>
      <Link to={"/admin/login"}> Admin Login</Link>
    </div>
  );
}

export default AdminSignup;
