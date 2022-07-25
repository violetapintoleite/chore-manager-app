import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";

function AddToTeam() {

  const { store, actions } = useContext(Context);
  const [teamName, setTeamName] = useState("");

 



const handleSubmit = () => {
  actions.postTeam(teamName, store.email)
};

console.log("Selected team is:", teamName);

    return (
    <div>
      <h2>Select a team</h2>
      <div className="container mb-2">
      { !store.team || store.team == "" ? (
        <form>
          <div class="input-group">
            
          <select
            class="form-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          >
            <option selected>Choose your team...</option>
            <option value="Panda">Panda</option>
            <option value="Fox">Fox</option>
            <option value="Bald Eagle">Bald Eagle</option>
            <option value="Mountain Goat">Mountain Goat</option>
          </select>
          <button class="btn btn-outline-secondary" type="button" onClick={handleSubmit}>
            Confirm
          </button>          
          </div>
        </form>
        ) : (<p>""</p>)   }  
      </div>
    </div>
  );
}

export default AddToTeam;
