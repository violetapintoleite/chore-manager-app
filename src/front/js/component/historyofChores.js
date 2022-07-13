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

  return(<>
  {store.choreList.length > 0 ? (
   store.choreList.map((listEntry, i) => {
    return (<>
    
        <ul>
            
            <li>{listEntry.date}</li>
            <li>{listEntry.duration}H</li>
            <li>{listEntry.chore}</li>
        </ul>
        
    
    
    </>
    )
  })

  
  ):("Add a chore")}
  </>)
  
};
