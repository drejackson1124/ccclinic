import React from "react";
import Slider from "react-slick";
import '../css/reviews.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import carrcarelogo from '../images/carrcarelogo.png';

const Reviews = (props) => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear",
        adaptiveHeight: true
      };

    return (
        <div className="slider-container">
        <div>
            {/* <img src={carrcarelogo} className="img-fluid carrcarelogo-reviews"/> */}
            <h4 className="reviews-title">Patient Testimonials 💕</h4>
          </div>
        <Slider {...settings}>
          <div>
            <h3>
                <div className="card review-card">
                    <div className="card-body">
                        <div className="card-title">⭐️⭐️⭐️⭐️⭐️</div>
                        <div className="card-text reviews-card-text">
                        "This clinic stands out for its compassionate care and comprehensive weight loss programs. 
                        The professionals here are not just experts in their field; they are deeply committed to 
                        each patient's success."
                        </div>
                    </div>
                </div>
            </h3>
          </div>
          <div>
          <div className="card review-card">
                    <div className="card-body">
                        <div className="card-title">⭐️⭐️⭐️⭐️⭐️</div>
                        <div className="card-text reviews-card-text">
                        "The team at the clinic made me feel understood and supported from day one. 
                        Their expertise in nutrition and wellness is unparalleled. I've not only lost weight 
                        but have embraced a whole new lifestyle that's full of energy and positivity!"
                        </div>
                    </div>
                </div>
          </div>
          <div>
          <div className="card review-card">
                    <div className="card-body">
                        <div className="card-title">⭐️⭐️⭐️⭐️⭐️</div>
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
                    <div className="card-body">
                        <div className="card-title">⭐️⭐️⭐️⭐️⭐️</div>
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
                    <div className="card-body">
                        <div className="card-title">⭐️⭐️⭐️⭐️⭐️</div>
                        <div className="card-text reviews-card-text">
                        "The personalized care I received was a game-changer. 
                        The clinic's program helped me understand the root causes of 
                        my weight gain and taught me how to address them sustainably."
                        </div>
                    </div>
                </div>
          </div>
          <div>
          <div className="card review-card">
                    <div className="card-body">
                        <div className="card-title">⭐️⭐️⭐️⭐️⭐️</div>
                        <div className="card-text reviews-card-text">
                        "I was skeptical about joining another weight loss program, but this clinic's 
                        blend of medical knowledge, personalized attention, and genuine care has completely 
                        won me over. I'm healthier and happier than I've been in years."
                        </div>
                    </div>
                </div>
          </div>
        </Slider>
      </div>

    )
}

export default Reviews;