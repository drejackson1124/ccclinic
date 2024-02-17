import React, { useEffect, useState } from "react";
import api from "../js/apis";
import moment from "moment";
import '../css/upcomingconsult.css';
import Spinner from "./spinner";

const UpcomingConsults = (props) => {
    const [consults, setConsults] = useState([]);
    const [flag, setFlag] = useState('');

    const getConsultsWithinWeek = async () => {
        let response = await api.get_consults();
        let parsed = JSON.parse(response.body);
        setConsults(parsed);
        if(parsed.length > 0){
            setTimeout(() => {
                setFlag(true);
            }, 2000);
        } else {
            setTimeout(() => {
                setFlag(false);
            }, 2000);
        }
    }


    useEffect(() => {
        getConsultsWithinWeek();
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

    const filteredConsults = consults.filter(v => !v.archived);

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
                           {filteredConsults.map((v, index) => {
                                return (
                                    <div class="col">
                                    <div class="card" id={`${index}#uc`}>
                                    <div class="card-body">
                                        <h5 class="card-title">{v.fname} {v.lname}</h5>
                                        <p class="card-text">
                                            <div><span className="uc-title">Consult Date:</span> {moment(v.dateOfConsult).format('MMMM Do YYYY')}</div>
                                            <div><span className="uc-title">Consult Time:</span> {moment(v.dateOfConsult).format('h:mm a')}</div>
                                        </p>
                                        <button className="btn btn-md btn-success me-2" id="refill-button" onClick={() => {
                                            requestRefill(v.email, index);
                                        }}>Accept</button>
                                        <button className="btn btn-md btn-danger" id="refill-button" onClick={() => {

                                        }}>Reject</button>
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