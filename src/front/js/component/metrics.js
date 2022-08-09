import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import "../../styles/modules/metricsdata.css";

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
    <div className="container">
      <div class="row">
        <div class="col-6">
          <div className="row m-2">
            <div class="card m-2">
              <div className="card-body">
                You did a total of <strong>{total_amount_of_chores}</strong>{" "}
                chores, which took a total of{" "}
                <strong>{total_time.slice(0, -3)}H</strong>.
              </div>
            </div>
          </div>
          <div className="row m-2">
            <div class="card m-2">
              <div class="card-body">
                <div className="row text-center">
                  <div className="col-3">
                    {" "}
                    <div class="dishes">
                      Dishes <span className="numbers">{dishes}</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div class="laundry">
                      Laundry <span className="numbers">{laundry}</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div class="cleaning">
                      Cleaning <span className="numbers">{cleaning}</span>
                    </div>
                  </div>
                  <div className="col-3">
                    <div class="shopping">
                      Shopping <span className="numbers">{shopping}</span>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="row m-2">
            <div class="card m-2">
              <div class="card-body">
                <div className="row text-center">
                  <div className="col-3">
                    {" "}
                    <div class="dishes">
                      <span className="numbers">{dishes_min}</span>min
                    </div>
                  </div>
                  <div className="col-3">
                    <div class="laundry">
                      <span className="numbers">{laundry_min}</span>min
                    </div>
                  </div>
                  <div className="col-3">
                    <div class="cleaning">
                      <span className="numbers">{cleaning_min}</span>min
                    </div>
                  </div>
                  <div className="col-3">
                    <div class="shopping">
                      <span className="numbers">{shopping_min}</span>min
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 mt-4">
          <div class="row">
            <div className="col card m-2 p-3">
              <Doughnut
                datasetIdKey="id"
                data={{
                  labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
                  datasets: [
                    {
                      id: 1,
                      label: "Amount of times you did each chore",
                      data: [dishes, laundry, cleaning, shopping],
                      backgroundColor: [
                        "rgba(240, 126, 110, 0.8)",
                        "rgba(132, 205, 250, 0.8)",
                        "rgba(90, 209, 205, 0.8)",
                        "rgb(154, 121, 251, 0.8)",
                      ],
                      borderColor: [
                        "rgba(240, 126, 110, 1)",
                        "rgba(132, 205, 250, 1)",
                        "rgba(90, 209, 205, 1)",
                        "rgb(154, 121, 251, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "NUMBER OF TIMES YOU DID THE CHORE",
                    },
                  },
                }}
              />
            </div>
            <div className="col card m-2 p-3">
              <Doughnut
                datasetIdKey="id"
                data={{
                  labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
                  datasets: [
                    {
                      id: 1,
                      label: "Amount of times you did each chore",
                      data: [
                        dishes_min,
                        laundry_min,
                        cleaning_min,
                        shopping_min,
                      ],
                      backgroundColor: [
                        "rgba(240, 126, 110, 0.8)",
                        "rgba(132, 205, 250, 0.8)",
                        "rgba(90, 209, 205, 0.8)",
                        "rgb(154, 121, 251, 0.8)",
                      ],
                      borderColor: [
                        "rgba(240, 126, 110, 1)",
                        "rgba(132, 205, 250, 1)",
                        "rgba(90, 209, 205, 1)",
                        "rgb(154, 121, 251, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "MIN SPENT DOING EACH CHORE TYPE",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
