import React from "react";
import '../css/footer.css';
import carrcarelogo from '../images/carrcarelogo.png';
import { Link } from "react-router-dom";

const Footer = (props) => {
    return (
<footer class="text-white text-center text-lg-start footer">
  <div class="container p-4">
    <div class="row">
      <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 class="text-uppercase">We are available 7 days a week</h5>

        <p>
        At our clinic, we understand that your health and wellness journey doesn’t take a day off, 
        and neither do we. To support you every step of the way, our dedicated team is here for you every day of the week, 
        ensuring you have access to our expertise and services when you need them the most. Whether it's a question that needs 
        answering, an appointment that needs scheduling, or support that you seek, rest assured we're just a call or visit away. 
        Let us be a part of your journey toward a healthier, happier you, any day of the week.
        </p>
      </div>
      <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase">Service Links</h5>

        <ul class="list-unstyled mb-0">
          <li>
            <Link to='/request-refill' class="text-white">Request A Refill</Link>
          </li>
          <li>
            <Link to='/sched-consultation' class="text-white">Book A Consultation</Link>
          </li>
          <li>
            <a href="#!" class="text-white">Visit Our Sister Company</a>
          </li>
        </ul>
      </div>
      <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 class="text-uppercase mb-0">Learn More</h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!" class="text-white">FAQS</a>
          </li>
          <li>
            <a href="#!" class="text-white">Our Process</a>
          </li>
          <li>
            <a href="#!" class="text-white">About Us</a>
          </li>
          <li>
            <a href="#!" class="text-white">Location and Hours</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="text-center p-3 copyright">
    © 2024 Copyright: Carr Care, LLC
    {/* <a class="text-white" href="#"> Carr Care, LLC</a> */}
  </div>
</footer>
    )
}

export default Footer;