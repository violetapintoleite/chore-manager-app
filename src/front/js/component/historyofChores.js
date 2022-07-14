import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const HistoryofChores = () => {
  const { store, actions } = useContext(Context);

  /*useEffect(() => {
    teste = store.choreList.length;
  }, [store.choreList]);

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
        ? store.choreList.map((listEntry, i) => {
            return (
              <>
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{listEntry.chore}</h5>
                      <small>{listEntry.date}</small>
                    </div>
                    <small>{listEntry.duration}H</small>
                  </a>
                </div>
              </>
            );
          })
        : "Add a chore"}
    </>
  );
};
