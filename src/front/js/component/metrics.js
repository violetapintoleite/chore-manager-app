import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const MetricsData = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getChoresByUserEmail(store.email);
  }, [store.email /*store.choreList*/]);

  // get total of chores done by type of chore

  var dishes = 0;
  var laundry = 0;
  var shopping = 0;
  var cleaning = 0;

  for (let i = 0; i < store.choreList.length; i++) {
    if (store.choreList[i].name === "Dishes") {
      dishes++;
    }
    if (store.choreList[i].name === "Laundry") {
      laundry++;
    }
    if (store.choreList[i].name === "Shopping") {
      shopping++;
    }
    if (store.choreList[i].name === "Cleaning") {
      cleaning++;
    }
  }

  // get total type spent on all chores

  function timestrToSec(timestr) {
    var parts = timestr.split(":");
    return parts[0] * 3600 + parts[1] * 60 + +parts[2];
  }

  function pad(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }

  function formatTime(seconds) {
    return [
      pad(Math.floor(seconds / 3600)),
      pad(Math.floor(seconds / 60) % 60),
      pad(seconds % 60),
    ].join(":");
  }
  var time = 0;
  for (let i = 0; i < store.choreList.length; i++) {
    var formatted = timestrToSec(store.choreList[i].duration);
    time += formatted;
  }
  var total_time = formatTime(time);
  console.log(total_time);
  return (
    <>
      <div className="card">
        <div className="card-header">Total times X chore</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {" "}
            Total times you did <strong>DISHES</strong>: {dishes}
          </li>
          <li className="list-group-item">
            Total times you did <strong>LAUNDRY</strong>: {laundry}
          </li>
          <li className="list-group-item">
            Total times you <strong>CLEANED</strong>: {cleaning}
          </li>
          <li className="list-group-item">
            Total times you <strong>SHOPPED</strong>: {shopping}
          </li>
        </ul>
      </div>
      <br></br>
      <div className="card">
        <div className="card-header">
          Total times spent on chores: {total_time.slice(0, -3)}H
        </div>
      </div>
    </>
  );
};
