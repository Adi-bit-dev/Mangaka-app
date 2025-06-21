import React, { useEffect, useRef, useState } from "react";
import "./navbarStyles.css";
import { useNavigate } from "react-router-dom";

function Navbar({ setShowMenu }) {
    const boxRef = useRef(null);
    const [searchVisible, setSearchVisible] = useState(false);
    const navigate = useNavigate();
    const [login, setIsLogin] = useState(localStorage.getItem("isLoggedin") === "true");

    function handleMenuClick() {
        const current = localStorage.getItem("showMenu") === "true";
        const newValue = !current;
        localStorage.setItem("showMenu", newValue.toString());
        setShowMenu(newValue);
    }

    function comingSoon() {
        alert("Coming soon");
    }

    function handleSearchClick() {
        setSearchVisible(true);
        const searchbar = document.querySelector(".search");
        const left = document.querySelector(".left");

        searchbar.classList.add("active");
        left.classList.add("hide");

        const searchInput = document.getElementById("auth-search-field");
        if (searchInput) searchInput.value = ""; // Clear previous search
    }

    function hideSearch() {
        setSearchVisible(false);
        const searchbar = document.querySelector(".search");
        searchbar.classList.remove("active");

        const left = document.querySelector(".left");
        left.classList.remove("hide");
    }

    function handleLoginClick() {
        console.log("Login button pressed");
        navigate("/auth-user");
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

            if (!search) return;

            console.log("User searched:", search);
            navigate("/searchPage", { state: { mangaName: search } });

            if (searchVisible) hideSearch();
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [searchVisible, navigate]);

    return (
        <div className="nav">
            <div className="right">
                <div className="icon">
                    <img src="/logo.png" alt="Icon" />
                </div>
                <div className="name">Mangaka</div>
            </div>

            <div className="search" ref={boxRef}>
                <input
                    type="text"
                    placeholder="Type here to search"
                    id="auth-search-field"
                />
            </div>

            <div className="left">
                <div className="donate" onClick={comingSoon}>
                    <div className="heart">
                        <img src="/heart.png" alt="Heart" />
                    </div>
                    <div>Support Us</div>
                </div>

                <div className="icn" onClick={handleSearchClick}>
                    <img src="/search.png" alt="Search" />
                </div>

                {!login ? (
                    <div className="login" onClick={handleLoginClick}>Login</div>
                ) : (
                    <div className="account">
                        <img src="/user.png" alt="User" className="user-avatar" />
                    </div>
                )}

                <div className="icn menu-icon" onClick={handleMenuClick}>
                    <img src="/menu.png" alt="Menu" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
