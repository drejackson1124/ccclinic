import React, { useState, useRef, useEffect } from "react";
import carrcarelogo from '../images/carrcarelogo.png';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const handleNavCollapse = () => {
        // setIsSpinning(!isSpinning);
        setAnimationClass(isNavCollapsed ? 'spin' : 'pulse');
        setIsNavCollapsed(!isNavCollapsed);
    }
    const navRef = useRef();
    useEffect(() => {
        if (!isNavCollapsed) {
            navRef.current.style.maxHeight = navRef.current.scrollHeight + "px";
        } else {
            navRef.current.style.maxHeight = null; // Reset max-height
        }
    }, [isNavCollapsed]);
    
    return (
        <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <Link className="navbar-brand" to='/'>
                <img src={carrcarelogo} alt="Logo" width="200" height="auto" className="d-inline-block align-text-top"/>
            </Link>
            <button onClick={handleNavCollapse} className="navbar-toggler med-icon-toggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <i class={`fa-solid fa-heart med-icon ${animationClass}`}></i>
                {/* <img src={favicon2} alt="" width="auto" height="80px" className="med-icon"/> */}
            </button>
            <div className={`navbar-collapse`} ref={navRef} id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">FAQS</a>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to='/sched-consultation'>Consultation</Link>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/request-refill">Request Refill</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}

export default Navbar;
