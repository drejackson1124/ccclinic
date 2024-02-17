import React, { useEffect, useState } from "react";
import api from "../js/apis";
import { useNavigate } from "react-router-dom";


const DashSidebar = ({archived, upcomingConsults, defaultView, addEmployee, getConsults, getRefills}) => {
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

    const refreshConsults = async () => {

    }

    const refreshRefills = async () => {
        await getRefills();
    }

    useEffect(() => {
        getArchived();
        getConsultsWithinWeek();
    }, []);

    useEffect(() => {
        getArchived();
        getConsultsWithinWeek();
    }, [archived]);

    const filteredConsults = consults.filter(v => !v.archived);

    return (
        <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action" aria-current="true">
            Archived Requests ({archives.length})
        </button>
        <button type="button" class="list-group-item list-group-item-action" onClick={defaultView}>Refill & Consult Requests</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={upcomingConsults}>Upcoming Consultations ({filteredConsults.length})</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={addEmployee}>Add a User</button>
        <button type="button" class="list-group-item list-group-item-action" onClick={() => { localStorage.removeItem('user'); navigate('/') }}>Log Out</button>
        </div>
    )
}

export default DashSidebar;