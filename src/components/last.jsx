import React from "react";
import "./lastStyles.css";

function Last() {
    return (
        <div className="last-container">
            <div className="last-header">
                <div className="last-left">
                    <div className="txt active">Recommended for you</div>
                    <div className="txt">Popular</div>
                    <div className="txt">Originals</div>
                    <div className="txt">What's New</div>
                </div>
                <div className="last-right">
                    <label for="sort-by" className="txt sort-by">Sort by:</label>
                    <select id="sort-by" name="sort-by">
                        <option value="recently-updated">Recently Updated</option>
                        <option value="trending">Most Popular / Trending</option>
                        <option value="newest">Newest First</option>
                        <option value="viewed">Most Viewed</option>
                    </select>

                </div>
            </div>

            <div className="last-cards-container">
                <div className="wrappr">
                    <div className="lst-cards">
                        <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                            alt="Image" />
                    </div>

                    <div className="mini-wrapper">

                        <div className="lst-title">That time I got reincarnated as a slime</div>
                        <div className="tags special">
                            <div className="tag1">Action</div>
                            <div className="tag2">Comedy</div>
                        </div>
                        <div className="episode-container black-color">
                            <div className="episodes">Episode 1</div>
                            <div className="episodes">Episode 2</div>
                            <div className="episodes">Episode 3</div>
                            <div className="episodes">Episode 4</div>
                        </div>
                    </div>

                </div>

                <div className="wrappr">
                    <div className="lst-cards">
                        <img src="https://m.media-amazon.com/images/M/MV5BOTczMjM3MDUtYmZjMC00YzZhLWE4ODQtNjg5YWU4NTJjNzY2XkEyXkFqcGc@._V1_.jpg"
                            alt="Image" />
                    </div>

                    <div className="mini-wrapper">

                        <div className="lst-title">Another one</div>
                        <div className="tags special">
                            <div className="tag1">Romance</div>
                            <div className="tag2">Comedy</div>
                        </div>
                        <div className="episode-container black-color">
                            <div className="episodes">Episode 1</div>
                            <div className="episodes">Episode 2</div>
                            <div className="episodes">Episode 3</div>
                            <div className="episodes">Episode 4</div>
                            <div className="episodes">Episode 5</div>
                            <div className="episodes">Episode 6</div>
                            <div className="episodes">Episode 7</div>
                            <div className="episodes">Episode 8</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Last;