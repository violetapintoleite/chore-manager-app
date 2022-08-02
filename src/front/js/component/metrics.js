import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PolarArea } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

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
  var time = 0;
  var dishes_time = 0;
  var cleaning_time = 0;
  var shopping_time = 0;
  var laundry_time = 0;

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
  for (let i = 0; i < store.choreList.length; i++) {
    var formatted = timestrToSec(store.choreList[i].duration);
    time += formatted;
    if (store.choreList[i].name === "Dishes") {
      var formatDishes = timestrToSec(store.choreList[i].duration);
      dishes_time += formatDishes;
      dishes++;
    }
    if (store.choreList[i].name === "Laundry") {
      var formatLaundry = timestrToSec(store.choreList[i].duration);
      laundry_time += formatLaundry;
      laundry++;
    }
    if (store.choreList[i].name === "Shopping") {
      var formatShopping = timestrToSec(store.choreList[i].duration);
      shopping_time += formatShopping;
      shopping++;
    }
    if (store.choreList[i].name === "Cleaning") {
      var formatCleaning = timestrToSec(store.choreList[i].duration);
      cleaning_time += formatCleaning;
      cleaning++;
    }
  }

  function secondsToMinutes(seconds) {
    var minutes = Math.floor(seconds / 60);
    return minutes;
  }

  var total_amount_of_chores = dishes + laundry + shopping + cleaning;
  var total_time = formatTime(time);
  var dishes_min = secondsToMinutes(dishes_time);
  var laundry_min = secondsToMinutes(laundry_time);
  var cleaning_min = secondsToMinutes(cleaning_time);
  var shopping_min = secondsToMinutes(shopping_time);

  return (
    <>
      <div class="d-flex justify-content-center">
        <div
          className="card m-5"
          style={{
            width: "50%",
            height: "50%",
          }}
        >
          <div className="card-header">
            Total chores you did : {total_amount_of_chores}
          </div>
          <PolarArea
            datasetIdKey="id"
            data={{
              labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
              datasets: [
                {
                  id: 1,
                  label: "Amount of times you did each chore",
                  data: [dishes, laundry, cleaning, shopping],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            
          />
        </div>
        <div
          className="card m-5"
          style={{
            width: "50%",
            height: "50%",
          }}
        >
          <div className="card-header">
            Total time spent on all chores: {total_time.slice(0, -3)}H
          </div>

          <PolarArea
            datasetIdKey="id"
            data={{
              labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
              datasets: [
                {
                  id: 1,
                  label: "Amount of times you did each chore",
                  data: [dishes_min, laundry_min, cleaning_min, shopping_min],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            
          />
        </div>
      </div>
    </>
  );
};
