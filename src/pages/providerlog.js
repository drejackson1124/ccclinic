import React from "react";
import api from "../js/apis";
import { useNavigate } from "react-router-dom";


const ProviderLog = (props) => {
    const navigate = useNavigate();

    const checkForm = async () => {
        let username = document.getElementById('uname').value;
        let password = document.getElementById('pword').value;

        if(!username.length || !password.length){
            alert('Please enter a username and password');
            document.getElementById("providerlog-btn").classList.remove('disabled');
        } else {
            let result = await api.auth(username, password);
            let data = JSON.parse(result.body);
            api.storeToken(data.token);
            navigate('/dashboard');
        }
    }

    return (
    <div className="container">
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4">
                <div class="mb-3 mt-5">
                    <h3 className="text-center">Provider Portal</h3>
                </div>
                <div class="mb-3">
                    <label for="uname" class="form-label">Username</label>
                    <input type="text" class="form-control input-lg" id="uname" placeholder="username"/>
                </div>
                <div class="mb-3">
                    <label for="pword" class="form-label">Password</label>
                    <input type="password" class="form-control input-lg" id="pword" placeholder="password"/>
                </div>
                <div class="mb-3 text-center">
                    <button id="providerlog-btn" className="btn btn-lg consult-button" onClick={() => { 
                        document.getElementById("providerlog-btn").classList.add('disabled');
                        checkForm()
                    }}>Submit</button>
                </div>
            </div>
            <div className="col-4"></div>
        </div>
    </div>
    )
}

export default ProviderLog;