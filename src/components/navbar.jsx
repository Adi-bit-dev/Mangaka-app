import React, { useEffect, useRef, useState } from "react";
import "./navbarStyles.css";
import { useNavigate } from "react-router-dom";

function Navbar({ setShowMenu }) {
    const boxRef = useRef(null);
    const [searchVisible, setSearchVisible] = useState(false);

    const navigate = useNavigate();
    // let isLoggedin = localStorage.getItem("isLoggedin") == 'true';
    const [login, setIsLogin] = useState(localStorage.getItem("isLoggedin") == 'true');

    function handleMenuClick() {
        const current = localStorage.getItem("showMenu") === "true";
        const newValue = !current;
        localStorage.setItem("showMenu", newValue.toString());
        setShowMenu(newValue);
    }

    function handleSearchClick() {
        setSearchVisible(true);
        const searchbar = document.querySelector(".search");
        const left = document.querySelector(".left");

        searchbar.classList.add("active");
        left.classList.add("hide");
    }

    function hideSearch() {
        setSearchVisible(false);
        const searchbar = document.querySelector(".search");
        searchbar.classList.remove("active");

        const left = document.querySelector(".left");
        left.classList.remove("hide");
    }

    function handleloginClick() {
        console.log("login button pressed");
        navigate('/auth-user');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchVisible &&
                boxRef.current &&
                !boxRef.current.contains(event.target)
            ) {
                hideSearch();
            }
        }

        function handleKeyDown(event) {
            if (event.key !== "Enter") return;

            const searchInput = document.getElementById("auth-search-field");
            const search = searchInput.value.trim();

            console.log("User searched:", search);

            // route the user to the search page and pss the manga name
            navigate('/searchPage', {state: {mangaName: search}});

            if (searchVisible) {
                hideSearch();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchVisible]);

    return (
        <div className="nav">
            <div className="right">
                <div className="icon">
                    <img src="/logo.png" alt="Icon" />
                </div>
                <div className="name">Mangaka</div>
            </div>

            <div className="search" ref={boxRef}>
                <input type="text" placeholder="Type here to search" id="auth-search-field" />
            </div>

            <div className="left">
                <div className="donate">
                    <div className="heart">
                        <img src="/heart.png" alt="Heart" />
                    </div>
                    <div>Support Us</div>
                </div>

                <div className="icn" onClick={handleSearchClick}>
                    <img src="/search.png" alt="S" />
                </div>

                {!login ? (
                    <div className="login" onClick={handleloginClick}>Login</div>

                ) : (
                    <div className="account"></div>
                )}
                <div className="icn menu-icon" onClick={handleMenuClick}>
                    <img src="/menu.png" alt="M" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
