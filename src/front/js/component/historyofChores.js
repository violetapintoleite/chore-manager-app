import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const HistoryofChores = () => {
  const { store, actions } = useContext(Context);

  function deleteChore(chore_id) {
    console.log(chore_id);
    actions.deleteChoresByUserEmail(chore_id);
  }

  useEffect(() => {
    actions.getChoresByUserEmail(store.email);
  }, [store.email /*store.choreList*/]);

  /*return (
    <div className="container">
      {teste >= 1 && <p>im real</p>}
      <p>{teste}</p>
      {store.choreList.map((listEntry, i) => {
        return (<>
        <p>{listEntry.chore}</p>
        </>
        )
      })

      }
    </div>
  );*/

  return (
    <>
      {store.choreList.length > 0
        ? store.choreList
            .slice(0)
            .reverse()
            .map((listEntry, i) => {
              return (
                <>
                  <div class="list-group">
                    <a
                      href="#"
                      class="list-group-item list-group-item-action"
                      aria-current="true"
                    >
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{listEntry.name}</h5>
                        <small>{listEntry.date.slice(0, -13)}</small>
                      </div>
                      <div class="d-flex w-100 justify-content-between">
                        <small>{listEntry.duration.slice(0, -3)}H</small>
                        <button
                          type="button"
                          class="btn-close"
                          aria-label="Close"
                          onClick={() => deleteChore(listEntry.id)}
                        ></button>
                      </div>
                    </a>
                  </div>
                </>
              );
            })
        : "Add a chore"}
    </>
  );
};
