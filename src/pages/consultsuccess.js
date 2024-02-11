import React from "react";
import '../css/consultsuccess.css';
import { Link } from "react-router-dom";

const ConsultSuccess = () => {

    return (
        <div className="container">
            <div className="row mt-5 mb-3">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <h3 className="consult-success-title text-center">Consultation Request Successfully Submitted!</h3>
                </div>
            </div>
                <div className="col-lg-12 col-md-12 col-sm-12 text-center mb-5">
                    <p className="consult-success-subtext">
                    Thank you for taking the first step towards a healthier, more vibrant life with us. 
                    Your consultation request has been successfully submitted, and our team is eager to connect with you. 
                    While you await our response, we encourage you to visit our FAQs page where you'll find helpful information 
                    about our processes, what to expect during your consultation, and answers to common questions our clients have. 
                    This information is designed to make your journey with us as smooth and transparent as possible. We look forward 
                    to guiding you on your path to wellness soon!
                    </p>
                    <Link to='/' className="btn btn-lg consult-success-btn">Home</Link>
                </div>
        </div>
    )
}

export default ConsultSuccess;