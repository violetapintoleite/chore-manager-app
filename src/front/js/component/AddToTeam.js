import React, { useContext, useState, useEffect } from 'react'
import { Context } from "../store/appContext";

function AddToTeam() {

  const { store, actions } = useContext(Context);
  const [teamName, setTeamName] = useState("");

  const handleSubmit = () => {
  actions.postTeam(teamName, store.email)
};

console.log("Selected team is:", teamName);
console.log(store.team);

// need to add a useEffect with getTeam function with a GET request to make sure 
// users who already have a team do not get the option to add another

useEffect(() => {
  if (store.email){
    actions.getTeamByUserEmail(store.email);
  }
}, [store.email]);


    return (
    <div>
      { !store.team || store.team == "" ? (
      <div className="container mb-2">
      <h2>Select a team</h2>
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
      </div>
      ) : (<p></p>)   }  
    </div>
  );
}

export default AddToTeam;
