import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import '../css/reviews.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carrcarelogo from '../images/carrcarelogo.png';

const Reviews = (props) => {
    const [slidesToShow, setSlidesToShow] = useState(3);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear",
        adaptiveHeight: true
      };

        
    const updateSlidesToShow = () => {
            const width = window.innerWidth;
            if (width < 768) { 
                setSlidesToShow(1);
                removeMarginFromCards();
            } else {
                setSlidesToShow(3);
                addMarginToCards();
            }
    };

    const addMarginToCards = () => {
        let elements = document.getElementsByClassName('review-card');
        for(var i = 0; i < elements.length; i++){
            elements[i].classList.add('review-card-margin');
        }
    }

    const removeMarginFromCards = () => {
        let elements = document.getElementsByClassName('review-card');
        for(var i = 0; i < elements.length; i++){
            elements[i].classList.remove('review-card-margin');
        }
    }
    
    
    useEffect(() => {
            updateSlidesToShow(); 
            window.addEventListener('resize', updateSlidesToShow); 
    
            
            return () => window.removeEventListener('resize', updateSlidesToShow);
        }, []);

    return (
        <div className="container-fluid slider-container">
        <div>
            <h4 className="reviews-title">Patient Testimonials</h4>
          </div>
          <div className="row reviews-card-container">
            <Slider {...settings}>
            <div>
                    <div className="card review-card">
                        <div className="card-body text-center">
                            <img className="img-fluid review-img mx-auto d-block" src="https://i.ibb.co/s2hpQ2T/alex-starnes-WYE2-Uh-Xs-U1-Y-unsplash.jpg" alt="alex-starnes-WYE2-Uh-Xs-U1-Y-unsplash" border="0"/>
                            <div className="card-title reviewer">Alexandra R.</div>
                            <div className="review-stars mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                            <div className="card-text reviews-card-text">
                            "This clinic stands out for its compassionate care and comprehensive weight loss programs. 
                            The professionals here are not just experts in their field; they are deeply committed to 
                            each patient's success."
                            
                            </div>
                        </div>
                    </div>
            </div>
            {/* <div>
            <div className="card review-card">
                        <div className="card-body">
                            <div className="card-title reviewer">Michael T.</div>
                            <div className="card-text reviews-card-text">
                            "The team at the clinic made me feel understood and supported from day one. 
                            Their expertise in nutrition and wellness is unparalleled. I've not only lost weight 
                            but have embraced a whole new lifestyle that's full of energy and positivity!"
                            </div>
                        </div>
                    </div>
            </div> */}
            <div>
            <div className="card review-card">
                        <div className="card-body text-center">
                        <img className="img-fluid review-img mx-auto d-block" src="https://i.ibb.co/J5nhnKS/jason-moyer-A73ah5-JKt-VA-unsplash.jpg" alt="alex-starnes-WYE2-Uh-Xs-U1-Y-unsplash" border="0"/>
                            <div className="card-title reviewer">Samantha B.</div>
                            <div className="review-stars mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                            <div className="card-text reviews-card-text">
                            "I've struggled with weight loss for years, trying every fad diet without success. 
                            The clinic provided me with a science-backed approach and continuous support. 
                            I'm thrilled with my results and the new habits I've formed." 
                            </div>
                        </div>
                    </div>
            </div>
            <div>
            <div className="card review-card">
                        <div className="card-body text-center">
                        <img className="img-fluid review-img mx-auto d-block" src="https://i.ibb.co/qgy1vsc/alexander-hipp-i-EEBWg-Y-6l-A-unsplash.jpg" alt="alex-starnes-WYE2-Uh-Xs-U1-Y-unsplash" border="0"/>
                            <div className="card-title reviewer">Jonathan K.</div>
                            <div className="review-stars mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                            <div className="card-text reviews-card-text">
                            "Thank you to the incredible staff for their constant 
                            encouragement and tailored health plans. Their approach 
                            isn't just about losing weight; it's about gaining confidence 
                            and learning to love your body."
                            </div>
                        </div>
                    </div>
            </div>
            <div>
            <div className="card review-card">
                        <div className="card-body text-center">
                        <img className="img-fluid review-img mx-auto d-block" src="https://i.ibb.co/W3YjHZ1/ronny-sison-4lnzx-FIg-Tmg-unsplash.jpg" alt="alex-starnes-WYE2-Uh-Xs-U1-Y-unsplash" border="0"/>
                            <div className="card-title reviewer">Danielle P.</div>
                            <div className="review-stars mb-1">⭐️⭐️⭐️⭐️⭐️</div>
                            <div className="card-text reviews-card-text">
                            "The personalized care I received was a game-changer. 
                            The clinic's program helped me understand the root causes of 
                            my weight gain and taught me how to address them sustainably."
                            </div>
                        </div>
                    </div>
            </div>
            {/* <div>
            <div className="card review-card">
                        <div className="card-body">
                            <div className="card-title reviewer">Ethan G.</div>
                            <div className="card-text reviews-card-text">
                            "I was skeptical about joining another weight loss program, but this clinic's 
                            blend of medical knowledge, personalized attention, and genuine care has completely 
                            won me over. I'm healthier and happier than I've been in years."
                            </div>
                        </div>
                    </div>
            </div> */}
            </Slider>

          </div>
      </div>

    )
}

export default Reviews;