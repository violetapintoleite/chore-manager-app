import React, { useContext, useEffect } from 'react'
import { Context } from "../store/appContext";

function AddToTeam() {

  const { store, actions } = useContext(Context);

    // note will need to add conditional that if there is a team selected then to remove the dropdown option
  // team cannot be saved only to state, needs to be passed and fetched from the backend
  //add this to the flux file and set store

const handleSubmit = () => {
  actions.postTeam()
};

    return (
    <div>
      <h2>Select a team</h2>
      <div className="container mb-2">
        <div class="input-group">
        <select
          class="form-select"
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option selected>Choose your team...</option>
          <option value="Panda">Panda</option>
          <option value="Fox">Fox</option>
          <option value="Bald Eagle">Bald Eagle</option>
          <option value="Mountain Goat">Mountain Goat</option>
        </select>
        <button class="btn btn-outline-secondary" type="button" onClick="">
          Confirm
        </button>
        </div>
      </div>
    </div>
  );
}

export default AddToTeam;
