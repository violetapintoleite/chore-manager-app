import React from "react";
import { TeamMetrics } from "../component/teamMetrics";

export const TeamMetricsPage = () => {
  return (
    <div className="jumbotron">
      <h1>These are your team metrics</h1>

      <TeamMetrics />
    </div>
  );
};
