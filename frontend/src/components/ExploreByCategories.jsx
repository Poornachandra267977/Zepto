
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  ebgrocery,
  ebcfruitsandvege,
  ebcpackagedfood,
  ebcfrozenfood,
  ebcmasala,
  ebcsweet,
  ebcbath,
  ebcbiscuits,
  ebcbreakfast,
  ebccleaning,
  ebccolddrink,
  ebcdairy,
  ebcelectricals,
  ebchealth,
  ebchomegrown,
  ebchomeneeds,
  ebchygiene,
  ebcmakeup,
  ebcmeat,
  ebcmuni,
  ebctea,
} from "../assets";

const ExploreSection = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -1075, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 1075, behavior: "smooth" });
  };

  const images = [
    ebcfruitsandvege, ebgrocery, ebcmasala, ebcsweet, ebcfrozenfood,
    ebcpackagedfood, ebcdairy, ebccolddrink, ebcmuni, ebcmeat,
    ebcbreakfast, ebctea, ebcbiscuits, ebcmakeup, ebcbath,
    ebccleaning, ebchomeneeds, ebcelectricals, ebchygiene, ebchealth,
    ebchomegrown,
  ];

  return (
    // <div className="w-full flex flex-col items-center bg-white pt-[10px]">
    <div className="w-full flex flex-col items-center bg-white pt-0 mt-0">

      {/* Category Carousel */}
      <div className="w-[80%] relative flex items-center h-[50vh]">
        <MdChevronLeft
          onClick={scrollLeft}
          className="absolute left-0 z-10 text-4xl cursor-pointer text-black opacity-50 hover:opacity-100"
        />
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth whitespace-nowrap gap-4 px-10 no-scrollbar"
          style={{ width: "100%" }}
        >
          {images.map((img, index) => (
            <a href="/allproducts/Fruits" key={index} className="flex-shrink-0">
              <img
                src={img}
                alt={`category-${index}`}
                className="w-[150px] h-[150px] object-cover rounded-lg"
              />
            </a>
          ))}
        </div>
        <MdChevronRight
          onClick={scrollRight}
          className="absolute right-0 z-10 text-4xl cursor-pointer text-black opacity-50 hover:opacity-100"
        />
      </div>

      {/* Paan & Cigarettes Banner */}
      <div className="w-full flex justify-center">
        <img
          src="https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png"
          alt="Pan & Cigarettes"
          className="w-[80%] cursor-pointer rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          onClick={() => navigate("/allproducts/Paan")}
        />
      </div>
    </div>
  );
};

export default ExploreSection;
