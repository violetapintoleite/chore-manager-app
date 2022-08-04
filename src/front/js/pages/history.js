import React from "react";
import { AddChoreForm } from "../component/choreForm";
import { HistoryofChores } from "../component/historyofChores";
import VideoSearch from "../component/YTSearch";

export const History = () => {
  return (
    <>
      <h1 className="text-center">Chores</h1>
      <div className="d-flex justify-content-center">
        <div className="alert alert-primary" role="alert">
          Add the chores you do using the left form and browse tutorials or
          music using the YouTube search on the right!
        </div>
      </div>
      <br></br>
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <AddChoreForm />
          <br></br>
          <HistoryofChores />
          <br></br>
        </div>
        <div className="col-md-auto">
          <VideoSearch></VideoSearch>
        </div>
      </div>
    </>
  );
};
