import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const MetricsData = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getChoresByUserEmail(store.email);
  }, [store.email /*store.choreList*/]);

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

  var time = 0;
  for(let i=0; i<store.choreList.length; i++){
    time += store.choreList[i].duration
    console.log(time)
  }

  return (
    <>
      <div>Total times you did <strong>DISHES</strong>: {dishes}</div>
      <div>Total times you did <strong>LAUNDRY</strong>: {laundry}</div>
      <div>Total times you <strong>CLEANED</strong>: {cleaning}</div>
      <div>Total times you <strong>SHOPPED</strong>: {shopping}</div>
    </>
  );
};
