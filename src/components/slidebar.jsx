import React, { useState } from "react";
import "./slidebarStyles.css";
import Genres from "../genres";
import { useNavigate } from "react-router-dom";

function SlideBar({ setShowMenu }) {
    const navigate = useNavigate();
    const [genreVisible, setGenreVisible] = useState(false);

    function handleGenresComponentClick() {
        console.log("genre button pressed");
        setGenreVisible(!genreVisible);
        localStorage.setItem("showMenu", "false")
    }

    function handleMenuClick() {
        const current = localStorage.getItem("showMenu") === "true";
        const newValue = !current;
        localStorage.setItem("showMenu", newValue.toString());
        setShowMenu(newValue);
    }

    function handleAboutClick() {
        console.log("About us button clicked");
        navigate('/aboutUs');
    }

    function handleHomeClick() {
        console.log("home button pressed");
        navigate('/');
        window.location.reload();
    }
    return (
        <div className="side-bar">
            <div className="cross-icon color-black" onClick={handleMenuClick}>
                <div className="close-icon">
                    <img src="../src/assets/cross.png" alt="Cross" />
                </div>
            </div>
            <div className="option" style={{ marginTop: "12px" }} onClick={handleHomeClick}>
                <div className="side-icon">
                    <img src="../src/assets/home.png" alt="Home" />
                </div>
                <div className="black-color">Home</div>
            </div>

            <div className="option">
                <div className="side-icon">
                    <img src="../src/assets/bookmark.png" alt="Bookmark" />
                </div>
                <div className="black-color">Bookmark</div>
            </div>

            <div className="option">
                <div className="side-icon">
                    <img src="../src/assets/notification.png" alt="Notifications" />
                </div>
                <div className="black-color">Notifications</div>
            </div>

            <div className="option" onClick={handleGenresComponentClick}>
                <div className="side-icon">
                    <img src="../src/assets/generes.png" alt="Genres" />
                </div>
                <div className="black-color">Genres</div>
            </div>

            {genreVisible && <Genres />}

            <div className="option" onClick={handleAboutClick}>
                <div className="side-icon">
                    <img src="../src/assets/aboutUs.png" alt="Genres" />
                </div>
                <div className="black-color">About us</div>
            </div>
        </div>
    )
}

export default SlideBar;