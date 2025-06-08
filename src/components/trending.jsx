import React from "react";
import "./trendingStyles.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

function Trending() {

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

            <div className="trending-cards-wrapper">
                <div className="wraper">
                    <div className="trending-cards first"></div>
                    <div className="cards-info">
                        <div className="trending-cards-title">Tensei datta ken</div>
                        <div className="trending-card-tags">
                            <div className="trending-tag">Action</div>
                            <div className="trending-tag">Comedy</div>
                        </div>

                        <div className="extra-info">
                            <span className="stars spe-stars">{generateStarsJSX(2)}</span>
                            <div className="view">
                                <div className="view-icon">
                                    <img src="../public/view.png" alt="V" />
                                </div>
                                <span>2.5k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wraper">
                    <div className="trending-cards first"></div>
                    <div className="cards-info">
                        <div className="trending-cards-title">Tensei datta ken</div>
                        <div className="trending-card-tags">
                            <div className="trending-tag">Action</div>
                            <div className="trending-tag">Comedy</div>

                        </div>
                        <div className="extra-info">
                            <span className="stars spe-stars">{generateStarsJSX(4.5)}</span>
                            <div className="view">
                                <div className="view-icon">
                                    <img src="../public/view.png" alt="V" />
                                </div>
                                <span>3k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wraper">
                    <div className="trending-cards first"></div>
                    <div className="cards-info">
                        <div className="trending-cards-title">Tensei datta ken</div>
                        <div className="trending-card-tags">
                            <div className="trending-tag">Action</div>
                            <div className="trending-tag">Comedy</div>
                        </div>
                        <div className="extra-info">
                            <span className="stars spe-stars">{generateStarsJSX(3.5)}</span>
                            <div className="view">
                                <div className="view-icon">
                                    <img src="../public/view.png" alt="V" />
                                </div>
                                <span>4.5k</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wraper">
                    <div className="trending-cards first"></div>
                    <div className="cards-info">
                        <div className="trending-cards-title">Tensei datta ken</div>
                        <div className="trending-card-tags">
                            <div className="trending-tag">Action</div>
                            <div className="trending-tag">Comedy</div>
                        </div>
                        <div className="extra-info">
                            <span className="stars spe-stars">{generateStarsJSX(5)}</span>
                            <div className="view">
                                <div className="view-icon">
                                    <img src="../public/view.png" alt="V" />
                                </div>
                                <span>18k</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Trending;