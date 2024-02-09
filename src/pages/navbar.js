import React from "react";
import carrcarelogo from '../images/carrcarelogo.png';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    
    return (
        <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <Link class="navbar-brand" to='/'>
                <img src={carrcarelogo} alt="Logo" width="200" height="auto" class="d-inline-block align-text-top"/>
            </Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to='/'>Home</Link>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">FAQS</a>
                </li>
                <li class="nav-item">
                <Link class="nav-link" to='/sched-consultation'>Consultation</Link>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Request Refill</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;
