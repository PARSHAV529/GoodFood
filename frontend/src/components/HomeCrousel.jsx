import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import img1 from '../images/homeSlioder1.jpg'
import img2 from '../images/slider2.jpg'
import img3 from '../images/slider3.jpg'
import img4 from '../images/slider4.jpg'



export default function CarouselWithControls(){
  return (
    <>
      <TECarousel showControls ride="carousel" >
        <div  className=" w-full h-screen z-[-1]  overflow-hidden after:clear-both after:block after:content-['']">
          <TECarouselItem
            itemID={1}
            className="relative float-left -mr-[100%]  hidden w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none"
          >
            <img 
              src={img4}
              className="block w-full h-screen opacity-95 object-cover"
              alt="..."
            />
          </TECarouselItem>
          <TECarouselItem
            itemID={2}
            className="relative float-left hidden -mr-[100%] w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src={img2}
              className="block w-full h-screen opacity-95 object-cover"
              alt="..."
            />
          </TECarouselItem>
          <TECarouselItem
            itemID={3}
            className="relative float-left -mr-[100%]  hidden w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src={img3}
              className="block w-full h-screen opacity-95 object-cover"
              alt="..."
            />
          </TECarouselItem>
          </div>
          {/* <TECarouselItem
            itemID={4}
            className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none"
          >
            <img
              src={img4}
              className="block w-full h-[80vh] object-cover"
              alt="..."
            />
          </TECarouselItem> */}
        
      </TECarousel>
    </>
  );
}