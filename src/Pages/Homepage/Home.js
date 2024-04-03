import React, { useState, useEffect } from "react"
import './Home.css';
import rightArrow from "../Images/icons/right-arrow.png";
import img2 from "../Images/bg2.jpg";
import data from "../data.json";


const Homepage = () => {


    return (

        <>
            <div className="main">

                <div className="outer-box">

                    <div className="box">
                        <div className="box-heading">
                            <h1  className="heading" > Petroleum engineering </h1>
                            <h2  className="explore-link "><a href="https://petrowiki.spe.org/PetroWiki">Explore <i class="fa-solid fa-arrow-right"></i></a></h2>

                        </div>

                    </div>
                    <div className="box">
                        <img  alt="bg" src={img2} ></img>
                    </div>
                </div>
            </div>
        </>


    );
}
export default Homepage;