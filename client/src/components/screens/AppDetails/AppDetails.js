import React, { useEffect, useState } from 'react'
import './AppDetails.css'

export default function AppDetails(props) {
    // console.log(props.detail);
  return (
    <>
        {<div className="od-cont">
                {/* <div><h2>Opportunity Title: {props.detail.title}</h2> </div>
                <div><h4> Type: {props.detail.opptype}</h4> </div>
                <div> <h4>Location: {props.detail.location}</h4> </div>
                <div> <h3>Name: {props.detail.applicant}</h3> </div>
                <div> <h4>Email: {props.detail.email}</h4> </div> */}

            <div className="od-sec-1">
                <div className="od-sec-1-p1"><h5>Opportunity Title: {props.detail.title}</h5> </div>
                <div className="od-sec-1-p2" ><h5> Type: {props.detail.opptype}</h5> </div>
                <div className="od-sec-1-p3"> <h5>Location: {props.detail.location}</h5> </div>
            </div>

            <div className="od-sec-2">
                <div className="od-sec-2-p1"> <h5>Name: {props.detail.applicant}</h5> </div>
                <div className="od-sec-2-p2"> <h5>Email: {props.detail.email}</h5> </div>
            </div>
        </div>}
    </>
  )
}
