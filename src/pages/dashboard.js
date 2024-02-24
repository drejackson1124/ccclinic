import React, { useEffect, useRef, useState } from "react";
import api from "../js/apis";
import moment from "moment";
import '../css/dashboard.css'
import DashSidebar from "./dashsidebar";
import UpcomingConsults from "./upcomingconsults";
import { Modal } from 'bootstrap';
import Spinner from "./spinner";
import AddEmployee from "./addemployee";
import { useNavigate } from "react-router-dom";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const [refillRequests, updateRefillRequests] = useState([]);
    const [consults, updateConsults] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [archived, updateArchived] = useState(0);
    const [currentView, setCurrentView] = useState('refillRequests');
    const modalRef = useRef(null);
    const modalRef2 = useRef(null);
    const modalRef3 = useRef(null);
    const [appointments, setAppointments] = useState([]);
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [userDetails, setUserDetails] = useState([]);
    const [ISODate, updateISODate] = useState('');
    const [friendlyDate, updateFriendlyDate] = useState('');
    const [flag, setFlag] = useState('');
    const [flag2, setFlag2] = useState('');
    const [patientDetails, setPatientDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPageRefills, setCurrentPageRefills] = useState(1);
    const [itemsPerPageRefills, setItemsPerPageRefills] = useState(2);
    const [hiddenConsults, setHiddenConsults] = useState(new Set());
    const filteredConsults = consults ? consults.filter(v => !v.dateOfConsult) : [];
    const isOlderThanTwoWeeks = (dateOfLastRefill) => {
        const twoWeeksAgo = moment().subtract(2, 'weeks');
        return moment(dateOfLastRefill).isBefore(twoWeeksAgo);
    };
    const filteredRefillRequests = refillRequests.filter(v => 
        v.refillRequestDate && 
        (!v.dateOfLastRefill || isOlderThanTwoWeeks(v.dateOfLastRefill))
    );

    const totalPages = Math.ceil(filteredConsults.length / itemsPerPage);
    const totalPagesRefills = Math.ceil(filteredRefillRequests.length / itemsPerPageRefills);

 
    const nextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };


    const prevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const nextPageRefills = () => {
        setCurrentPageRefills(currentPageRefills => Math.min(currentPageRefills + 1, totalPagesRefills));
    };


    const prevPageRefills = () => {
        setCurrentPageRefills(currentPageRefills => Math.max(currentPageRefills - 1, 1));
    };


    const currentData = filteredConsults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const currentDataRefills = filteredRefillRequests.slice(
        (currentPageRefills - 1) * itemsPerPageRefills,
        currentPageRefills * itemsPerPageRefills
    );

    const showModal = () => {
        const myModalElement = document.getElementById('schedule-consult-modal');
        const modal = new Modal(myModalElement);
        modal.show();
        modalRef.current = modal;
    };

    const showConfirmModal = () => {
        const myModalElement = document.getElementById('confirm-appt-modal');
        const modal = new Modal(myModalElement);
        modal.show();
        modalRef2.current = modal;
    };

    const showPatientDetailsModal = () => {
        const myModalElement = document.getElementById('user-details-modal');
        const modal = new Modal(myModalElement);
        modal.show();
        modalRef3.current = modal;
    };

    const closeModal = () => {
        if(modalRef.current){
            modalRef.current.hide();
        }
    };

    const closeModal2 = () => {
        if(modalRef2.current){
            modalRef2.current.hide();
        }
    };

    const closeModal3 = () => {
        if(modalRef3.current){
            modalRef3.current.hide();
        }
    };

    const scheduleConsult = async (obj) => {
        let response = await api.schedule_consult();
        let parsed = JSON.parse(response.body);
        setAppointments(parsed);
        setUserDetails([obj]);
        showModal();
    }

    const sendConsultEmail = async () => {
        let newObj = {
            name: userDetails[0].name,
            email: userDetails[0].email,
            phone: userDetails[0].phone,
            date: friendlyDate
        }
        let response = api.send_scheduled_consult(newObj);
        let result = response.data;
    }

    const appointmentMoments = appointments.map(appointment => 
        moment(appointment.dateOfConsult)
    );

    const isTimeSlotAvailable = (date, hour) => {
        return !appointmentMoments.some(appointmentMoment => 
        appointmentMoment.isBetween(
            moment(date).hour(hour).subtract(1, 'hours'),
            moment(date).hour(hour).add(1, 'hours')
        )
        );
    };

    const generateTimeSlotsForWeek = (weekOffset) => {
        const startOfWeek = moment().add(weekOffset, 'weeks').startOf('isoWeek');
        const endOfWeek = moment().add(weekOffset, 'weeks').endOf('isoWeek');
        let timeSlotsForWeek = [];
    
        let currentDate = startOfWeek.clone();
    
        while (currentDate.isSameOrBefore(endOfWeek)) {
            // Skip Sundays
            if (currentDate.day() !== 0) {
                for (let hour = 9; hour <= 17; hour++) {
                    // Check availability and within business hours
                    if (isTimeSlotAvailable(currentDate, hour)) {
                        let isoFormattedDateTime = currentDate.clone().hour(hour).toISOString();
                        timeSlotsForWeek.push(isoFormattedDateTime);
                    }
                }
            }
            currentDate.add(1, 'days');
        }
    
        return timeSlotsForWeek;
    };
    
    const [weekTimeSlots, setWeekTimeSlots] = useState([]);


    const organizeTimeSlotsByDay = (availableTimeSlots) => {
        const groupedByDay = {};
    
        availableTimeSlots.forEach(isoDateTime => {
            const dayKey = moment(isoDateTime).format('dddd');
            const dateSubtext = moment(isoDateTime).format('MMMM Do YYYY');
            
            if (!groupedByDay[dayKey]) {
                groupedByDay[dayKey] = {
                    dateSubtext: dateSubtext,
                    times: []
                };
            }
    
            groupedByDay[dayKey].times.push(isoDateTime);
        });
    
        return groupedByDay;
    };

    useEffect(() => {
        const updatedTimeSlots = generateTimeSlotsForWeek(currentWeekOffset);
        setWeekTimeSlots(updatedTimeSlots);
    }, [appointments, currentWeekOffset]);
    
    const timeSlotsByDay = organizeTimeSlotsByDay(weekTimeSlots);
    
    const renderTimeSlotsByDay = () => {
        const now = moment(); 
        const startOfWeek = moment().add(currentWeekOffset, 'weeks').startOf('isoWeek');
        const endOfWeek = moment().add(currentWeekOffset, 'weeks').endOf('isoWeek');
    
        return Object.entries(timeSlotsByDay).map(([day, { dateSubtext, times }]) => {
            const dayMoment = moment(times[0]); 
            const isDayPassed = dayMoment.isBefore(now, 'day'); 
        
            if (isDayPassed) {
                return (
                    <div className="card mb-3">
                        <div className="card-title text-center pt-3 schedule-appt-title">{day}</div>
                        <div className="card-body">
                            <p className="text-muted text-center">This day's scheduling has passed.</p>
                        </div>
                    </div>
            );
            }

            const timesThisWeek = times.filter(isoDateTime => 
                moment(isoDateTime).isBetween(startOfWeek, endOfWeek)
            );
    
            return (
                <div key={day} className={`card mb-3 ${dayMoment.isBefore(now, 'day') ? 'day-passed' : ''}`}>
                    <div className="card-title text-center pt-3 schedule-appt-title">{day}</div>
                    <p className="appt-subtext text-center">{dateSubtext}</p>
                    <div className="card-body">
                    {timesThisWeek.map(isoDateTime => {
                        const timeMoment = moment(isoDateTime);
                        const isTimePassed = now.isAfter(timeMoment) || now.isSame(timeMoment, 'hour');
                        return (
                            <div key={isoDateTime} className={`time-slot card mb-3 ${isTimePassed ? 'time-passed' : ''}`}>
                                <div className="card-body" onClick={() => {
                                    updateISODate(isoDateTime);
                                    updateFriendlyDate(moment(isoDateTime).format('MMMM Do YYYY, h:mm a'));
                                    showConfirmModal();
                                }}>
                                    {timeMoment.format('h:mm A')}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            );
        });
    };
    
    

    const handlePreviousWeek = () => {
        if(currentWeekOffset !== 0){
            setCurrentWeekOffset(currentWeekOffset - 1);
        }
    };

    const handleNextWeek = () => {
        setCurrentWeekOffset(prevOffset => {
            const newOffset = prevOffset + 1;
            return newOffset;
        });
    };
    
    const getRefillRequests = async() => {
        const response = await api.get_refill_requests();
        const parsed = JSON.parse(response.body);
        updateRefillRequests(parsed);
    }

    const getConsults = async() => {
        const response = await api.get_consult_requests();
        const parsed = JSON.parse(response.body);
        updateConsults(parsed);
    }

    const markAsFulfilled = async (email) => {
        document.getElementById(`${email}#btn`).disabled = true;
        let response = await api.mark_as_fulfilled(email);
        if(response.statusCode !== 200){
            console.log(response);
            document.getElementById(`${email}#btn`).disabled = false;
        } else {
            fadeAwayDiv(`${email}#card`);
            updateArchived(prev => prev + 1);
        }
    }

    const consultFulfilled = async (email, consultDate) => {
        document.getElementById(`${email}#consultbtn`).disabled = true;
        let response = await api.consult_fulfilled(email, consultDate);
        let response2 = sendConsultEmail();
        if(response.statusCode !== 200){
            document.getElementById(`${email}#consultbtn`).disabled = false;
        } else {
            fadeAwayDiv(`${email}#consult-card`);
            updateArchived(prev => prev + 1);
            await getConsults();
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
      
        // setTimeout(() => {
        //   div.remove();
        // }, 600); 
      };  


    const requestsView = (
        <div className="container-fluid">
        <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card mt-4 mb-4 dashboard-card-container">
                <div className="card-title refill-requests-title">Refill Requests</div>
                <form class="d-flex p-3" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn search-btn-outline" type="submit">Search</button>
                </form>
                <div className="card-body card-container">
                    {flag === '' ? (
                        <div className="text-center mt-3">
                            <Spinner/>
                        </div>
                    ) : (
                        <div>
                            {filteredRefillRequests.length === 0 ? (
                                    <h5 className="mt-3 text-center">No refill requests to show. When you get a request, it will show up here.</h5>
                            ) : ( 
                                filteredRefillRequests
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
                                                <button id={`${v.email}#btn`} className="btn btn-md dash-fulfill-btn" onClick={() => {markAsFulfilled(v.email)}}>Ready to Collect</button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )}
                </div>
                <div className="pagination-controls mb-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-md dashboard-paginatio-btn" onClick={prevPageRefills} disabled={currentPageRefills === 1}>Previous</button>
                    <button className="btn btn-md dashboard-paginatio-btn" onClick={nextPageRefills} disabled={currentPageRefills === totalPagesRefills}>Next</button>
                </div>
            </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
        <div className="card mt-4 mb-4 dashboard-card-container">
                <div className="card-title refill-requests-title">Consult Requests</div>
                <form class="d-flex p-3" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn search-btn-outline" type="submit">Search</button>
                </form>
                <div className="card-body card-container2">
                    {flag2 === '' ? (
                        <div className="text-center mt-3">
                            <Spinner/>
                        </div>
                    ) : (
                        <div>
                            {flag2 === false ? (
                                <h5 className="mt-3 text-center">No consult requests to show. When you get a request, it will show up here.</h5>
                            ) : (
                                currentData.map((v, index) => {
                                    if(!v.dateOfConsult){
                                        return (
                                            <div className="card mb-3" key={v.email} id={`${v.email}#consult-card`}>
                                                <div className="card-body">
                                                    <p><span className="dash-card-title">Patient Name:</span> {v.fname} {v.lname}</p>
                                                    <p><span className="dash-card-title">Email:</span> {v.email}</p>
                                                    <p><span className="dash-card-title">Phone:</span> {v.phone}</p>
                                                    {v.birthdate ? (
                                                        <div>
                                                        <button id={`${v.email}#consultbtn`} className="btn btn-md dash-fulfill-btn me-3" onClick={()=>{ 
                                                            scheduleConsult({name: v.fname + ' ' + v.lname, email: v.email, phone: v.phone});
                                                        }}>Schedule Consult</button>
                                                        <button className=" btn btn-md view-record-btn" onClick={() => {
                                                            setPatientDetails(v);
                                                            showPatientDetailsModal();
                                                        }}>View Record</button>
                                                        </div>
                                                    ) : (
                                                        <button id={`${v.email}#consultbtn`} className="btn btn-md dash-fulfill-btn" onClick={()=>{ 
                                                            scheduleConsult({name: v.fname + ' ' + v.lname, email: v.email, phone: v.phone});
                                                            }}>Schedule Consult</button>          
                                                        )}
                                                </div>
                                            </div>
                                        )
                                    }
                                })                              
                            )}
                        </div>
                    )}
                </div>
                <div className="pagination-controls mb-3 d-flex justify-content-center gap-2">
                    <button className="btn btn-md dashboard-paginatio-btn" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    <button className="btn btn-md dashboard-paginatio-btn" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
        </div>
    </div>
    );

    const handleConsultUpdate = async () => {
        const getConsultUpdate = await getConsults(); 
        updateConsults(getConsultUpdate);
    };

    const upcomingConsultationsView = (
        <UpcomingConsults consults={consults} onConsultUpdate={handleConsultUpdate}/>
    )

    const addEmployeeView = (
        <AddEmployee/>
    )

    const renderCurrentView = () => {
        switch (currentView) {
            case 'upcomingConsultations':
                return upcomingConsultationsView;
            case 'requestsView':
                return requestsView;
            case 'addEmployeeView':
                return addEmployeeView;
            default:
                return requestsView;
        }
    };


    const handleUpcomingConsultationsClick = () => {
        setCurrentView('upcomingConsultations');
    };

    const handleRequestsClick = () => {
        getRefillRequests();
        getConsults();
        setCurrentView('requestsView');
    };

    const handleAddEmployeeClick = () => {
        setCurrentView('addEmployeeView');
    }

    useEffect(() => {
        if(!api.getToken()){
            navigate('/provider');
        }
        getRefillRequests();
        getConsults();
        
        if(filteredRefillRequests.length > 0){
            setTimeout(() => {
                setFlag(true);
            }, 3000)
        } else {
            setTimeout(() => {
                setFlag(false);
            }, 3000)
        }

        if(filteredConsults.length > 0){
            setTimeout(() => {
                setFlag2(false);
            }, 3000)
        } else {
            setTimeout(() => {
                setFlag2(true);
            }, 3000)
        }
    }, []);

    useEffect(() => {
        const newTimeSlots = generateTimeSlotsForWeek(currentWeekOffset);
        setWeekTimeSlots(newTimeSlots);
    }, [currentWeekOffset]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12 mt-4">
                    <DashSidebar updateConsults={updateConsults} consults={consults} getRefills={getRefillRequests} getConsults={getConsults} archived={archived} addEmployee={handleAddEmployeeClick} upcomingConsults={handleUpcomingConsultationsClick} defaultView={handleRequestsClick}/>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12" id="dynamic-container">
                    {renderCurrentView()}
                </div>
            </div>
            <div className="row">
            <div class="modal fade schedule-consult-modal" id="schedule-consult-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <div className="mb-3 d-flex justify-content-center w-100">
                        <button className="btn btn-lg navigate-btn me-4" onClick={handlePreviousWeek}>Previous Week</button>
                        <button className="btn btn-lg navigate-btn" onClick={handleNextWeek}>Next Week</button>
                    </div>
                </div>
                <div class="modal-body p-5">
                    {renderTimeSlotsByDay()}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn close-schedule" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div className="row">
            <div class="modal fade confirm-appt-modal" id="confirm-appt-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirm Appointment Details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5">
                    {userDetails.map((v) => {
                        return (
                            <div>
                                <p><span className="confirm-text">Name:</span> {v.name}</p>
                                <p><span className="confirm-text">Email:</span> {v.email}</p>
                                <p><span className="confirm-text">Phone:</span> {v.phone}</p>
                                <p><span className="confirm-text">Appointment Date:</span> {friendlyDate}</p>
                            </div>
                        )
                    })}
                </div>
                <div class="modal-footer">
                    <button id="OneClose" type="button" class="btn close-schedule" data-bs-dismiss="modal">Close</button>
                    <button id="OneConfirm" type="button" class="btn navigate-btn" onClick={() => {
                        document.getElementById("OneClose").classList.add('disabled');
                        document.getElementById("OneConfirm").classList.add('disabled');
                        consultFulfilled(userDetails[0].email, ISODate);
                        setTimeout(() => {
                            closeModal();
                        }, 300)                        
                        setTimeout(() => {
                            closeModal2();
                        }, 500)
                    }}>Confirm</button>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div className="row">
            <div class="modal fade user-details-modal" id="user-details-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userDetailsLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="userDetailsLabel">Details for {patientDetails.fname} {patientDetails.lname}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5">
                    <h6><span className="patient-details">Email:</span> {patientDetails.email}</h6>
                    <h6><span className="patient-details">Phone Number:</span> {patientDetails.phone}</h6>
                    <h6><span className="patient-details">Birth Date:</span> {patientDetails.birthdate}</h6>
                    <h6><span className="patient-details">Height:</span> {patientDetails.height}</h6>
                    <h6><span className="patient-details">Weight:</span> {patientDetails.weight}</h6>
                    <h6><span className="patient-details">History of Thyromedullary Cancer:</span> {patientDetails.tc}</h6>
                    <h6><span className="patient-details">History of Multiple Endocrine Neoplasm:</span> {patientDetails.men}</h6>
                    <h6><span className="patient-details">History of Pancreatitis:</span> {patientDetails.panc}</h6>
                    <h6><span className="patient-details">Allergies:</span> {patientDetails.allergies}</h6>
                    <h6><span className="patient-details">Medical History:</span> {patientDetails.mh}</h6>
                </div>
                <div class="modal-footer">
                    <button id="patientDetailsClose" type="button" class="btn patientDetailsClose" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Dashboard;