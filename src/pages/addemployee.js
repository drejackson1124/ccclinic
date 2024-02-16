import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../js/apis";
import '../css/addemployee.css';
import moment from "moment";

const AddEmployee = () => {
    const navigate = useNavigate();
    const [isButtonDisabled, updateButtonDisabled] = useState(false);
    const [isAdvancedUser, setIsAdvancedUser] = useState(false);

    const handleToggleSwitch = () => {
        setIsAdvancedUser(!isAdvancedUser);
    };

    const checkForm = async () => {
        let uname = document.getElementById('uname').value;
        let password = document.getElementById('password').value;

        if(!uname.length || !password.length){
            alert('Please fill out the entire form.');
        } else {
            let obj = { 
                username: uname, 
                password,
                admin: isAdvancedUser,
                created: moment().format()
            };
            const result = await api.add_employee(obj);
            console.log(result);
            if (result.statusCode === 200) {
                updateButtonDisabled(true);
                navigate('/provider');

            } else {
                alert('Something went wrong. Please contact your administrator.')
                document.getElementById("add-employee-button").classList.remove('disabled');
                navigate('/provider');
            }
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <div className="card mt-3 mb-3 w-100">
                <div className="card-title text-center consult-title">Create a New User</div>
                <div className="card-body">
                    <div class="mb-3">
                    <label for="uname" class="form-label">Username</label>
                    <input type="text" class="form-control input-lg" id="uname"/>
                    </div>
                    <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="text" class="form-control" id="password"/>
                    </div>
                    <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="userChecked" checked={isAdvancedUser} onChange={handleToggleSwitch}/>
                    <label class="form-check-label" for="userChecked">{isAdvancedUser ? 'Advanced User' : 'Basic User'}</label>
                    </div>
                    <div class="mb-3 text-center">
                    <button id="add-employee-button" className="btn btn-lg add-employee-button" onClick={() => { 
                        document.getElementById("add-employee-button").classList.add('disabled');
                        checkForm()
                    }}>Submit</button>
                    </div>
                </div>
                </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default AddEmployee;