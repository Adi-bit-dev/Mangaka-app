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

    const tags = manga.tags || [];

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

    function formatViews(number) {
        if (number < 1000) {
            return number.toString();
        } else if (number < 1_000_000) {
            return (number / 1000).toFixed(number % 1000 === 0 ? 0 : 1) + 'k';
        } else {
            return (number / 1_000_000).toFixed(number % 1_000_000 === 0 ? 0 : 1) + 'M';
        }
    }

    function handleReadClick(manga) {
        if (!chapterName || chapterName.length === 0) {
            alert("No chapters available for this manga yet.");
            return;
        }
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

            <div className="comics-info-container">
                <div className="info1">

                    <div className="rex-ctrl">
                        <div className="info-card">
                            <img src={manga.Coverimg} alt="G" />
                        </div>

                        <div className="mid-ctn">

                            <div className="info-views">
                                <div className="views-img">
                                    <img src="/view.png" alt="E" />
                                </div>
                                <span>25k</span>
                            </div>

                            <div className="info-views">
                                <div className="views-img">
                                    <img src="/acc.png" alt="E" />
                                </div>
                                <span>25k</span>
                            </div>

                        </div>

                        <div className="info-bookmark">Bookmark</div>
                    </div>

                    <div className="sub-info">
                        <div className="title">{manga.title}</div>
                        <div className="maker">
                            <div className="profile">
                                <img src="/download.jpg" alt="P" />
                            </div>
                            <div className="author-name">Harumi</div>
                        </div>

                        <div className="summary">
                            <div className="title-sum">Summary</div>
                            <div className="info-desc">
                                <p>{manga.description}</p>
                            </div>
                        </div>

                        <div className="comic-tags">
                            {tags.map((tag, index) => {
                                return (
                                    <div className="comic-tag" key={index}>
                                        {tag}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="info2">
                    <div className="info-chap">
                        <div className="chapter">First chapter</div>
                        <div className="chapter">Last chapter</div>
                    </div>
                    <div className="chap-container">
                        {Array.isArray(chapterName) && chapterName.length > 0 ? (
                            chapterName.map((chapter, index) => (
                                <div key={index} className="chap-sec">
                                    <span className="chap-fst">{chapter.title}</span>
                                    <span className="chap-lst">{chapter.createdAt}</span>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: "black" }}>No chapters found</div>

                        )}
                    </div>
                </div>

                <div className="info-weekly-spotlight">
                    <div className="info-weekly-spotlight-cards-container">
                        <div className="info-wrapper">
                            <div className="info-weekly-spotlight-cards">
                                <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                                    alt="Image" />
                            </div>
                            <div className="info-weekly-cards-title">Solo levelling</div>
                            <div className="tags">
                                <div className="tag1">Action</div>
                                <div className="tag2">Comedy</div>
                            </div>

                        </div>

                        <div className="info-wrapper">
                            <div className="info-weekly-spotlight-cards">
                                <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                                    alt="Image" />
                            </div>
                            <div className="info-weekly-cards-title">Solo levelling</div>
                            <div className="tags">
                                <div className="tag1">Action</div>
                                <div className="tag2">Comedy</div>
                            </div>

                        </div>

                        <div className="info-wrapper">
                            <div className="info-weekly-spotlight-cards">
                                <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                                    alt="Image" />
                            </div>
                            <div className="info-weekly-cards-title">Solo levelling</div>
                            <div className="tags">
                                <div className="tag1">Action</div>
                                <div className="tag2">Comedy</div>
                            </div>

                        </div>

                        <div className="info-wrapper">
                            <div className="info-weekly-spotlight-cards">
                                <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                                    alt="Image" />
                            </div>
                            <div className="info-weekly-cards-title">Solo levelling</div>
                            <div className="tags">
                                <div className="tag1">Action</div>
                                <div className="tag2">Comedy</div>
                            </div>

                        </div>

                        <div className="info-wrapper">
                            <div className="info-weekly-spotlight-cards">
                                <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                                    alt="Image" />
                            </div>
                            <div className="info-weekly-cards-title">Solo levelling</div>
                            <div className="tags">
                                <div className="tag1">Action</div>
                                <div className="tag2">Comedy</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComicsInfo;