import React, { useEffect, useState } from "react";
import api from "../js/apis";
import { useNavigate } from "react-router-dom";


const DashSidebar = ({archived, upcomingConsults, defaultView, addEmployee}) => {
    const [archives, updateArchives] = useState([]);
    const [consults, setConsults] = useState([]);
    const navigate = useNavigate();

    const getConsultsWithinWeek = async () => {
        let response = await api.get_consults();
        let parsed = JSON.parse(response.body);
        setConsults(parsed);
    }

    const getArchived = async () => {
        let response = await api.get_archived_requests();
        let parsed = JSON.parse(response.body);
        updateArchives(parsed);
    }

    useEffect(() => {
        getArchived();
        getConsultsWithinWeek();
    }, []);

    useEffect(() => {
        getArchived();
        getConsultsWithinWeek();
    }, [archived]);

    return (
        <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action" aria-current="true">
            Archived Requests ({archives.length})
        </button>
        <button type="button" class="list-group-item list-group-item-action" onClick={defaultView}>Refill & Consult Requests</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={upcomingConsults}>Upcoming Consultations ({consults.length})</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={addEmployee}>Add a User</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={() => { localStorage.removeItem('user'); navigate('/') }}>Log Out</button>
        </div>
    )
}

export default DashSidebar;