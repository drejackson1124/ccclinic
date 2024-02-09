import React from "react";
import '../css/banner.css';
import { Link } from 'react-router-dom';

const Banner = (props) => {
    return (
        <div className="container-fluid banner-container">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 p-0 banner-left">
                    <div className="img-container">
                        <img src="https://i.ibb.co/bLm5wsF/carrcarebanner1.png" className="img-fluid logo-img"/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 banner-right">
                    <div className="banner-text-container">
                        <div className="banner-title-container">
                            <h2 className="banner-title">Transform Your Life Today</h2>
                        </div>
                        <div className="banner-subtext-container">
                            <h3 className="banner-subtext">Embark on your journey to a healthier, 
                                happier you with our personalized weight loss programs. 
                                Experience expert care and support every step of the way.
                            </h3>
                        </div>
                        <div className="banner-button-container">
                            <Link to='/initial-quest' className="btn btn-lg banner-button mt-4">Start Your Transformation</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Banner;