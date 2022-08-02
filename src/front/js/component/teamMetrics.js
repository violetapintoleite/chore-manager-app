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

  for (let i = 0; i < users.length; i++) {
    const user_chore_data = getUserChoreData(
      store.teamChoreList.filter((chore) => chore.user_id === users[i])
    );
    users_datasets_total_times.push({
      label: user_chore_data.user_name,
      data: user_chore_data.total_amount_of_chores,
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
    });
    users_datasets_duration.push({
      label: user_chore_data.user_name,
      data: user_chore_data.total_time_spent,
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
    });
  }

  return (
    <>
      <div class="d-flex justify-content-center">
        {" "}
        <div
          className="card m-5"
          style={{
            width: "50%",
            height: "100%",
          }}
        >
          <div className="card-header">
            Total chores you and your team did : {total_amount_of_chores}
          </div>
          <Bar
            datasetIdKey="id"
            data={{
              labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
              datasets: users_datasets_total_times,
            }}
          />
        </div>
        <div
          className="card m-5"
          style={{
            width: "50%",
            height: "100%",
          }}
        >
          <div className="card-header">
            Total time you and your team spent on all chores:{" "}
            {total_time.slice(0, -3)}H
          </div>

          <Bar
            datasetIdKey="id"
            data={{
              labels: ["Dishes", "Laundry", "Cleaning", "Shopping"],
              datasets: users_datasets_duration,
            }}
          />
        </div>
      </div>
    </>
  );
};
