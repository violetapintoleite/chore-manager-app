import React from "react";

function AddToTeam() {
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
          <option value="1">Panda</option>
          <option value="2">Fox</option>
          <option value="3">Bald Eagle</option>
          <option value="4">Mountain Goat</option>
        </select>
        <button class="btn btn-outline-secondary" type="button">
          Confirm
        </button>
        </div>
      </div>
    </div>
  );
}

export default AddToTeam;
