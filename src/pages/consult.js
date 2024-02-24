import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/consult.css';
import api from "../js/apis";
import { useNavigate } from 'react-router-dom';

const Consult = (props) => {
    const navigate = useNavigate();
    const [isButtonDisabled, updateButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        birthdate: '',
        email: '',
        phone: '',
        height: '',
        weight: '',
        allergies: '',
        tc: '',
        men: '',
        gas: '',
        panc: '',
        mh: '',
        readFAQs: false,
        informationTrue: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const checkForm = async () => {
        let service = 'weight loss consult';
        const {fname, lname, email, phone, height, weight, allergies, tc, men, gas, panc, mh, readFAQs, informationTrue, birthdate} = formData;
        if(!fname || !lname || !email || !birthdate || !phone || !height || !weight || !allergies || tc === '' || men === '' || gas === '' || panc === '' || mh === '' || !readFAQs || !informationTrue){
            alert('Please fill out the entire form.');
            document.getElementById("consult-btn").classList.remove('disabled');
            console.log(formData);
        } else {
            if(phone.length < 10){
                alert('Please enter your phone number, including the area code.');
                document.getElementById("consult-btn").classList.remove('disabled');
                return;
            } else if (phone.length > 10){
                alert('Hmm, looks like you may have included special characters, or a country code for your phone number. Please input number in this format: 4448567890 to continue.');
                document.getElementById("consult-btn").classList.remove('disabled');
                return;
            } else {
                // console.log(formData);
                const result = await api.add_consult(formData);
                if(result.statusCode === 400){
                    alert('It looks like youve already signed up for a consult. Please email us to check the status');
                    navigate('/');
                } else if (result.statusCode === 201) {
                    updateButtonDisabled(true);
                    // await api.send_email(obj);
                    alert('It looks like you\'re already a user. We\'ve sent the consult request to your provider and they will be reaching out shortly.');
                    navigate('/consult-success');
                } else if (result.statusCode === 200) {
                    updateButtonDisabled(true);
                    await api.send_email(formData);
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
            // let obj = { fname, lname, email, phone, notes, service };
            // const result = await api.add_consult(obj);
            // if(result.statusCode === 400){
            //     alert('It looks like youve already signed up for a consult. Please email us to check the status');
            //     navigate('/');
            // } else if (result.statusCode === 201) {
            //     updateButtonDisabled(true);
            //     await api.send_email(obj);
            //     alert('It looks like you\'re already a user. We\'ve sent the consult request to your provider and they will be reaching out shortly.');
            //     navigate('/consult-success');
            // } else if (result.statusCode === 200) {
            //     updateButtonDisabled(true);
            //     await api.send_email(obj);
            //     alert('Thank you! We\'ve got your request. We will be reaching out shortly.');
            //     navigate('/consult-success');

            // } else if (result.statusCode === 401) {
            //     updateButtonDisabled(true);
            //     alert('Something unexpected happened, please try again.');
            //     document.getElementById("consult-btn").classList.remove('disabled');

            // } else if (result.statusCode === 500) {
            //     updateButtonDisabled(true);
            //     alert('Error adding consult. Please reach out to business directly.');
            //     document.getElementById("consult-btn").classList.remove('disabled');

            // } else if (result.statusCode === 501) {
            //     updateButtonDisabled(true);
            //     alert('Error adding user. Please reach out to business directly.');
            //     document.getElementById("consult-btn").classList.remove('disabled');

            // } else if (result.statusCode === 600) {
            //     updateButtonDisabled(true);
            //     alert('Error 600');
            //     document.getElementById("consult-btn").classList.remove('disabled');

            // } else if (result.statusCode === 601) {
            //     updateButtonDisabled(true);
            //     alert('Error 601');
            //     document.getElementById("consult-btn").classList.remove('disabled');

            // }
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
                    <input name="fname" type="text" class="form-control input-lg" id="fname" placeholder="First Name" value={formData.fname} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="lname" class="form-label">Last Name</label>
                    <input name="lname" type="text" class="form-control" id="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input name="email" type="email" class="form-control" id="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="phone" class="form-label">Phone Number</label>
                    <input name="phone" type="text" class="form-control" id="phone" placeholder="Please include area code, no spaces or dashes" value={formData.phone} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="birthdate" class="form-label">Birth Date</label>
                    <input name="birthdate" type="text" class="form-control" id="birthdate" placeholder="ex. 02/05/1980" value={formData.birthdate} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="height" class="form-label">Height</label>
                    <input name="height" type="text" class="form-control" id="height" placeholder="ex. 5'10" value={formData.height} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="weight" class="form-label">Weight</label>
                    <input name="weight" type="text" class="form-control" id="weight" placeholder="ex. 160" value={formData.weight} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="allergies" class="form-label">Allergies</label>
                    <input name="allergies" type="text" class="form-control" id="allergies" placeholder="Please list allergies or type none." value={formData.allergies} onChange={handleChange}/>
                    </div>
                    <div class="mb-3">
                    <label for="tc" class="form-label me-3">Any history of Thyromedullary Cancer?</label>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="tc" id="tcYes" value="yes" onChange={handleChange} checked={formData.tc === 'yes'}/>
                    <label class="form-check-label" for="tc">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="tc" id="tcNo" value="no" onChange={handleChange} checked={formData.tc === 'no'}/>
                    <label class="form-check-label" for="tc2">No</label>
                    </div>
                    </div>
                    <div class="mb-3">
                    <label for="men" class="form-label me-3">Any history of Multiple Endocrine Neoplasm?</label>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="men" id="menYes" value="yes" onChange={handleChange} checked={formData.men === 'yes'}/>
                    <label class="form-check-label" for="en">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="men" id="menNo" value="no" onChange={handleChange} checked={formData.men === 'no'}/>
                    <label class="form-check-label" for="en2">No</label>
                    </div>
                    </div>
                    <div class="mb-3">
                    <label for="gas" class="form-label me-3">Any history of significant Gastroparesis?</label>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gas" id="gasYes" value="yes" onChange={handleChange} checked={formData.gas === 'yes'}/>
                    <label class="form-check-label" for="gas">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gas" id="gasNo" value="no" onChange={handleChange} checked={formData.gas === 'no'}/>
                    <label class="form-check-label" for="gas2">No</label>
                    </div>
                    </div>
                    <div class="mb-3">
                    <label for="panc" class="form-label me-3">Any history of Pancreatitis?</label>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="panc" id="panYes" value="yes" onChange={handleChange} checked={formData.panc === 'yes'}/>
                    <label class="form-check-label" for="pan">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="panc" id="panNo" value="no" onChange={handleChange} checked={formData.panc === 'no'}/>
                    <label class="form-check-label" for="pan2">No</label>
                    </div>
                    </div>
                    <div class="mb-3">
                    <label for="mh" class="form-label">Please include relevant medical history</label>
                    <textarea name="mh" class="form-control" id="mh" rows="3" value={formData.mh} onChange={handleChange} placeholder="Type none if applicable."></textarea>
                    </div>
                    <div class="form-check">
                    <input name="readFAQs" class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={formData.readFAQs} onChange={handleChange}/>
                    <label class="form-check-label" for="flexCheckDefault">
                        I have read the FAQs, understand all associated risks, and am informed about the medication involved in this consultation.
                    </label>
                    </div>
                    <div class="form-check">
                    <input name="informationTrue" class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" checked={formData.informationTrue} onChange={handleChange}/>
                    <label class="form-check-label" for="flexCheckDefault2">
                        All information provided by me is accurate and true to the best of my knowledge.
                    </label>
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