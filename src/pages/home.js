import React from "react";
import Banner from "./banner";
import Values from "./values";
import Reviews from "./reviews";

const Home = (props) => {
    return (
        <div>
            <Banner/>
            <Values/>
            <Reviews/>
        </div>
    )
}

export default Home;