import { useState, useEffect, useRef } from "react";
import "./readingPageStyles.css";
import Navbar from "./navbar";
import SlideBar from "./slidebar";
import { useLocation } from 'react-router-dom';


function ReadingPage() {
    const [showMenu, setShowMenu] = useState(localStorage.getItem("showMenu") === "true");
    const sidebarRef = useRef(null);
    const [chapterData, setChapterData] = useState();

    const [currentindex, setCurrentIndex] = useState();
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

    const { state } = useLocation();
    const manga = state?.manga;

    async function getChapter() {
        console.log("Fetching chapter for:", manga);

        // Build params object based on backend requirements
        const params = {
            title: manga.title,
            chapter_no: 1
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();

        try {
            const response = await fetch(`https://mangaka-backend.onrender.com/specific-manga-chapter?${queryString}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Assign the fetched data to state variable
            setChapterData(data.chapter.image);
            setCurrentIndex(data.chapter.number);

        } catch (error) {
            console.error("Error fetching chapter:", error);
        }
    }

    async function loadnextchap() {
        console.log("Fetching chapter for:", manga);

        // Build params object based on backend requirements
        const params = {
            title: manga.title,
            chapter_no: currentindex + 1
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();

        try {
            const response = await fetch(`https://mangaka-backend.onrender.com/specific-manga-chapter?${queryString}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Assign the fetched data to state variable
            setChapterData(data.chapter.image);
            setCurrentIndex(data.chapter.number);

        } catch (error) {
            console.error("Error fetching chapter:", error);
        }
    }

    async function loadprevchap() {
        console.log("Fetching chapter for:", manga);

        // Build params object based on backend requirements
        const params = {
            title: manga.title,
            chapter_no: currentindex - 1
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();

        try {
            const response = await fetch(`https://mangaka-backend.onrender.com/specific-manga-chapter?${queryString}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Assign the fetched data to state variable
            setChapterData(data.chapter.image);
            setCurrentIndex(data.chapter.number);

        } catch (error) {
            console.error("Error fetching chapter:", error);
        }
    }
    useEffect(() => {
        if (manga) {
            getChapter();
        }
    }, [manga]);

    useEffect(() => {
        if (currentindex !== undefined) {
            console.log("current chapter index (updated):", currentindex);
        }
    }, [currentindex]);


    return (
        <>
            <Navbar setShowMenu={setShowMenu} />
            {showMenu && (
                <div ref={sidebarRef}>
                    <SlideBar setShowMenu={setShowMenu} />
                </div>
            )}
            <div className="reading-part color-black">
                {chapterData ? (
                    <img
                        src={chapterData}
                        alt="Manga Page"
                        className="manga-image"
                    />
                ) : (
                    <p>Loading chapter...</p>
                )}

            </div>
            <div className="closing-part color-black">
                <div className="button">
                    <button className="backward" onClick={() => loadprevchap()}>Back</button>
                    <button className="forward" onClick={() => loadnextchap()}>Next</button>
                </div>
            </div>
        </>
    )
}

export default ReadingPage;