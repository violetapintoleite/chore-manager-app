import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/modules/hometext.css";
import "../../styles/modules/homepage.css";
import "../../styles/modules/slideanimationtext.css";
import Play from "../pages/playaround.js";
import InspoQuote from "../component/inspoQuote";
import laptopimg from "../../../front/img/laptopimg.jpg";
import laptopimglight from "../../../front/img/laptopimglight.jpg";
import "../../styles/modules/buttonstyles.css";
import { Navbar } from "../component/navbar";
import HomepageTeamSection from "../component/homepageTeamSection";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="">
        <Navbar excludeFromHome={false} />
      </div>
      {/* quote api */}
      <div className="overflow">
       {/* animated text */}
       <div className="text-center animated-div container-fluid">
          <div className="pb-3 bg-white">
            <div className="animation-div container-fluid d-flex">
              <div className="perspective-text mb-5">
                <div className="perspective-line ">
                  <p className=" banner-text-test perspective-text "></p>
                  <p className=" banner-text-test perspective-text">Get</p>
                </div>
                <div className="perspective-line">
                  <p className=" banner-text-test perspective-text">Get</p>
                  <p className=" banner-text-test perspective-text">Your</p>
                </div>
                <div className="perspective-line">
                  <p className="banner-text-test perspective-text">Your</p>
                  <p className="banner-text-test perspective-text">Chores</p>
                </div>
                <div className="perspective-line">
                  <p className=" banner-text-test perspective-text">Chores</p>
                  <p className="banner-text-test perspective-text">Done</p>
                </div>
                <div className="perspective-line">
                  <p className="banner-text-test perspective-text">Done</p>
                  <p className="banner-text-test perspective-text"></p>
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* end of animation */}
          <div className="container arrows-container">
          <div class="arrow">
                <span></span>
                <span></span>
                <span></span>
          </div>
          </div>
        {/* <div className="container-fluid quote-container">
          <div className=" ">
            <InspoQuote></InspoQuote>
          </div>
        </div> */}
        {/*cards section */}
        <div className="">
          <div className="d-flex m-2 homepage-card-container ">
            <div className="card bg-white shadow-none radius-3px col-5 ">
              <img
                src={laptopimg}
                className="home-img home-img-appear"
                alt="home-img-light"
              />
            </div>
            <div className="container d-flex text-section first-section align-middle pb-4">
              <div className="container first-section  col-3 pt-4 ">
                <h4 className="homepage-numbers text-white">1</h4>
              </div>
              <div className="container first-section col-4 pt-4">
                <h2 className="pt-2 home-page-card-titles text-white">Create an account</h2>
                <p className=" pt-4 pb-2 home-page-text text-white">
                  Go to our Sign Up page and create an account there using your
                  email. You'll be able to create a username and password for
                  your account.
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

        <div className="pb-2">
          <div className="d-flex m-2 pt-3 homepage-card-container ">
            <div className="text-section second-section d-flex">
              <div className="container second-section col-3 pt-4">
                <h4 className="homepage-numbers text-white">2</h4>
              </div>
              <div className="container second-section home-page-text text-white col-4 pt-4">
                <h2 className="pt-2 home-page-card-titles">Log your chore in 'My Chores'</h2>
                <p className=" pt-4 pb-4">
                  In our custom built Chore tracking page you'll be able to
                  select the chore you about to complete. Once you're done, you
                  can add in the time it took.
                </p>
              </div>
            </div>
            <div className="card radius-3px shadow-none col-5">
              <img
                src={laptopimglight}
                className="home-img home-img-appear  "
                alt="home-img-light"
              />
            </div>
          </div>
        </div>

        <div className="d-flex homepage-card-container m-2">
          <div className="card radius-3px shadow-none col-5">
            <img
              src={laptopimg}
              className="home-img home-img-appear"
              alt="home-img-light"
            />
          </div>
          <div className="container third-section text-section d-flex pt-4">
            <div className="container third-section col-3 ">
              <h4 className="homepage-numbers text-white">3</h4>
            </div>
            <div className="container third-section  col-4 pt-4">
              <h2 className="pt-2 text-white home-page-card-titles">Take a look at your metrics</h2>
              <p className="pt-4 text-white home-page-text">
                Every chore you add will get added to your personal metrics
                overview in your Dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <div className="d-flex homepage-card-container m-2 pt-4 ">
            <div className="text-section fourth-section d-flex">
              <div className="container fourth-section col-3 pt-4">
                <h4 className="homepage-numbers text-white">4</h4>
              </div>
              <div className="container text-white col-4 pt-4">
                <h2 className="home-page-card-titles pt-2">Add yourself to a team</h2>
                <p className=" pt-4 home-page-text pb-4">
                  See how you compare to other people on your team. Go to the
                  Team Metrics overview to add yourself to a team and see the
                  team's results.
                </p>
              </div>
            </div>
            <div className="card radius-3px shadow-none col-5">
              <img
                src={laptopimglight}
                className="home-img home-img-appear"
                alt="home-img-light"
              />
            </div>
          </div>
        </div>
        <hr />
        <br />
        <Play></Play>

        <HomepageTeamSection></HomepageTeamSection>
        <hr />
      </div>
    </>
  );
};
