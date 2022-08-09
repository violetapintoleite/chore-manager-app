import React from 'react'
import flintstones from "../../img/flintstones.jpeg";
import addams from "../../img/addams.jpeg";
import incredibles from "../../img/incredibles.jpeg";
import simpsons from "../../img/simpsons.jpeg";



function HomepageTeamSection() {
  return (
    <>
    <div className='container text-center text-white pb-4 pt-4'>
    <h3 className='text-dark pb-2 home-page-card-titles'>Four Teams To Choose From</h3>
        <div className='row'>
            <div className='col-2'></div>
        <div className='col-2 m-1 team-container rounded p-3 '>
            <h5>The Flintstones</h5>
            <img className="img-thumbnail team-image rounded-circle" src={flintstones}></img>
        </div>
        <div className='col-2 m-1 team-container rounded p-3'>
            <h5>The Addams</h5>
            <img className="img-thumbnail  team-image  rounded-circle" src={addams}></img>
        </div>
        <div className='col-2 m-1 team-container rounded p-3'>
            <h5>The Incredibles</h5>
            <img className="img-thumbnail team-image  rounded-circle " src={incredibles}></img>
        </div>
        <div className='col-2 m-1 team-container rounded p-3 '>
            <h5>The Simpsons</h5>
            <img className="img-thumbnail team-image  rounded-circle" src={simpsons}></img>
        </div>
        <div className='col-2'></div>
    </div>
    </div>
    </>
  )
}

export default HomepageTeamSection