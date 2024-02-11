import React, { useRef, useState } from "react";
import api from "../js/apis";
import moment from "moment";
import { Modal } from 'bootstrap';
import { useNavigate } from "react-router-dom";
import '../css/refills.css';

const Refills = (props) => {
    const [isButtonDisabled, updateButtonDisabled] = useState(false);
    const [id, updateId] = useState('');
    const today = moment().format();
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const requestRefill = async () => {
        const id = document.getElementById('email').value;
        if(id.length === 0){
            alert('Please enter a valid email.');
            document.getElementById('refill-button').classList.remove('disabled');
        } else {
            let response = await api.send_refill_request({email: id});
            if(response.statusCode === 500){
                document.getElementById('refill-button').classList.remove('disabled');
            } else if (response.statusCode === 400){
                updateId(document.getElementById('email').value);
                showModal();
            } else {
                if(response.statusCode === 200){
                    alert('Refill request processed successfully.');
                    navigate('/');
                } else if (response.statusCode === 500){
                    alert('Internal server error. Please contact administrator. Your status code is 500.');
                } else if (response.statusCode === 429){
                    alert('Refill request too soon. Please wait at least 3 weeks between refills.');
                } else if (response.statusCode === 501){
                    alert('Please contact administrator. Your status code is 501.');
                } else if (response.statusCode === 400){
                    showModal();
                } else if (response.statusCode === 430){
                    alert('Refill request too soon. Please wait at least 48 hours between refill requests.');
                    navigate('/');
                }
            }
        }
    }

    const showModal = () => {
        const myModalElement = document.getElementById('refill-modal');
        const modal = new Modal(myModalElement);
        modal.show();
        modalRef.current = modal;
    };

    const closeModal = () => {
        if(modalRef.current){
            modalRef.current.hide();
        }
    };

    const createAccount = async () => {
        const fname = document.getElementById('fname').value;
        const lname = document.getElementById('lname').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if(!fname.length || !lname.length || !phone.length){
            alert('Please fill out all form fields.');
            document.getElementById('create-account').classList.remove('disabled');
        } else {
            let obj = {
                fname,
                lname,
                phone,
                email
            }
            let response = await api.add_user(obj);
            if(response.statusCode === 400){
                alert('Hmmm, You already have an account. Please try requesting a refill again.');
                document.getElementById('create-account').classList.remove('disabled');
                closeModal();
            } else if (response.statusCode === 200) {
                document.getElementById('refill-button').classList.remove('disabled');
                alert('Youve successfully created your account. Please request a refill again.');
                closeModal();
            } else {
                console.log(response);
            }
        }
    }

    return (
        <div className="container">
            <div className="row refill-row d-flex justify-content-center align-items-center">
                <div className="col-lg-4 col-md-4 col-sm-12">

                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 text-center">
                <h3 className="mt-4">Refill Request</h3>
                    <p>By clicking 'Request Refill,' you're initiating a refill of your prescription. 
                        This request will be promptly sent to your provider, who will review your medication 
                        needs and reach out to you within 24-48 hours to confirm and process your refill. 
                        Your health and timely care are our top priorities.
                    </p>
                    <div className="card mt-3 mb-3 w-100">
                    <div className="card-title text-center refill-title">Please Fill Out Form</div>
                    <div className="card-body">
                        <div className="mb-3">
                        <select class="form-select" aria-label="Disabled select example" disabled>
                        <option selected>Refill Request</option>
                        </select>
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control input-lg" id="email" placeholder="Email"/>
                        </div>
                        <div class="mb-3 text-center">
                        <button id="refill-button" className="btn btn-lg refill-button" onClick={() => { 
                            document.getElementById('refill-button').classList.add('disabled');
                            requestRefill(); 
                            }}>Request Refill</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                <div class="modal fade" id="refill-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Account Creation Required</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <p>To proceed with your refill request, please create an account with us first. 
                            This quick process ensures secure and personalized service for all your healthcare needs.
                    </p>
                    <div class="mb-3">
                        <input type="email" class="form-control input-lg" id="email" value={id} disabled/>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control input-lg" id="fname" placeholder="First Name"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control input-lg" id="lname" placeholder="Last Name"/>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control input-lg" id="phone" placeholder="Phone Number"/>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn close-btn" data-bs-dismiss="modal">Close</button>
                        <button id="create-account" type="button" class="btn create-acct-btn" onClick={() => {
                            document.getElementById('create-account').classList.add('disabled');
                            createAccount();
                        }}>Create Account</button>
                    </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Refills;

