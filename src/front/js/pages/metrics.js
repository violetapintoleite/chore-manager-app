import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { MetricsData } from "../component/metrics";

export const Metrics = () => {
  const { store, actions } = useContext(Context);
  console.log(store.choreList);
  useEffect(() => {
    actions.getChoresByUserEmail(store.email);
  }, [store.email /*store.choreList*/]);
  return (
    <div>
      <h1 className="text-center">These are your chore metrics!</h1>
      {!store.choreList || store.choreList.length === 0 ? (
        <p className="text-center">
          There are no chores to show metrics for. Add some chores on "My
          Chores" view.
        </p>
      ) : (
        <>
          <p className="text-center">
            Check out how many times you did each chore and how long you spent
            with each chore type.
          </p>
          <MetricsData />
        </>
      )}
    </div>
  );
};
