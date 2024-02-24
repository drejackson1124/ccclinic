import React, { useEffect, useState } from "react";
import api from "../js/apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const DashSidebar = ({archived, upcomingConsults, defaultView, addEmployee, consults, updateConsults}) => {
    const [archives, updateArchives] = useState([]);
    const navigate = useNavigate();

    const consultsWithinWeek = consults.filter(consult => {
        if (!consult.dateOfConsult || consult.archived) return false; 
        const consultDate = moment(consult.dateOfConsult);
        const now = moment();
        const oneWeekFromNow = moment().add(1, 'weeks');
        return consultDate.isAfter(now) && consultDate.isBefore(oneWeekFromNow);
    });

    const getArchived = async () => {
        let response = await api.get_archived_requests();
        let parsed = JSON.parse(response.body);
        updateArchives(parsed);
    }

    useEffect(() => {
        getArchived();
    }, []);

    useEffect(() => {
        getArchived();
    }, [archived]);

    useEffect(() => {
        updateConsults(consults);
    }, [consults]);

    return (
        <div class="list-group">
        {/* <button type="button" class="list-group-item list-group-item-action" aria-current="true">
            Archived Requests ({archives.length})
        </button> */}
        <button type="button" class="list-group-item list-group-item-action" onClick={defaultView}>Refill & Consult Requests</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={upcomingConsults}>Upcoming Consultations ({consultsWithinWeek.length})</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={addEmployee}>Add a User</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={() => { localStorage.removeItem('jwtToken'); navigate('/') }}>Log Out</button>
        </div>
    )
}

export default DashSidebar;