import react from 'react';
import "./aboutUsPageStyles.css";
import { useNavigate } from 'react-router-dom';

function AboutUs() {
    const navigate = useNavigate();

    function handleBack() {
        console.log("back button clicked");
        navigate('/');
        localStorage.setItem("showMenu", 'false');
    }

    return (
        <>
            <div className="back" onClick={handleBack}>
                <img src="/back.png" alt="B" />
            </div>

            <header>
                <h1>About Mangaka</h1>
                <p>
                    Your home for reading and creating manga, powered by community and creativity.
                </p>
            </header>

            <div className="container">
                <section>
                    <h2>Who We Are</h2>
                    <p>
                        Mangaka is a passionate platform dedicated to bringing manga creators and fans closer than ever before.
                        Built with love and a strong sense of community,
                        Mangaka is where creativity thrives, stories are born, and fans unite.
                    </p>
                </section>

                <section>
                    <h2>Our Mission</h2>
                    <p>
                        We aim to empower independent artists and storytellers to publish, grow, and monetize their manga works
                        with ease. For readers, we strive to create a clean,
                        enjoyable experience free from clutter and distraction — just pure storytelling.
                    </p>
                </section>

                <section>
                    <h2>The Team Behind Mangaka</h2>
                    <div className="team-grid">
                        <div className="member">
                            <h3>Parijat Das</h3>
                            <p>Developer and founder of Mangaka</p>
                        </div>
                        <div className="member">
                            <h3>Directed by</h3>
                            <p>Depression</p>
                        </div>
                        <div className="member">
                            <h3>Produced by</h3>
                            <p>Anxiety</p>
                        </div>
                        <div className="member">
                            <h3>UI/UX designer</h3>
                            <p>Chat gpt</p>
                        </div>
                        <div className="member">
                            <h3>Life support </h3>
                            <p>Chat gpt</p>
                        </div>
                        <div className="member">
                            <h3>Marketer and cummunity lead</h3>
                            <p>Debopriyo Maikup</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer>
                &copy; 2025 Mangaka. Built for creators, by creators.
            </footer>
        </>
    )
}

export default AboutUs;