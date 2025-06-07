import { useState } from "react";
import "./genresStyles.css";
import { useNavigate } from "react-router-dom";

function Genres() {

    const navigate = useNavigate();

    function handleGenres(genre) {
        navigate('/genrePage', { state: { genre } });
    }

    return (
        <div className="categories-box">
            <div className="categories-list">
                <div className="category-item action" onClick={() => handleGenres("action")}>Action</div>
                <div className="category-item adventure" onClick={() => handleGenres("adventure")}>Adventure</div>
                <div className="category-item fantasy" onClick={() => handleGenres("fantasy")}>Fantasy</div>
                <div className="category-item scifi" onClick={() => handleGenres("scifi")}>Sci-Fi</div>
                <div className="category-item horror" onClick={() => handleGenres("horror")}>Horror</div>
                <div className="category-item comedy" onClick={() => handleGenres("comedy")}>Comedy</div>
                <div className="category-item drama" onClick={() => handleGenres("drama")}>Drama</div>
                <div className="category-item romance" onClick={() => handleGenres("romance")}>Romance</div>
            </div>
        </div>
    )
}

export default Genres;
