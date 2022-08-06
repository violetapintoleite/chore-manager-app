import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import logo3 from "../../img/logo3.png";
import "../../styles/modules/buttonstyles.css";
import "../../styles/modules/navbarstyling.css";
import "../../styles/modules/iconstyle.css";

export const Navbar = ({ excludeFromHome = true }) => {
  const { store, actions, token } = useContext(Context);
  const location = useLocation();

  if (excludeFromHome && location.pathname === "/") {
    return null;
  }

  const [scrolled, setScrolled] = useState();
  const initScrollBehaviour = () => {
    let y = window.scrollY;
    setScrolled(y);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => initScrollBehaviour());
  }, []);

  useEffect(() => {
    if (store?.token && token != "") {
      actions.checkIfAuthorized();
    }
  }, [store.token]);

  return (
    <nav
      className={
        "navbar " +
        (scrolled > 90 ? "navbar-scrolled fixed-top" : "navbar-scroll")
      }
    >
      <div className="container-md">
        <Link to="/">
          {/* <span className="navbar-brand mb-0 h1" id="logo">Chore Manager</span> */}
          {/* <img src={logo3} className="navbar-logo" alt="logo3"/> */}
          <p className="nav-link navbar-brand logo">
            <i className="fas fa-hand-sparkles"></i>Chore Manager
          </p>
        </Link>

        <div className="d-flex">
          {store.token ? (
            <ul className="nav-item dropdown">
              {" "}
              <a
                className="dropdown"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <button
                  className="navbar-toggler btn-color"
                  type="button"
                  data-mdb-toggle="collapse"
                  data-mdb-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fas fa-bars"></i>
                </button>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  {" "}
                  <a className="dropdown-item" href="/profile">
                    Dashboard
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="dropdown-item" href="/history">
                    Chores
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="dropdown-item" href="/teamMetrics">
                    Team Metrics
                  </a>
                </li>
                <li>
                  {" "}
                  <Link to="/">
                    <button
                      className="btn m-2"
                      onClick={() => actions.logout()}
                    >
                      Logout
                    </button>
                  </Link>
                </li>
              </ul>
            </ul>
          ) : (
            <p></p>
          )}
          {!store.token ? (
            <Link to="/login">
              <button className="btn m-2 ">Login </button>
            </Link>
          ) : (
            <p></p>
          )}
          {!store.token ? (
            <Link to="/signup">
              <button className="btn m-2 ">Sign Up</button>
            </Link>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </nav>
  );
};
