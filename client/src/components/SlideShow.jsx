import { useState, useEffect } from "react";
import { sliderData } from '../slider-data'
import '../css/Slider.css'

const SlideShow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slideLength = sliderData.length;

    const autoScroll = true;

    let slideInterval;

    let intervalTime = 8000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
        console.log("next");
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <>
        <div className="slider">
            {sliderData.map((slide, index) => {
                return (
                    <div className={index === currentSlide ? "slide current" : "slide"} key={index}>
                        {index === currentSlide && (
                            <div>
                                <img src={slide.image} alt="slide" className="image" />
                                <div className="content">
                                    <h2>{slide.desc}</h2>
                                    <h6>{slide.heading}</h6>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            )}
        </div>
        </>
    )
}

export default SlideShow;