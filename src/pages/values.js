import React from "react";
import '../css/values.css';

const Values = (props) => {
    return (
        <div className="container values-container">
        <div className="row mb-4">
            <div className="col-12">
                <h3 className="values-title text-center">Guiding You with Compassion and Expertise</h3>
            </div>
        </div>
        <div className="row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card values-card h-100">
            <div className="card-body">
                <h5 className="card-title text-center values-card-title">Personalized Care</h5>
                <p className="card-text">
                Every journey is unique, and so is our approach to weight loss. 
                We believe in crafting personalized care plans that fit your lifestyle, preferences, and goals. Our team works 
                closely with you to create a program that not only tackles weight loss but also enhances your overall well-being, 
                ensuring that each step on your health journey is tailored specifically to you.
                </p>
            </div>
            </div>
        </div>
        <div className="col-sm-6">
            <div className="card h-100 values-card">
            <div className="card-body">
                <h5 className="card-title text-center values-card-title">Medical Expertise</h5>
                <p className="card-text">
                    Your safety and health are paramount. 
                    That's why our clinic is staffed with experienced medical professionals who specialize in 
                    weight management. We're equipped with the latest in medical research, tools, and techniques 
                    to offer you the highest standard of care. Our expertise is your advantage in the quest for a healthier life.
                </p>
            </div>
            </div>
        </div>
        </div>
        <div className="row">
        <div className="col-sm-6 mb-3 mb-sm-0">
            <div className="card h-100 values-card">
            <div className="card-body">
                <h5 className="card-title text-center values-card-title">Sustainable Practices</h5>
                <p className="card-text">
                We're not just about short-term results; we aim for lasting change. 
                Our methods are designed to promote sustainable weight loss and maintenance, 
                empowering you with the knowledge and habits to keep the weight off for good. 
                We focus on integrating healthy choices into your daily routine to ensure that 
                your progress is permanent.
                </p>
            </div>
            </div>
        </div>
        <div className="col-sm-6">
            <div className="card h-100 values-card">
            <div className="card-body">
                <h5 className="card-title text-center values-card-title">Supportive Environment</h5>
                <p className="card-text">
                We understand the emotional ups and downs of weight loss. 
                Our clinic is more than a medical facility; it's a supportive 
                community where you'll find encouragement and understanding. 
                From our staff to fellow journeyers, you'll be surrounded by a network 
                of support to motivate and inspire you every step of the way.
                </p>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Values;