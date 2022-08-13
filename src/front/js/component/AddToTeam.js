import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

function AddToTeam() {
  const { store, actions } = useContext(Context);
  const [teamName, setTeamName] = useState("");

  const handleSubmit = () => {
    actions.postTeam(teamName, store.email);
  };

  console.log("Selected team is:", teamName);
  console.log(store.team);

  // need to add a useEffect with getTeam function with a GET request to make sure
  // users who already have a team do not get the option to add another

  useEffect(() => {
    if (store.email) {
      actions.getTeamByUserEmail(store.email);
    }
  }, [store.team]);

  return (
    <div>
      {!store.team || store.team == "" ? (
        <div className="container mb-2">
          <form>
            <div className="input-group">
              <select

                className="form-select"

                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              >



                <option value>Choose your team...</option>

                <option value="The Flinstones">The Flinstones</option>
                <option value="The Addams">The Addams</option>
                <option value="The Simpsons">The Simpsons</option>
                <option value="The Incredibles">The Incredibles</option>
              </select>
              <button
                className="btn btn-outline-secondary"

                type="button"
                onClick={handleSubmit}
              >
                Join
              </button>
            </div>
          </form>
        </div>
      ) : (

        <p>
          <button className="btn" onClick={() => actions.deleteUserFromTeam()}>
            Remove myself from the team
          </button>
        </p>

      )}
    </div>
  );
}

export default AddToTeam;
