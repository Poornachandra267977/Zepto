import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { curatedforyou } from "../constant/data";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CuratedForYou = () => {
  const sliderLeft = () => {
    const slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRight = () => {
    const slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="mt-2 py-8">
      <div className="flex flex-row justify-around gap-[100px] ml-0 md:gap-[800px] pb-6 sm:ml-0">
        <h2 className="text-md sm:text-xl font-semibold py-2">
          Curated For You
        </h2>
        <a
          href="/"
          className="flex flex-row justify-center items-center gap-2 font-semibold text-[#FF3269]"
        >
          See All
          <BsChevronRight />
        </a>
      </div>
      <div className="w-[1250px] flex flex-row">
        <MdChevronLeft
          onClick={sliderLeft}
          className="text-[40px] text-black ml-20 cursor-pointer opacity-50 hover:opacity-100 mt-6 md:mt-20"
        />
        <div
          className=" ml-1 w-[1250px] overflow-x-hidden scroll-smooth"
          id={"slider3"}
        >
          <div className=" flex-row cursor-pointer relative flex items-center w-[1500px] h-full whitespace-nowrap gap-4">
            {curatedforyou.map((item, id) => (
              <div key={id}>
                <img src={item.img} alt="img" className="h-[150px] w-full" />
              </div>
            ))}
          </div>
        </div>
        <MdChevronRight
          onClick={sliderRight}
          className="text-[40px] text-black ml-2 cursor-pointer opacity-50 hover:opacity-100 mt-6 md:mt-20"
        />
      </div> 
    </div>
  );
};

export default CuratedForYou;
