import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions, token } = useContext(Context);

	useEffect(() => {
        if(store?.token && token != "" ){
        actions.checkIfAuthorized()
        }
	  },[ store.token] );

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="">
				{store.token ? (
					<Link to="/profile">
						<button className="btn btn-primary m-2">Profile</button>
					</Link> ) : (
						<p></p>
					) }
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
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
                    <button className="btn btn-primary m-2" onClick={() => actions.logout()}>Logout</button>
                  )}
                </div>
				</div>
			</div>
		</nav>
	);

};
