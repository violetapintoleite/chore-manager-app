import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { TeamMetrics } from "../component/teamMetrics";
import AddToTeam from "../component/AddToTeam";

export const TeamMetricsPage = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="text-center">
      <h1 className="display-4">These are your team metrics</h1>
      {!store.team ? (
        <div>
          <p className="lead">
            If you haven't signed up for a team yet, choose one from the
            dropdown below and have clarity on all the team chore stats!
          </p>
          <div className="w-25" style={{ margin: "0 auto" }}>
            <AddToTeam></AddToTeam>
          </div>
        </div>
      ) : (
        <div>
          <p className="lead">
            Your team is <strong>{store.team}</strong>. Check out your stats
            below on the charts!
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => actions.deleteUserFromTeam()}
          >
            Remove myself from the team
          </button>
          <TeamMetrics />
        </div>
      )}
    </div>
  );
};
