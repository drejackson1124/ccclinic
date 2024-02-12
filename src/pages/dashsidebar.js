import React, { useEffect, useState } from "react";
import api from "../js/apis";

const DashSidebar = ({archived}) => {
    const [archives, updateArchives] = useState([]);

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

    return (
        <div class="list-group">
        <button type="button" class="list-group-item list-group-item-action" aria-current="true">
            Archived Requests ({archives.length})
        </button>
        <button type="button" class="list-group-item list-group-item-action">Schedule Consultation</button>
        <button type="button" class="list-group-item list-group-item-action">Upcoming Consultations</button>
        <button type="button" class="list-group-item list-group-item-action">Refills Overdue (1)</button>
        <button type="button" class="list-group-item list-group-item-action">Add a User</button>
        <button type="button" class="list-group-item list-group-item-action">Log Out</button>
        </div>
    )
}

export default DashSidebar;