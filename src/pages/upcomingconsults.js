import React, { useEffect, useState } from "react";
import api from "../js/apis";
import moment from "moment";
import '../css/upcomingconsult.css';
import Spinner from "./spinner";

const UpcomingConsults = ({ consults, onConsultUpdate }) => {
    const [flag, setFlag] = useState('');
    const filteredConsults = consults.filter(v => v.dateOfConsult);

    const consultsWithinWeek = consults.filter(consult => {
        if (!consult.dateOfConsult || consult.archived) return false; 
        const consultDate = moment(consult.dateOfConsult);
        const now = moment();
        const oneWeekFromNow = moment().add(1, 'weeks');
        return consultDate.isAfter(now) && consultDate.isBefore(oneWeekFromNow);
    });


    useEffect(() => {
        console.log(consultsWithinWeek);
        if(consultsWithinWeek.length > 0){
            setTimeout(() => {
                setFlag(true);
            }, 2000);
        } else {
            setTimeout(() => {
                setFlag(false);
            }, 2000);
        }
    }, [])


    const requestRefill = async (incEmail, index) => {
        let response = await api.send_refill_request({email: incEmail});
        if (response.statusCode === 200){
                let response = await api.archive_consult_request({email: incEmail});
                if(response.statusCode !== 200){
                    console.log(response);
                    alert('Something went wrong. Please try again.');
                } else {
                    alert('Patient moved to refill requests section.');
                    fadeAwayDiv(`${index}#uc`);
                    // onConsultUpdate();
                }
        } else {
            console.log(response);
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

    return (
        <div className="container">
            {flag === '' ? (
                <div className="text-center mt-5">
                    <Spinner/>
                </div>
            ) : (
                <div className="row">
                <div className="col-12">
                    {flag === true ? (
                        <div class="row row-cols-1 row-cols-md-2 g-4 mt-1">
                           {consultsWithinWeek.map((v, index) => {
                                return (
                                    <div class="col" id={`${index}#uc`}>
                                    <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{v.fname} {v.lname}</h5>
                                        <p class="card-text">
                                            <div><span className="uc-title">Consult Date:</span> {moment(v.dateOfConsult).format('MMMM Do YYYY')}</div>
                                            <div><span className="uc-title">Consult Time:</span> {moment(v.dateOfConsult).format('h:mm a')}</div>
                                        </p>
                                        <button className="btn btn-md btn-success me-2" id="refill-button" onClick={() => {
                                            requestRefill(v.email, index);
                                        }}>Accept</button>
                                    </div>
                                    </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (<h5 className="text-center mt-5">Nothing to show</h5>)}
                </div>
            </div>
            )}
        </div>
    )
}

export default UpcomingConsults;