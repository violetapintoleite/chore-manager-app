import React, { useContext, setStore } from "react";
import { Context } from "../store/appContext";
import { AddChoreForm } from "../component/choreForm";
import { HistoryofChores } from "../component/historyofChores";

export const History = () => {
  const { store, actions } = useContext(Context);
  console.log(store.email);
  return (
    <div className="w-25" style={{ margin: "0 auto" }}>
      <AddChoreForm />
      <br></br>
      <HistoryofChores />
    </div>
  );
};
