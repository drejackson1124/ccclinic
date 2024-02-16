import React from "react";
import '../css/spinner.css';

const Spinner = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {/* <h1 className="spinner-title">Loading</h1> */}
                    <div className="loading" id="loading"></div>
                </div>
            </div>
        </div>
    )
}


export default Spinner;