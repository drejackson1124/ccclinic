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
            let obj = { fname, lname, email, phone, notes, service };
            const result = await api.add_consult(obj);
            if(result.statusCode !== 200){
                alert('It looks like youve already signed up for a consult. Please email us to check the status');
            } else {
                updateButtonDisabled(true);
                await api.send_email(obj);
                alert('Thank you! We\'ve got your request. We will be reaching out shortly.');
                navigate('/consult-success');

            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 mt-3">
                    <img className="img-fluid" src="https://i.ibb.co/Vt3p2v6/Untitled-design-38.png" alt="Untitled-design-38" border="0"/>
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
                <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="card mt-3 mb-3">
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
                    <input type="text" class="form-control" id="phone" placeholder="Phone Number"/>
                    </div>
                    <div class="mb-3">
                    <label for="notes" class="form-label">Any notes for the provider?</label>
                    <textarea class="form-control" id="notes" rows="3"></textarea>
                    </div>
                    <div class="mb-3 text-center">
                    <button disabled={isButtonDisabled} className="btn btn-lg consult-button" onClick={() => { checkForm()}}>Submit</button>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Consult;