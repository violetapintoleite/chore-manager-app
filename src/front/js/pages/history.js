import React, { useEffect } from "react";
import { AddChoreForm } from "../component/choreForm";
import { HistoryofChores } from "../component/historyofChores";

export const History = () => {
  return (
    <div className="w-25" style={{margin: "0 auto"}}>
      
      <AddChoreForm />
      <br></br>
      <HistoryofChores />
    </div>
  );
};
