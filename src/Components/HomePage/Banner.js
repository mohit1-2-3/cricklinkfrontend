import { useEffect, useState } from 'react';
import './homePage.css';

export default function Banner() {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Define slider items
    const sliderItems = [
        {
            imgSrc: "https://img.freepik.com/premium-photo/photo-cricket-player-stadium-ready-icc-world-cup-2023-match-generative-ai_742418-6168.jpg?w=740",
            author: "CODE_ELITES",
            title: "STREET CRICKET",
            topic: "TITANS",
            description: "Your passion decides the player, your effort decides the champion....",
        },
        {
            imgSrc: "https://spin.axiomthemes.com/wp-content/uploads/2023/09/post12-copyright.jpg",
            author: "CODE_ELITES",
            title: "STREET CRICKET",
            topic: "TITANS",
            description: "Your passion decides the player, your effort decides the champion....",
        },
        {
            imgSrc: "https://spin.axiomthemes.com/wp-content/uploads/2023/09/post2-copyright-1536x1178.jpg",
            author: "CODE_ELITES",
            title: "STREET CRICKET",
            topic: "TITANS",
            description: "Your passion decides the player, your effort decides the champion....",
        },
        {
            imgSrc: "https://spin.axiomthemes.com/wp-content/uploads/2023/09/post8-copyright-1290x725.jpg",
            author: "CODE_ELITES",
            title: "STREET CRICKET",
            topic: "TITANS",
            description: "Your passion decides the player, your effort decides the champion...",
        }
    ];

    // Function to handle next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    };

    // Function to handle previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length);
    };

    // Effect for automatic sliding
    useEffect(() => {
        const autoSlideInterval = setInterval(nextSlide, 7000);

        // Clear interval on component unmount
        return () => clearInterval(autoSlideInterval);
    }, []);

    return <>
        <div className="carousel">
            <div className="list">
                {sliderItems.map((item, index) => (
                    <div className={index === currentIndex ? "item active" : "item"} key={index}>
                        <img src={sliderItems[currentIndex].imgSrc} alt={`Slide ${index}`} />
                        <div className="content">
                            <div className="author fs-6">{item.author}</div>
                            <div className="title">{item.title}</div>
                            <div className="topic">{item.topic}</div>
                            <div className="des fs-4">{item.description}</div>

                        </div>
                    </div>
                ))}
            </div>

            <div className="thumbnail">
                {
                    sliderItems.map((item, index) => (
                        <div className="item" key={index}>
                            <img src={item.imgSrc} alt={`Thumbnail ${index}`} />
                            <div className="content">
                                <div className="title"> </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="arrows">
                <button id="prev" onClick={prevSlide}>&#8592;</button>
                <button id="next" onClick={nextSlide}>&#8594;</button>
            </div>
            <div className="time"></div>
        </div>
    </>
}