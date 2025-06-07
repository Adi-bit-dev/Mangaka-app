import React, { useEffect, useRef, useState } from "react";
import "./mainPageStyles.css";
import Navbar from "./navbar";
import HeroSlider from "./slider";
import SecondLast from "./secondLast";
import Last from "./last";
import SlideBar from "./slidebar";

function MainPage() {
    const [showMenu, setShowMenu] = useState(localStorage.getItem("showMenu") === "true");
    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setShowMenu(false);
                localStorage.setItem("showMenu", "false");
            }
        }

        if (showMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showMenu]);

    // Custom event listener for localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const menuState = localStorage.getItem("showMenu") === "true";
            setShowMenu(menuState);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <>
            <Navbar setShowMenu={setShowMenu} />
            <HeroSlider />
            <SecondLast />
            <Last />
            {showMenu && (
                <div ref={sidebarRef}>
                    <SlideBar setShowMenu={setShowMenu}/>
                </div>
            )}
        </>
    );
}

export default MainPage;
