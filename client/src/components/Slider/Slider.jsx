import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/react-splide/css/core';
import "./Slider.css"

import React from 'react'

const Slider = (props) => {
    const images = props.images

    return (
        <Splide
            className='carouselParent'
            options={{
                type: 'loop',
                gap: '12px',
                drag: 'free',
                arrows: false,
                pagination: false,
                perPage: 1,
                direction: 'ttb',
                height: 'auto', 
                autoScroll: {
                    pauseOnHover: false,
                    pauseOnFocus: false,
                    rewind: false,
                    speed: 1.75,
                }
            }}
            extensions={{ AutoScroll }}
        >
            {
                images.map((item, index) => (
                    <SplideSlide key={index} className='sliderImg' >
                        <img src={item.img} alt="image"/>
                        <p>{item.caption}</p>
                    </SplideSlide>
                ))
            }
        </Splide>
    )
}

export default Slider