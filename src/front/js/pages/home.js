import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import InspoQuote from "../component/inspoQuote";
import HomePageGraphic from "../component/homePageGraphic";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 ">
			<div className="">
			<HomePageGraphic></HomePageGraphic>
			</div>
			
			
		<div className="">
			<InspoQuote></InspoQuote>
		</div>
		<div className="article">
		<h2>With Chore Manager you can track your chores to find out how much time you spend completing your household tasks</h2>
		<h3> What you will find in the app</h3>
		<ul>
 			<li>A list of the most common household chores</li>
			<li>A way to track how long it took you to complete the chore</li>
 		</ul>
 <h3> Sign up here </h3>
 <h3> Already got an account? Log in through here instead</h3>

 			<h3>Want to split your chores with others? Why not join a team with others</h3>
			 <div className='d-flex home-button'>
            <button className='btn btn-primary home-btn-learnmore'>Learn More</button>
			<div>
            <button className='btn btn-primary home-btn-mission'>Our Mission</button>
			</div>
			</div>
        </div>
		</div>
	);
};
