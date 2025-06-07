import React from "react";
import "./secondLastStyles.css";
import WeeklySpotlight from "./weeklySpotlight";
import Trending from "./trending";


function SecondLast(){
    return(
        <div className="second-last-container black-color">
            <WeeklySpotlight />
            <Trending />
        </div>
    )
}

export default SecondLast;