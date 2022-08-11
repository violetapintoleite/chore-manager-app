import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { TeamMetrics } from "../component/teamMetrics";
import AddToTeam from "../component/AddToTeam";

export const TeamMetricsPage = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.email) {
      actions.getTeamByUserEmail(store.email);
    }
  }, [store.email]);
  return (
    <div className="text-center">
      <h1>Team Metrics</h1>
      {!store.team ? (
        <div>
          <div className="d-flex justify-content-center">
            <div className="alert alert-primary" role="alert">
              Choose a team from the dropdown below and have clarity on all the
              team members stats!
            </div>
          </div>
          <p></p>
          <div className="w-25" style={{ margin: "0 auto" }}>
            <AddToTeam></AddToTeam>
          </div>
        </div>
      ) : (
        <div>
          <p>
            Your team is <strong>{store.team}</strong>.
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
