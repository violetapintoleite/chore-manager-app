import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import YTiframe from "../component/YTiframe";
import VideoSearch from "../component/YTSearch";
import { MetricsData } from "../component/metrics";
import "../../styles/modules/dashboard.css";

function Profile() {
  const { store, actions } = useContext(Context);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    actions.getChoresByUserEmail(store.email);
  }, [store.email /*store.choreList*/]);

  //redirect to the /login page if there is no token present
  if (!token || token == "" || token == undefined) navigate("/login");

  return (
    <div className="text-center">
      <h5 className="m-5 slide-in-fwd-center">
      <i className="fas fa-hand-sparkles"></i>Hello <strong>{store.email}</strong>!
        <i className="fas fa-hand-sparkles"></i>
      </h5>
      {!store.choreList || store.choreList.length === 0 ? (
        <div className="d-flex justify-content-center">
          <div className="alert alert-warning w-50 text-center" role="alert">
            Start adding chores in the "My Chores" view!
          </div>
        </div>
      ) : (
        <>
          <MetricsData />
        </>
      )}
    </div>
  );
}

export default Profile;
