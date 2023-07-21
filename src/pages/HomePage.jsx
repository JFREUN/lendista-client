import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import mainBg from "../images/pexels-uncoveredlens-eze-joshua-3620411.jpg";

function HomePage() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  });

  return (
    <div>
      <section
        className="homeText"
        style={{ backgroundImage: `url(${mainBg})` }}
      >
        <h1>
          Rent Fashion <br />
          Live Sustainably
        </h1>
        <div className="homeDiv">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            hendrerit vulputate eros, ac bibendum mauris congue id. Cras non est
            sed eros maximus egestas.
          </p>
        </div>

        <Link to="/products" className="homeButton hover">
          Check it out
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
