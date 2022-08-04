import React, { Component } from "react";

export const Footer = () => (
  <div className="container my-5">
    <footer className="text-center text-lg-start ">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">About</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" />
              <p className="footer-text">
                We help you to get your chores done and track the time you spend, either
                by yourself or as a team.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Features</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" />
              <p className="footer-text">Chore Track</p>

              <p className="footer-text">Individual & Team Analytics</p>
              <p className="footer-text">Video Search</p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" />
              <p>
                <a href="#!" className="">
                  Dashboard
                </a>
              </p>
              <p>
                <a href="#!" className="">
                  Become an Affiliate
                </a>
              </p>
              <p>
                <a href="#!" className="">
                  Invite someone else
                </a>
              </p>
              <p>
                <a href="mailto:help@choremanager.com" className="">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" />

              <p>
                <i className="fas fa-envelope"></i> info@choremanager.com
              </p>

              <p>
                <section className="d-flex justify-content-between p-4">
                  <div>
                    <a href="https://www.facebook.com/" className=" me-4">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="" className=" me-4">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="" className=" me-4">
                      <i className="fab fa-google"></i>
                    </a>
                    <a href="" className=" me-4">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="" className=" me-4">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="" className=" me-4">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </section>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-3">
        © 2022 Copyright:
        <a className="" href="/">
          {" "}
          Chore Manager
        </a>
      </div>
    </footer>
  </div>
);
