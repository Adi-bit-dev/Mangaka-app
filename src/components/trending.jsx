import { useState, useEffect } from "react";
import "./trendingStyles.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";

function Trending() {

    const navigate = useNavigate();

    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingManga = async () => {
            try {
                const response = await fetch("https://mangaka-backend.onrender.com/get-trending-manga");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMangaList(data);
            } catch (err) {
                console.error("Failed to fetch trending manga:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingManga();
    }, []);

    const handleCardClick = (manga) => {
        console.log(manga);
        navigate('/comicsinfo', { state: { manga } });
    };

    function formatViews(number) {
        if (number < 1000) {
            return number.toString();
        } else if (number < 1_000_000) {
            return (number / 1000).toFixed(number % 1000 === 0 ? 0 : 1) + 'k';
        } else {
            return (number / 1_000_000).toFixed(number % 1_000_000 === 0 ? 0 : 1) + 'M';
        }
    }

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

    return (
        <div className="trending-container">
            <div className="header">New & Trending</div>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && mangaList.length > 0 && (
                <div className="trending-cards-wrapper">
                    {mangaList.map((manga, index) => (
                        <div className="wraper" key={index} onClick={() => handleCardClick(manga)}>
                            <div
                                className="trending-cards"
                                style={{ backgroundImage: `url(${manga.Coverimg})` }}
                            ></div>
                            <div className="cards-info">
                                <div className="trending-cards-title">{manga.title}</div>
                                <div className="trending-card-tags">
                                    {(() => {
                                        // Shuffle tags and pick 2 random tags
                                        const shuffledTags = [...manga.tags].sort(() => 0.5 - Math.random());
                                        const selectedTags = shuffledTags.slice(0, 2);

                                        return selectedTags.map((tag, idx) => (
                                            <div key={idx} className="trending-tag">{tag}</div>
                                        ));
                                    })()}
                                </div>
                                <div className="extra-info">
                                    <span className="stars spe-stars">{generateStarsJSX(manga.ratings)}</span>
                                    <div className="view">
                                        <div className="view-icon">
                                            <img src="/view.png" alt="views" />
                                        </div>
                                        <span>{formatViews(manga.views)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Trending;
