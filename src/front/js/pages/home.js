import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import InspoQuote from "../component/inspoQuote";
import HomePageGraphic from "../component/homePageGraphic";
import "../../styles/modules/buttonstyles.css";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home" >
    <div className="text-center mt-5  ">
      <div className="mt-2">
        <InspoQuote></InspoQuote>
        {/* <img src={Hpimagelight} className="home-img" alt="home-img-light"/> */}
        {/* <img src={Hpimagedark} className="home-img bg-image" id="intro" alt="home-img-dark"/> */}
      </div>
      {/* <div className="">
        <h2>
          With Chore Manager you can track your chores to find out how much time
          you spend completing your household tasks
        </h2>
        <h3> What you will find in the app</h3>
        <ul>
          <li>A list of the most common household chores</li>
          <li>A way to track how long it took you to complete the chore</li>
        </ul>
        <h3> Sign up here </h3>
        <h3> Already got an account? Log in through here instead</h3>
        <h3>
          Want to split your chores with others? Why not join a team with others
        </h3>
        </div> */}
		<div className="container">
        <HomePageGraphic></HomePageGraphic>
        </div>
        <button className="btn button-test btn-text mt-4">
            Learn More
          </button>
          </div>
    </div>
  );
};
