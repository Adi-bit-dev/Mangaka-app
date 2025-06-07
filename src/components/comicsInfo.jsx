import { useState, useEffect, useRef } from "react";
import "./comicsInfoStyles.css";
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

import Navbar from "./navbar";
import SlideBar from "./slidebar";

function ComicsInfo() {
    const [showMenu, setShowMenu] = useState(localStorage.getItem("showMenu") === "true");
    const [chapterName, setChapterName] = useState([]);
    const navigate = useNavigate();

    const sidebarRef = useRef(null);

    const { state } = useLocation();
    const manga = state?.manga;

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

    function handleReadClick(manga) {
        console.log(manga);
        navigate('/readingPage', { state: { manga } });
    }

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

    async function getChapters(manga_title) {
        try {

            const response = await fetch(`https://mangaka-backend.onrender.com/manga-chapters?title=${encodeURIComponent(manga_title)}`);
            const data = await response.json();
            // console.log(data);
            setChapterName(data);

        } catch (err) {
            console.error("Error fetching manga:", err);
        }
    }
    useEffect(() => {
        console.log("get chapters useEffect running");
        getChapters(manga.title);
    }, []);

    return (
        <>
            <Navbar setShowMenu={setShowMenu} />
            {showMenu && (
                <div ref={sidebarRef}>
                    <SlideBar />
                </div>
            )}
            <div className="info-card">
                <div className="bkmark">
                    <img src="/bookmark.png" alt="B" width="40" height="40" />
                </div>
                <div className="image-placeholder">
                    <div className="blur-layer special-blur"></div>
                    <img src={manga.Coverimg} alt="Cover Image" width="250" height="375" />

                    <div className="holder">
                        <img src={manga.Coverimg} alt="Cover Image" width="250" height="375" />

                        <div className="startReading" onClick={() => handleReadClick(manga)}>Start Reading</div>
                    </div>
                </div>
                <div className="content">
                    <div className="flexo">
                        <div className="views color-black">
                            <span className="roboto">Views: </span>
                            <span>2,000</span>
                        </div>
                        <h1 className="roboto color-black">{manga.title}</h1>
                        <div className="info">
                            <span className="roboto"><strong>Author:</strong>{manga.author || 'Unknown'}</span>
                            <span className="roboto">
                                <strong>Genre:</strong>
                                <span className="width-fix">
                                    {Array.isArray(manga.tags) ? manga.tags.join(', ') : 'No tags available.'}
                                </span>
                            </span>
                            <span className="roboto"><strong>Release:</strong>{
                                new Date(manga.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }</span>
                            <span className="roboto"><strong>Status:</strong>{manga.status}</span>
                            <span className="flex roboto"><strong>Rating:</strong> <span className="stars">{generateStarsJSX(manga.ratings)}</span></span>
                        </div>
                        <h2 className="color-black">Description</h2>
                        <p className="roboto">{manga.description || 'No description available.'}</p>
                        <div className="chapters spe-chap">
                            {Array.isArray(chapterName) && chapterName.length > 0 ? (
                                chapterName.map((chapter, index) => (
                                    <div key={index} className="butn">
                                        <span className="margin-left">{chapter.title}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="color-black">No chapters found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComicsInfo;