import React from "react";
import '../css/questionnaire.css';
import { Link } from 'react-router-dom';

const InitialQuestionnaire = (props) => {

    return (
        <div className="container-fluid quest-container">
            <div className="row text-center mt-4 mb-2">
                <div className="col-12">
                    <h3 className="initial-quest-title1">What Would You Like To Do Today?</h3>
                </div>
            </div>
            <div className="row text-center p-3 quest-options-row">
            <div class="col-sm-6 mb-3 mb-sm-0">
                <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title initial-quest-title">Schedule A Consult</h5>
                    <p class="card-text initial-quest-text">Embarking on your wellness journey begins with a conversation. 
                    Schedule a consultation with our experienced team to discuss your health goals and 
                    how we can support you. Together, we'll craft a personalized plan tailored to your needs, 
                    ensuring you're on the path to achieving and maintaining your ideal wellness.</p>
                    <Link to='/sched-consultation' class="btn quest-button btn-lg">Schedule Consultation</Link>
                </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title initial-quest-title">Refill Your Prescription</h5>
                    <p class="card-text initial-quest-text">Continuity is key to progress. Easily refill your 
                    prescription through our streamlined service to ensure your health regimen 
                    remains uninterrupted. Whether you're at home or on the go, we've made it convenient 
                    to get the medications you need, when you need them, without missing a beat on your journey 
                    to wellness.</p>
                    <Link to='/request-refill' class="btn quest-button btn-lg">Refill Prescription</Link>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default InitialQuestionnaire;