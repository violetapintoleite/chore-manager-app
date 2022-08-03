import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import logo3 from "../../img/logo3.png";
import "../../styles/modules/buttonstyles.css";
import "../../styles/modules/navbarstyling.css";


export const Navbar = ({excludeFromHome=true}) => {
  const { store, actions, token } = useContext(Context);
  const location = useLocation();

  if (excludeFromHome && location.pathname === "/" ){
    return null 
   };

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
    <nav className={"navbar " + (scrolled > 90 ? "navbar-scrolled fixed-top" : "navbar-scroll")}>
      <div className="container-md">
        
        <Link to="/">
          {/* <span className="navbar-brand mb-0 h1" id="logo">Chore Manager</span> */}
          {/* <img src={logo3} className="navbar-logo" alt="logo3"/> */}
          <p className="nav-link navbar-brand logo">Chore Manager</p>
        </Link>
         
        <div className="d-flex">
          {store.token ? (

            <p class="nav-item dropdown">
              {" "}
              <a
                class="dropdown"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <button class="navbar-toggler btn-color" type="button" data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="fas fa-bars"></i>
      </button>
              </a>

              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  {" "}
                  <Link to="/profile">
                    <a className="dropdown-item" href="/profile">
                      Dashboard
                    </a>{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/history">
                    <a class="dropdown-item" href="/history">
                      My Chores
                    </a>{" "}
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/metrics">
                    <a class="dropdown-item" href="#">
                      My Metrics
                    </a>
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/">
                    <button
                      className="btn m-2 nav-link"
                      onClick={() => actions.logout()}
                    >
                      Logout
                    </button>
                  </Link>
                </li>
              </ul>
            </p>
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



