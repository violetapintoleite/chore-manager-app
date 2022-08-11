import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Bar } from "react-chartjs-2";

export const TeamMetrics = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.team) {
      actions.getChoresfromUsersInTeam(store.team);
    }
  }, [store.team]);

  // functions to format duration value
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

  function secondsToMinutes(seconds) {
    var minutes = Math.floor(seconds / 60);
    return minutes;
  }

  // get total of chores done by type of chore and total of time spent by type of chore
  var dishes = 0;
  var laundry = 0;
  var shopping = 0;
  var cleaning = 0;
  var time = 0;
  var dishes_time = 0;
  var cleaning_time = 0;
  var shopping_time = 0;
  var laundry_time = 0;

  for (let i = 0; i < store.teamChoreList.length; i++) {
    var formatted = timestrToSec(store.teamChoreList[i].duration);
    time += formatted;
    if (store.teamChoreList[i].name === "Dishes") {
      var formatDishes = timestrToSec(store.teamChoreList[i].duration);
      dishes_time += formatDishes;
      dishes++;
    }
    if (store.teamChoreList[i].name === "Laundry") {
      var formatLaundry = timestrToSec(store.teamChoreList[i].duration);
      laundry_time += formatLaundry;
      laundry++;
    }
    if (store.teamChoreList[i].name === "Shopping") {
      var formatShopping = timestrToSec(store.teamChoreList[i].duration);
      shopping_time += formatShopping;
      shopping++;
    }
    if (store.teamChoreList[i].name === "Cleaning") {
      var formatCleaning = timestrToSec(store.teamChoreList[i].duration);
      cleaning_time += formatCleaning;
      cleaning++;
    }
  }

  var total_amount_of_chores = dishes + laundry + shopping + cleaning;
  var total_amount_of_chores_arr = [dishes, laundry, cleaning, shopping];
  var total_time = formatTime(time);
  var dishes_min = secondsToMinutes(dishes_time);
  var laundry_min = secondsToMinutes(laundry_time);
  var cleaning_min = secondsToMinutes(cleaning_time);
  var shopping_min = secondsToMinutes(shopping_time);
  var total_time_spent_arr = [
    dishes_min,
    laundry_min,
    cleaning_min,
    shopping_min,
  ];

  // a list of teh existing users in the team by user id
  var users_datasets_total_times = [];
  var users_datasets_duration = [];
  var users = [];

  for (let i = 0; i < store.teamChoreList.length; i++) {
    if (!users.includes(store.teamChoreList[i].user_id)) {
      users.push(store.teamChoreList[i].user_id);
    }
  }
  console.log(users);

  // an object with each user's array of chores
  var grouped = store.teamChoreList.reduce(function (r, a) {
    r[a.user_id] = r[a.user_id] || [];
    r[a.user_id].push(a);
    return r;
  }, Object.create(null));

  console.log(grouped);

  function getUserChoreData(user_chores) {
    var dishes = 0;
    var laundry = 0;
    var shopping = 0;
    var cleaning = 0;
    var time = 0;
    var dishes_time = 0;
    var cleaning_time = 0;
    var shopping_time = 0;
    var laundry_time = 0;

    for (let i = 0; i < user_chores.length; i++) {
      var formatted = timestrToSec(user_chores[i].duration);
      time += formatted;
      if (user_chores[i].name === "Dishes") {
        var formatDishes = timestrToSec(user_chores[i].duration);
        dishes_time += formatDishes;
        dishes++;
      }
      if (user_chores[i].name === "Laundry") {
        var formatLaundry = timestrToSec(user_chores[i].duration);
        laundry_time += formatLaundry;
        laundry++;
      }
      if (user_chores[i].name === "Shopping") {
        var formatShopping = timestrToSec(user_chores[i].duration);
        shopping_time += formatShopping;
        shopping++;
      }
      if (user_chores[i].name === "Cleaning") {
        var formatCleaning = timestrToSec(user_chores[i].duration);
        cleaning_time += formatCleaning;
        cleaning++;
      }
    }
    var dishes_min = secondsToMinutes(dishes_time);
    var laundry_min = secondsToMinutes(laundry_time);
    var cleaning_min = secondsToMinutes(cleaning_time);
    var shopping_min = secondsToMinutes(shopping_time);

    return {
      total_amount_of_chores: [dishes, laundry, cleaning, shopping],
      total_time_spent: [dishes_min, laundry_min, cleaning_min, shopping_min],
      user_name: user_chores[0].user_name,
    };
  }

  const colors = [
    "rgb(60, 179, 113, 0.2)",
    "rgb(238, 130, 238, 0.2)",
    "rgb(255, 165, 0, 0.2)",
    "rgb(106, 90, 205, 0.2)",
    "rgb(255, 165, 0, 0.2)",
    "rgb(106, 90, 205, 0.2)",
    "rgb(250, 250, 0, 0.2)",
    "rgb(0, 255, 255, 0.2)",
    "rgb(60, 60, 113, 0.2)",
    "rgb(238, 113, 113, 0.2)",
    "rgb(106, 60, 60, 0.2)",
    "rgb(106, 90, 205, 0.2)",
  ];

  for (let i = 0; i < users.length; i++) {
    const user_chore_data = getUserChoreData(
      store.teamChoreList.filter((chore) => chore.user_id === users[i])
    );

    users_datasets_total_times.push({
      label: user_chore_data.user_name,
      data: user_chore_data.total_amount_of_chores,
      backgroundColor: [colors[i]],
    });
    users_datasets_duration.push({
      label: user_chore_data.user_name,

      data: user_chore_data.total_time_spent,
      backgroundColor: [colors[i]],
    });
  }

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-3">
          <div class="card m-2">
            <div className="card-body">
              Total chores done: <strong>{total_amount_of_chores}</strong>
            </div>

          </div>
        </div>
        <div className="col-sm-3">
          <div class="card m-2">
            <div className="card-body">
              Total time spent: <strong>{total_time.slice(0, -3)}H</strong>.
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6">
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
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-6">
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

      <div class="row justify-content-center">
        <div className="col-sm-6">
          <div className="card mb-5 p-3">
            <Bar
              datasetIdKey="id"
              data={{
                labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
                datasets: users_datasets_total_times,
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "NUMBER OF TIMES A CHORE WAS DONE",
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="card mb-5 p-3">
            <Bar
              datasetIdKey="id"
              data={{
                labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
                datasets: users_datasets_duration,
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "MIN SPENT BY TYPE OF CHORE",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
