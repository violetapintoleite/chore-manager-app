import React from "react";
import { AddChoreForm } from "../component/choreForm";
import { HistoryofChores } from "../component/historyofChores";

export const History = () => {

  return (
    <div className="container">
      <AddChoreForm />
      <HistoryofChores />
    </div>
  );
};
