import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import YTiframe from "../component/YTiframe";
import AddToTeam from "../component/AddToTeam";
import VideoSearch from "../component/YTSearch";

function Profile() {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(store.team);

  //redirect to the /login page if there is no token present
  if (!token || token == "" || token == undefined) navigate("/login");

  return (
    <div>
      <h5>Logged in as {store.username}</h5>
      <AddToTeam></AddToTeam>
      <div className="card">
      
      {/* {!store.team ? (<p></p>) : (
        <h2>Your team is {store.team}</h2>)
      } */}
        <VideoSearch></VideoSearch>
      </div>
    </div>
  );
}

export default Profile;
