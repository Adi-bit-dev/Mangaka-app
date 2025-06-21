import { useState, useRef, useEffect } from "react";
import "./searchPageStyles.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

import Navbar from "./navbar";
import SlideBar from "./slidebar";
import { useLocation, useNavigate } from "react-router-dom";

function SearchPage() {
    const location = useLocation();
    const mangaName = location.state?.mangaName || "";

    const [showMenu, setShowMenu] = useState(localStorage.getItem("showMenu") === "true");
    const sidebarRef = useRef(null);

    const [manga, setManga] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleCardClick = (manga) => {
        navigate('/comicsinfo', { state: { manga } });
    };

    function generateStarsJSX(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon icon={solidStar} key={`full-${i}`} />);
        }

        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half" />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon icon={emptyStar} key={`empty-${i}`} />);
        }

        return stars;
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
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

    useEffect(() => {
        if (mangaName.trim() !== "") {
            console.log(mangaName);
            searchManga(mangaName);
        } else {
            setLoading(false);
        }
    }, [mangaName]);

    const searchManga = async (titleQuery) => {
        setLoading(true);
        try {
            const response = await fetch(`https://mangaka-backend.onrender.com/search?titleQuery=${encodeURIComponent(titleQuery)}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            if (Array.isArray(data.complete_result)) {
                setManga(data.complete_result);
            } else {
                setManga([]);
            }

        } catch (error) {
            console.error("Error fetching manga:", error.message);
            setManga([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-root">
            <Navbar setShowMenu={setShowMenu} className="special-nav" />
            {showMenu && (
                <div ref={sidebarRef}>
                    <SlideBar />
                </div>
            )}

            <div className="search-container">
                <div className="upper-search-section">
                    <div id="search-header">Search for:</div>
                    <div className="search-text">
                        <span>{mangaName}</span>
                    </div>
                </div>

                <div className="lower-search-section">
                    {loading ? (
                        <p className="color-black">Loading results...</p>
                    ) : manga.length === 0 ? (
                        <p className="color-black">No results found.</p>
                    ) : (
                        manga.map((item, index) => (
                            <div
                                className="search-cards"
                                key={item.id || index}
                                onClick={() => handleCardClick(item)}
                            >
                                <img
                                    src={item.Coverimg || "../public/test.jpg"}
                                    alt={item.title}
                                />
                                <div className="weekly-cards-title special-margin">{item.title}</div>
                                <div className="stars special-stars" style={{ filter: "invert(1)" }}>
                                    {generateStarsJSX(item.ratings || 0)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
