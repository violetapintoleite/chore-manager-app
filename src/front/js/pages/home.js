import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/modules/hometext.css";
import "../../styles/modules/homepage.css";
import "../../styles/modules/slideanimationtext.css";
import InspoQuote from "../component/inspoQuote";
import laptopimg from "../../../front/img/laptopimg.jpg";
import laptopimglight from "../../../front/img/laptopimglight.jpg";
import "../../styles/modules/buttonstyles.css";
import { Navbar } from "../component/navbar";


export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="">
        <Navbar excludeFromHome={false} />
      </div>
      
      {/* quote api */}
      <div>
        <div className="quote-container">
          <div className="">
            <InspoQuote></InspoQuote>
            <br />
            <Link to="/signup">
              <button className="btn button-test btn-text position-relative bottom-0 start-50 translate-middle-x">
                {" "}
                Sign Up Now!
              </button>
            </Link>
          </div>
        </div>
{/* animated text */}
<div className="text-center animated-div">
          <div className="pb-3 bg-white">
            <div className="animation-div d-flex justify-content-center">
              <div className="perspective-text mb-5">
                <div className="perspective-line">
                  <p className="banner-text-test"></p>
                  <p className="banner-text-test">Get</p>
                </div>
                <div className="perspective-line">
                  <p className="banner-text-test">Get</p>
                  <p className="banner-text-test">Your</p>
                </div>
                <div className="perspective-line">
                  <p className="banner-text-test">Your</p>
                  <p className="banner-text-test">Chores</p>
                </div>
                <div className="perspective-line">
                  <p className="banner-text-test">Chores</p>
                  <p className="banner-text-test">Done</p>
                </div>
                <div className="perspective-line">
                  <p className="banner-text-test">Done</p>
                  <p className="banner-text-test"></p>
                </div>
              </div>
            </div>
          </div>
      {/* end of animation */}
          <div className="">
            <div className="d-flex m-2">
              <div className="card radius-3px col-5 ">
                <img
                  src={laptopimg}
                  className="home-img"
                  alt="home-img-light"
                />
              </div>
              <div className="container d-flex text-section first-section align-middle pb-4">
                <div className="container first-section  col-3 pt-4 ">
                  <h4 className="homepage-numbers text-white">1</h4>
                </div>
                <div className="container first-section col-4 pt-4">
                  <h3 className="pt-2 text-white">Create an account</h3>
                  <p className="text-white">
                    Go to our Sign Up page and create an account there using
                    your email. You'll be able to create a username and password
                    for your account.
                  </p>
                  <Link to="/signup">
                    <button className="btn btn-white-styling align-center">
                      {" "}
                      Sign Up Now!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className=" p-3">
            <div className="d-flex m-2 pt-4 ">
              <div className="text-section second-section d-flex">
                <div className="container second-section col-3 pt-4">
                  <h4 className="homepage-numbers text-white">2</h4>
                </div>
                <div className="container second-section  text-white col-4 pt-4">
                  <h3 className="pt-2">Log your chore in 'My Chores'</h3>
                  <p className="pb-4">
                    In our custom built Chore tracking page you'll be able to
                    select the chore you about to complete. Once you're done,
                    you can add in the time it took.
                  </p>
                </div>
              </div>
              <div className="card radius-3px col-5">
                <img
                  src={laptopimglight}
                  className="home-img"
                  alt="home-img-light"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex m-2">
            <div className="card radius-3px col-5">
              <img src={laptopimg} className="home-img" alt="home-img-light" />
            </div>
            <div className="container third-section text-section d-flex pt-4">
              <div className="container third-section col-3 ">
                <h4 className="homepage-numbers text-white">3</h4>
              </div>
              <div className="container third-section col-4 pt-4">
                <h3 className="pt-2 text-white">Take a look at your metrics</h3>
                <p className="text-white">
                  Every chore you add will get added to your personal metrics
                  overview in your Dashboard.
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className=" p-3">
            <div className="d-flex m-2 pt-4 ">
              <div className="text-section fourth-section d-flex">
                <div className="container fourth-section col-3 pt-4">
                <h4 className="homepage-numbers text-white">4</h4>
              </div>
              <div className="container text-white col-4 pt-4">
                <h3 className="pt-2">Add yourself to a team</h3>
                <p className="pb-4">
                  See how you compare to other people on your team. Go to the
                  Team Metrics overview to add yourself to a team and see the
                  team's results.
                </p>
              </div>
              </div>
              <div className="card radius-3px col-5">
                <img
                  src={laptopimglight}
                  className="home-img"
                  alt="home-img-light"
                />
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>

  );
};
