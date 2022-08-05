import React from 'react'
import "../../styles/modules/slideanimationtext.css";

function Play() {
  return (
    <div>
    <div className='animation-div d-flex justify-content-center'>
        <div className="perspective-text card">
          <div className="perspective-line">
            <p className="banner-text-test"></p>
            <p className="banner-text-test">Get</p>
          </div>
          <div className="perspective-line">
            <p className="banner-text-test">Get</p>
            <p className="banner-text-test">Your</p>
          </div>
          <div className="perspective-line">
            <p className="banner-text-test">Your</p>
            <p className="banner-text-test">Chores</p>
          </div>
          <div className="perspective-line">
            <p className="banner-text-test">Chores</p>
            <p className="banner-text-test">Done</p>
          </div>
          <div className="perspective-line">
            <p className="banner-text-test">Done</p>
            <p className="banner-text-test"></p>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Play
