import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Applications.css'
import AppDetails from '../AppDetails/AppDetails';
export default function Applications() {

    const [applications, setApplications] = useState([])
    useEffect(() => {

        const fetchData = (async () => {
            // Axios GET request
            await axios.get('/getApplications', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}` 
                }
            })
                .then((response) => {
                // Handle successful response
                    // console.log(response.data); 
                    setApplications(response.data);
                    // response.data.map((obj) => {
                    //     console.log(obj);
                    // })
                })
                .catch((error) => {
                // Handle error
                console.error(error);
                });
        })

        fetchData();
        
        }, []);
  return (
    <>
        <div className="dashboard-cont">
            <div className="dash-head">
            {applications.length > 0 ? <center><h1>Applications</h1></center> : <h1>You dont have any Applicants</h1>}
            </div>
            {
                applications.map((application, key) => (
                    <div className="dash-order-1" key = {key}>
                    <AppDetails detail = {application}/>
                </div>
                ))
            }
        </div>
      
    </>
  )
}
