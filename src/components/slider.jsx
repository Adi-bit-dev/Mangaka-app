import React, { useRef, useEffect, useState } from 'react';
import './sliderStyles.css';
import SectionOne from './heroSections/sectionOne';
import SectionTwo from './heroSections/sectionTwo';
import SectionThree from './heroSections/sectionThree';
import SectionFour from './heroSections/sectionFour';

const HeroSlider = () => {
    const slidesRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        { content: <SectionOne /> },
        { content: <SectionTwo /> },
        { content: <SectionThree /> },
        { content: <SectionFour /> },
    ];

    const handleScroll = () => {
        const index = Math.round(slidesRef.current.scrollLeft / window.innerWidth);
        setActiveIndex(index);
    };

    useEffect(() => {
        const container = slidesRef.current;
        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % slides.length;
                slidesRef.current.scrollTo({
                    left: nextIndex * window.innerWidth,
                    behavior: 'smooth',
                });
                return nextIndex;
            });
        }, 4000); // 4 seconds per slide

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="hero">
            <div className="blur-layer"></div>
            <div className="slides" ref={slidesRef}>
                {slides.map((slide, i) => (
                    <div className="slide" key={i}>
                        <div>{slide.content}</div>
                    </div>
                ))}
            </div>
            <div className="dots">
                {slides.map((_, i) => (
                    <div key={i} className={`dot ${i === activeIndex ? 'active' : ''}`} />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
