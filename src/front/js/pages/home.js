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
      <div className="home">
        <Navbar excludeFromHome={false} />
      </div>
      <div>
        <div className="quote-container">
          <div className="position-absolute top-50 start-50 translate-middle">
            <InspoQuote></InspoQuote>
            {/* <img src={Hpimagelight} className="home-img" alt="home-img-light"/> */}
            {/* <img src={Hpimagedark} className="home-img bg-image" id="intro" alt="home-img-dark"/> */}
            <br />
            <Link to="/signup">
              <button className="btn button-test btn-text position-relative bottom-0 start-50 translate-middle-x">
                {" "}
                Sign Up Now!
              </button>
            </Link>
          </div>
        </div>

        <div className="text-center bg-dark animated-div">
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
          {/* <div className="bg-light p-3">
              <br />
              <h2 className="cta-text bg-light mb-5 ">GET YOUR CHORES DONE</h2>
            </div> */}
          <div className=" first-section">
            <div className="d-flex m-2">
              <div className="card  radius-3px col-5">
                <img
                  src={laptopimg}
                  className="home-img"
                  alt="home-img-light"
                />
              </div>
              <div className="container  d-flex first-section radius-3px align-middle">
                <div className="container first-section col-3 pt-4 ">
                  <h4 className="homepage-numbers">1</h4>
                </div>
                <div className="container first-section col-4 pt-4">
                  <h3 className="pt-2">Create an account</h3>
                  <p>
                    Go to our Sign Up page and create an account there using
                    your email. You'll be able to create a username and password
                    for your account.
                  </p>
                  <Link to="/signup">
                    <button className="btn btn-text align-center">
                      {" "}
                      Sign Up Now!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark p-3">
            <div className="d-flex m-2 pt-4">
              <div className="container bg-dark col-3 pt-4">
                <h4 className="homepage-numbers text-white">2</h4>
              </div>
              <div className="container bg-dark text-white col-3 pt-4">
                <h3 className="pt-2">Log your chore in 'My Chores'</h3>
                <p>
                  In our custom built Chore tracking page you'll be able to
                  select the chore you about to complete. Once you're done, you
                  can add in the time it took.
                </p>
              </div>
              <div className="col-1"></div>
              <div className="card radius-3px col-5">
                <img
                  src={laptopimglight}
                  className="home-img"
                  alt="home-img-light"
                />
              </div>
            </div>
          </div>

          <div className="d-flex m-2">
            <div className="card radius-3px col-5">
              <img src={laptopimg} className="home-img" alt="home-img-light" />
            </div>
            <div className="container third-section d-flex pt-4">
              <div className="container third-section col-3 ">
                <h4 className="homepage-numbers">3</h4>
              </div>
              <div className="container third-section col-4 pt-4">
                <h3 className="pt-2">Take a look at your metrics</h3>
                <p>
                  Every chore you add will get added to your personal metrics
                  overview in your Dashboard.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-dark p-3">
            <div className="d-flex m-2 pt-4">
              <div className="container bg-dark col-3 pt-4">
                <h4 className="homepage-numbers text-white">4</h4>
              </div>
              <div className="container text-white col-3 ">
                <h3 className="pt-2">Add yourself to a team</h3>
                <p>
                  See how you compare to other people on your team. Go to the
                  Team Metrics overview to add yourself to a team and see the
                  team's results.
                </p>
              </div>
              <div className="col-1"></div>
              <div className="card radius-3px col-5">
                <img
                  src={laptopimglight}
                  className="home-img"
                  alt="home-img-light"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="">
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
        </div> */
}
