import React from 'react'
import flintstones from "../../img/flintstones.jpeg";
import addams from "../../img/addams.jpeg";
import incredibles from "../../img/incredibles.jpeg";
import simpsons from "../../img/simpsons.jpeg";


function HomepageTeamSection() {
  return (
    <div className='container text-center pb-2 pt-2'>
        <div className='row'>
        <div className='col-3 team-container p-3 '>
            <h4>The Flintstones</h4>
            <img className="img-thumbnail rounded team-image rounded-circle" src={flintstones}></img>
        </div>
        <div className='col-3 team-container p-3'>
            <h4>The Addams</h4>
            <img className="img-thumbnail rounded team-image  rounded-circle" src={addams}></img>
        </div>
        <div className='col-3 team-container p-3'>
            <h4>The Incredibles</h4>
            <img className="img-thumbnail team-image  rounded-circle" src={incredibles}></img>
        </div>
        <div className='col-3 team-container p-3'>
            <h4>The Simpsons</h4>
            <img className="img-thumbnail team-image  rounded-circle" src={simpsons}></img>
        </div>
        
    
    </div>
    </div>
  )
}

export default HomepageTeamSection