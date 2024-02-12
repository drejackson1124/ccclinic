import React, { useEffect, useState } from "react";
import api from "../js/apis";
import moment from "moment";
import '../css/dashboard.css'
import DashSidebar from "./dashsidebar";

const Dashboard = (props) => {
    const [refillRequests, updateRefillRequests] = useState([]);
    const [consults, updateConsults] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [archived, updateArchived] = useState(0);

    const getRefillRequests = async() => {
        const response = await api.get_refill_requests();
        const parsed = JSON.parse(response.body);
        updateRefillRequests(parsed);
    }

    const isOlderThanTwoWeeks = (dateOfLastRefill) => {
        const twoWeeksAgo = moment().subtract(2, 'weeks');
        return moment(dateOfLastRefill).isBefore(twoWeeksAgo);
    };

    const getConsults = async() => {
        const response = await api.get_consult_requests();
        const parsed = JSON.parse(response.body);
        updateConsults(parsed);
        console.log(consults);
    }

    const markAsFulfilled = async (email) => {
        document.getElementById(`${email}#btn`).disabled = true;
        let response = await api.mark_as_fulfilled(email);
        if(response.statusCode !== 200){
            document.getElementById(`${email}#btn`).disabled = false;
        } else {
            fadeAwayDiv(`${email}#card`);
            updateArchived(prev => prev + 1);
        }
    }

    const consultFulfilled = async (email) => {
        document.getElementById(`${email}#consultbtn`).disabled = true;
        let response = await api.consult_fulfilled(email);
        if(response.statusCode !== 200){
            document.getElementById(`${email}#consultbtn`).disabled = false;
        } else {
            fadeAwayDiv(`${email}#consult-card`);
            updateArchived(prev => prev + 1);
        }
    }

    const fadeAwayDiv = (divId) => {
        const div = document.getElementById(divId);
        if (!div) return;
      
        div.style.opacity = '1';
        div.style.transition = 'opacity 0.5s ease-out, max-height 0.5s ease-out, margin 0.5s ease-out, padding 0.5s ease-out';
        div.style.height = `${div.offsetHeight}px`;
        div.style.maxHeight = `${div.offsetHeight}px`; 

        setTimeout(() => {
          div.style.opacity = '0';
          div.style.maxHeight = '0'; 
          div.style.margin = '0';
          div.style.padding = '0';
        }, 10); 
      
        setTimeout(() => {
          div.remove();
        }, 600); 
      };          
      

    useEffect(() => {
        getRefillRequests();
        getConsults();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-4 mt-4">
                    <DashSidebar archived={archived}/>
                </div>
                <div className="col-4">
                    <div className="card mt-4 mb-4">
                        <div className="card-title refill-requests-title">Refill Requests</div>
                        <form class="d-flex p-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn search-btn-outline" type="submit">Search</button>
                        </form>
                        <div className="card-body card-container">
                            {refillRequests.filter(v => !v.dateOfLastRefill || isOlderThanTwoWeeks(v.dateOfLastRefill)).length === 0 ? (
                                <h5 className="mt-3 text-center">No refill requests to show. When you get a request, it will show up here.</h5>
                            ) : ( 
                                refillRequests
                                .filter(v => !v.dateOfLastRefill || isOlderThanTwoWeeks(v.dateOfLastRefill))
                                .map((v) => {
                                    return (
                                        <div className="card mb-3" key={v.email} id={`${v.email}#card`}>
                                            <div className="card-body">
                                                <p><span className="dash-card-title">Patient Name:</span> {v.fname} {v.lname}</p>
                                                <p><span className="dash-card-title">Date Requested:</span> {moment(v.refillRequestDate).format('MMMM Do YYYY')}</p>
                                                <p><span className="dash-card-title">Time Requested:</span> {moment(v.refillRequestDate).format('h:mm a')}</p>
                                                {v.dateOfLastRefill === "" ? (
                                                    <p className=""><span className="dash-card-title">Last Refill:</span> <span id="no-refills-yet">Patient has no prior refills</span></p>
                                                ) : (
                                                    <div>
                                                        <p><span className="dash-card-title">Date of Last Refill:</span> {moment(v.dateOfLastRefill).format('MMMM Do YYYY')}</p>
                                                        <p><span className="dash-card-title">Time Fulfilled:</span> {moment(v.dateOfLastRefill).format('h:mm a')}</p>
                                                    </div>   
                                                )}
                                                <button id={`${v.email}#btn`} className="btn btn-md dash-fulfill-btn" onClick={() => {markAsFulfilled(v.email)}}>Mark as Fulfilled</button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                <div className="card mt-4 mb-4">
                        <div className="card-title refill-requests-title">Consult Requests</div>
                        <form class="d-flex p-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn search-btn-outline" type="submit">Search</button>
                        </form>
                        <div className="card-body card-container2">
                            {consults.filter(v => !v.archived).length === 0 ? (
                                <h5 className="mt-3 text-center">No consult requests to show. When you get a request, it will show up here.</h5>
                            ) : (
                                consults.map((v) => {
                                    return (
                                        <div className="card mb-3" key={v.email} id={`${v.email}#consult-card`}>
                                            <div className="card-body">
                                                <p><span className="dash-card-title">Patient Name:</span> {v.fname} {v.lname}</p>
                                                <p><span className="dash-card-title">Email:</span> {v.email}</p>
                                                <p><span className="dash-card-title">Phone:</span> {v.phone}</p>
                                                <button id={`${v.email}#consultbtn`} className="btn btn-md dash-fulfill-btn" onClick={()=>{ consultFulfilled(v.email) }}>Consult Scheduled</button>
                                            </div>
                                        </div>
                                    )
                                })                              
                            )} 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;