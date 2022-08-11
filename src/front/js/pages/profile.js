import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import AddToTeam from "../component/AddToTeam";
import VideoSearch from "../component/YTSearch";

import { MetricsData } from "../component/metrics";
import "../../styles/modules/dashboard.css";
import { TeamMetrics } from "../component/teamMetrics";
import AddToTeam from "../component/AddToTeam";
import { Link } from "react-router-dom";


function Profile() {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 
  useEffect(() => {

    actions.getChoresByUserEmail(store.email);

    if (store.email) {
      actions.getTeamByUserEmail(store.email);
    }

  }, [store.email /*store.choreList*/]);

  console.log("username", store.username, store.email);

  //redirect to the /login page if there is no token present
  if (!token || token == "" || token == undefined) navigate("/login");

  // create date to show on top of the dasboard
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (

    <div className="body">
      <div className="name-and-date text-end p-2">
        <h5 className="welcome">Welcome back, {store.email}!</h5>
        <h6 className="date"> Today is the {today}</h6>
      </div>

      <div className="card m-5">
        <div className="single-metrics">
          <h4 className="metrics-title text-center m-5">YOUR SINGLE METRICS</h4>
          {!store.choreList || store.choreList.length === 0 ? (
            <div className="text-center">
              <Link to="/history">
                <button className="btn m-2 ">Add your first chore!</button>
              </Link>
            </div>
          ) : (
            <span></span>
          )}
          <MetricsData />
        </div>
        <div className="team-metrics">
          <h4 className="metrics-title text-center m-5">YOUR TEAM METRICS</h4>
          {!store.team ? (
            <div className="d-flex justify-content-center">
              <AddToTeam></AddToTeam>
            </div>
          ) : (
            <div>
              <h4 className="team text-center mb-3">{store.team}</h4>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => actions.deleteUserFromTeam()}
                >
                  Remove myself from the team
                </button>
              </div>
              <TeamMetrics />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Profile;
