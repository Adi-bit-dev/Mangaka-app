import react from 'react';
import "./sliderStyles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSlider() {
    const [latestManga, setLatestManga] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLatestManga = async () => {
            try {
                const res = await fetch('https://mangaka-backend.onrender.com/get-latest-manga');
                const data = await res.json();
                // console.log(data);
                setLatestManga(data);
            } catch (err) {
                console.error('Error fetching latest manga:', err);
            }
        };

        fetchLatestManga();
    }, []);

    // Function to handle card click and log the title
    const handleCardClick = (manga) => {
        console.log(manga);
        navigate('/comicsinfo', { state: { manga } });
    };
    return (
        <div className="weekly-spotligt spe-head" style={{width: "94%", maxWidth: "none"}}>
            <div className="header">Latest Updates</div>

            <div className="weekly-spotlight-cards-container spe-head-cards-container">
                {latestManga.map((manga) => (
                    <div className="wrapper" key={manga._id} onClick={() => handleCardClick(manga)}>
                        <div className="weekly-spotlight-cards spe-slider-cards">
                            <img src={manga.Coverimg} alt={manga.title} loading="lazy" />
                        </div>
                        <div className="weekly-cards-title">{manga.title}</div>
                        <div className="tags weekly-tags">
                            {(() => {
                                // Shuffle tags and pick 2 random tags
                                const shuffledTags = [...manga.tags].sort(() => 0.5 - Math.random());
                                const selectedTags = shuffledTags.slice(0, 2);

                                return selectedTags.map((tag, idx) => (
                                    <div key={idx} className={`tag${idx + 1}`}>{tag}</div>
                                ));
                            })()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeroSlider;