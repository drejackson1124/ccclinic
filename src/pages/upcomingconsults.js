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
                           {consults.map((v) => {
                                return (
                                    <div class="col">
                                    <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{v.fname} {v.lname}</h5>
                                        <p class="card-text">
                                            <div><span className="uc-title">Consult Date:</span>{moment(v.dateOfConsult).format('MMMM Do YYYY')}</div>
                                            <div><span className="uc-title">Consult Time:</span>{moment(v.dateOfConsult).format('h:mm a')}</div>
                                        </p>
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