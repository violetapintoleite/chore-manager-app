import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const AddChoreForm = () => {
  const { actions } = useContext(Context);
  const [chore, setChore] = useState();
  const [date, setDate] = useState();
  const [duration, setDuration] = useState();

  function addChore() {
    if (chore && date && duration) {
      actions.setChoreList(chore, date, duration);
    }
  }

  return (
    <form className="add-a-chore">
      <div className="mb-3">
        <select
          className="form-select"
          aria-label="Default select example"
          value={chore || ""}
          onChange={(e) => setChore(e.target.value)}
        >
          <option selected>Select a chore</option>
          <option value="Dishes">Dishes</option>
          <option value="Laundry">Laundry</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <div className="mb-3">
        <input
          type="date"
          className="form-control"
          value={date || ""}
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <input
          type="time"
          className="form-control"
          value={duration || ""}
          onChange={(e) => setDuration(e.target.value)}
        ></input>
      </div>
      <button type="button" className="btn btn-primary" onClick={addChore}>
        Add a chore
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => actions.deleteAllChores()}
      >
        Clear List
      </button>
    </form>
  );
};
