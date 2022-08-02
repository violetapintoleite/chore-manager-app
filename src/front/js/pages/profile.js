import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import YTiframe from "../component/YTiframe";

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
      <h5 className="text-center">
        Welcome back <strong>{store.email}</strong>!
      </h5>
      
      <div className="card">
        
        <VideoSearch></VideoSearch>
      </div>
    </div>
  );
}

export default Profile;
