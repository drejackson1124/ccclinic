import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/consult.css';
import api from "../js/apis";
import { useNavigate } from 'react-router-dom';

const Consult = (props) => {
    const navigate = useNavigate();
    const [isButtonDisabled, updateButtonDisabled] = useState(false);

    const checkForm = async () => {
        let fname = document.getElementById('fname').value;
        let lname = document.getElementById('lname').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let notes = document.getElementById('notes').value;
        let service = 'weight loss consult';
        if(!fname.length || !lname.length || !email.length || !phone.length){
            alert('Please fill out the entire form.');
        } else {
            if(phone.length < 10){
                alert('Please enter your phone number, including the area code.');
                document.getElementById("consult-btn").classList.remove('disabled');
                return;
            } else if (phone.length > 10){
                alert('Hmm, looks like you may have included special characters, or a country code for your phone number. Please input number in this format: 4448567890 to continue.');
                document.getElementById("consult-btn").classList.remove('disabled');
                return;
            }
            let obj = { fname, lname, email, phone, notes, service };
            const result = await api.add_consult(obj);
            if(result.statusCode === 400){
                alert('It looks like youve already signed up for a consult. Please email us to check the status');
                navigate('/');
            } else if (result.statusCode === 201) {
                updateButtonDisabled(true);
                await api.send_email(obj);
                alert('It looks like you\'re already a user. We\'ve sent the consult request to your provider and they will be reaching out shortly.');
                navigate('/consult-success');
            } else if (result.statusCode === 200) {
                updateButtonDisabled(true);
                await api.send_email(obj);
                alert('Thank you! We\'ve got your request. We will be reaching out shortly.');
                navigate('/consult-success');

            } else if (result.statusCode === 401) {
                updateButtonDisabled(true);
                alert('Something unexpected happened, please try again.');
                document.getElementById("consult-btn").classList.remove('disabled');

            } else if (result.statusCode === 500) {
                updateButtonDisabled(true);
                alert('Error adding consult. Please reach out to business directly.');
                document.getElementById("consult-btn").classList.remove('disabled');

            } else if (result.statusCode === 501) {
                updateButtonDisabled(true);
                alert('Error adding user. Please reach out to business directly.');
                document.getElementById("consult-btn").classList.remove('disabled');

            } else if (result.statusCode === 600) {
                updateButtonDisabled(true);
                alert('Error 600');
                document.getElementById("consult-btn").classList.remove('disabled');

            } else if (result.statusCode === 601) {
                updateButtonDisabled(true);
                alert('Error 601');
                document.getElementById("consult-btn").classList.remove('disabled');

            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row row-gradient d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-md-12 col-sm-12 mt-3 text-center consult-box">
                    <h3 className="consult-subtext-title mt-2">Welcome to Your First Step Towards Transformation</h3>
                    <p className="consult-subtext">
                    Before you embark on this journey with us, we invite you to explore our <span className="faqs-highlight">FAQs page </span> 
                     to gain a clearer understanding of what to expect, how we can assist you, and the steps 
                    involved in our consultation process. Knowledge is the key to empowerment, and by familiarizing 
                    yourself with our approach, you'll be better prepared for the transformative journey ahead. Once you're 
                    ready, please fill out the consultation request form below with your details. Our dedicated team is looking 
                    forward to guiding you through a personalized wellness plan tailored just for you.
                    </p>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 pb-3">
                <div className="card mt-3 mb-3 w-100">
                <div className="card-title text-center consult-title">Please Fill Out Form</div>
                <div className="card-body">
                    <div className="mb-3">
                    <select class="form-select" aria-label="Disabled select example" disabled>
                    <option selected>Weight Loss Consultation</option>
                    </select>
                    </div>
                    <div class="mb-3">
                    <label for="fname" class="form-label">First Name</label>
                    <input type="text" class="form-control input-lg" id="fname" placeholder="First Name"/>
                    </div>
                    <div class="mb-3">
                    <label for="lname" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lname" placeholder="Last Name"/>
                    </div>
                    <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Email"/>
                    </div>
                    <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="phone" placeholder="Please include area code, no spaces or dashes"/>
                    </div>
                    <div class="mb-3">
                    <label for="notes" class="form-label">Any notes for the provider?</label>
                    <textarea class="form-control" id="notes" rows="3"></textarea>
                    </div>
                    <div class="mb-3 text-center">
                    <button id="consult-btn" className="btn btn-lg consult-button" onClick={() => { 
                        document.getElementById("consult-btn").classList.add('disabled');
                        checkForm()
                    }}>Submit</button>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Consult;