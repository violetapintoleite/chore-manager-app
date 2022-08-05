import React, { useContext } from "react";
import { Context } from "../store/appContext";
import InspoQuote from "../component/inspoQuote";
import "../../styles/modules/buttonstyles.css";
import { Navbar } from "../component/navbar";
import "../../styles/modules/hometext.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home">
      <Navbar excludeFromHome={false} />
      <div className="quote-container position-relative">
        <div className="position-absolute top-50 start-50 translate-middle">
          <InspoQuote></InspoQuote>
          {/* <img src={Hpimagelight} className="home-img" alt="home-img-light"/> */}
          {/* <img src={Hpimagedark} className="home-img bg-image" id="intro" alt="home-img-dark"/> */}

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
        </div>
      </div>
    </div>
  );
};
