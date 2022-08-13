import React from "react";
import { AddChoreForm } from "../component/choreForm";
import { HistoryofChores } from "../component/historyofChores";
import VideoSearch from "../component/YTSearch";
import InspoQuote from "../component/inspoQuote";

export const History = () => {
  return (
    <>
      <h1 className="text-center">Add a Chore</h1>
      <div className="d-flex justify-content-center">
        <div className="alert alert-primary" role="alert">
          Add the chores you do using the form and browse tutorials or music
          using the YouTube search!
        </div>
      </div>
      <br></br>
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <VideoSearch></VideoSearch>
        </div>
        <div className="col-md-auto">
          <AddChoreForm />
          <br></br>
          <HistoryofChores />
          <hr />
          <br></br>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <InspoQuote></InspoQuote>
      </div>
    </>
  );
};
