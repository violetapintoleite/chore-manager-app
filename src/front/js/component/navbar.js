import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import logo3 from "../../img/logo3.png";

export const Navbar = () => {
  const { store, actions, token } = useContext(Context);

  useEffect(() => {
    if (store?.token && token != "") {
      actions.checkIfAuthorized();
    }
  }, [store.token]);

  return (
    <nav className="navbar navbar-scroll navbar-scrolled navbar-light bg-light fixed-top">
      <div className="container">
        <Link to="/">
          {/* <span className="navbar-brand mb-0 h1" id="logo">Chore Manager</span> */}
          <img src={logo3} className="navbar-logo" alt="logo3"/>
        </Link>
        <div className="d-flex">
          {store.token ? (

            <p class="nav-item dropdown">
              {" "}
              <a
                class="dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
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
                      className="btn btn-primary m-2 nav-link"
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
              <button className="btn btn-primary m-2 nav-link">Login </button>
            </Link>
          ) : (
            <p></p>
          )}
          {!store.token ? (
            <Link to="/signup">
              <button className="btn btn-primary m-2 nav-link">Sign Up</button>
            </Link>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </nav>
  );

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <Popup></Popup>
        <div className="">
          {store.token ? (
            <>
              <Link to="/profile">
                <button className="btn btn-primary m-2">Profile</button>
              </Link>
              <Link to="/history">
                <button className="btn btn-primary m-2">My Chores</button>
              </Link>{" "}
            </>
          ) : (
            <p></p>
          )}
        </div>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-primary m-2">Sign Up </button>
          </Link>
          <div className="">
            {!store.token ? (
              <Link to="/login">
                <button className="btn btn-primary m-2">Login</button>
              </Link>
            ) : (
              <button
                className="btn btn-primary m-2"
                onClick={() => actions.logout()}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
