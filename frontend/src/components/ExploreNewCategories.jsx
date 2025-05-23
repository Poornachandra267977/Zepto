
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { explorenewcategory } from "../constant/data";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import CuratedForYou from "./CuratedForYou";

import {
  Audio,
  Homekitchen,
  Tech,
  Charging,
  Personal,
  Mobiletab,
  Flawless,
  Dazzling,
  Nails,
  Korean,
  Combos,
  Luscious,
} from "../assets";

// Example carousel items
const superSonicItems = [
  { id: 1, title: "Home & Kitchen", offer: "UP TO 80% OFF", image: Homekitchen },
  { id: 2, title: "Tech Accessories", offer: "UP TO 75% OFF", image: Tech },
  { id: 3, title: "Charging Needs", offer: "UP TO 80% OFF", image: Charging },
  { id: 4, title: "Grooming", offer: "UP TO 70% OFF", image: Personal },
  { id: 5, title: "Mobiles", offer: "UP TO 55% OFF", image: Mobiletab },
  { id: 6, title: "Audio", offer: "UP TO 55% OFF", image: Audio },
];

const beautyLitItems = [
  { id: 1, title: "Flawless Face", offer: "UP TO 45% OFF", image: Flawless },
  { id: 2, title: "Dazzling Eyes", offer: "UP TO 40% OFF", image: Dazzling },
  { id: 3, title: "Nails & More", offer: "UP TO 50% OFF", image: Nails },
  { id: 4, title: "Korean Beauty", offer: "UP TO 40% OFF", image: Korean },
  { id: 5, title: "Combos & Kits", offer: "UP TO 25% OFF", image: Combos },
  { id: 6, title: "Luscious", offer: "UP TO 25% OFF", image: Luscious },
];

// Reusable horizontal carousel
const CardCarousel = ({ items }) => (
  <div className="flex overflow-x-auto gap-3 py-4 px-2 scrollbar-hide">
    {items.map((item) => (
      <div key={item.id} className="min-w-[130px] bg-white rounded-lg p-3 flex flex-col items-center shadow hover:shadow-md transition">
        <img src={item.image} alt={item.title} className="w-10 h-10 mb-2" />
        <p className="text-xs text-gray-600 text-center">{item.title}</p>
        <p className="text-[10px] text-[#ff3269] mt-1 font-bold">{item.offer}</p>
      </div>
    ))}
  </div>
);

const ExploreNewCategories = () => {
  const sliderLeft = () => {
    const slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const sliderRight = () => {
    const slider = document.getElementById("slider2");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="px-4">
      {/* Super Sonic & Beauty Lit Section */}
      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Super Sonic */}
        <div className="bg-black text-white rounded-xl p-4 relative overflow-hidden">
          <h3 className="text-lg font-semibold mb-1">Super Sonic Deals</h3>
          <p className="text-sm mb-4">UP TO 90% OFF</p>
          <img
            src="https://cdn.zeptonow.com/production/tr:w-1280,ar-2368-528,pr-true,f-auto,q-80/inventory/banner/eaff67d6-aa53-40fe-a6ba-38793acdd518.png"
            alt="Super Sonic"
            className="absolute top-4 right-4 w-24 h-auto object-contain hidden md:block"
          />
          <CardCarousel items={superSonicItems} />
        </div>

        {/* Beauty Lit */}
        <div className="bg-red text-gray-900 rounded-xl p-4 relative overflow-hidden">
          <h3 className="text-lg font-semibold text-pink-600">Beauty LIT Fest</h3>
          <p className="text-sm mb-4 text-pink-500">UP TO 60% OFF</p>
          <img
            src="https://cdn.zeptonow.com/production/tr:w-1280,ar-2368-528,pr-true,f-auto,q-80/inventory/banner/874d9674-2f4f-4f60-bc5b-9fb52084a738.png"
            alt="Beauty Lit"
            className="absolute top-4 right-4 w-24 h-auto object-contain hidden md:block"
          />
          <CardCarousel items={beautyLitItems} />
        </div>
      </div>

      {/* Explore by Categories */}
      <div className="flex flex-row justify-between pb-6 mt-12">
        <h2 className="text-md sm:text-xl font-semibold">Explore By Categories</h2>
        <a href="/" className="flex flex-row items-center gap-2 font-semibold text-[#FF3269]">
          See All <BsChevronRight />
        </a>
      </div>

      <div className="w-full flex flex-row items-center">
        <MdChevronLeft
          onClick={sliderLeft}
          className="text-[40px] text-black cursor-pointer opacity-50 hover:opacity-100"
        />
        <div className="w-full overflow-x-hidden scroll-smooth" id="slider2">
          <div className="flex flex-row gap-4">
            {explorenewcategory.map((item) => (
              <div key={item.id} className="min-w-[200px]">
                <img src={item.img} alt={item.title} className="h-[220px] w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
        <MdChevronRight
          onClick={sliderRight}
          className="text-[40px] text-black cursor-pointer opacity-50 hover:opacity-100"
        />
      </div>

      {/* Curated Section */}
      <CuratedForYou />

      {/* Bottom Banner */}
      <div className="mt-10 mb-3">
        <img
          src="https://cdn.zeptonow.com/production///tr:w-981,ar-981-342,pr-true,f-webp,q-80/inventory/banner/ba092e9b-6ee7-4f65-aff0-db7c1bf109ad-Late-Night-Cravings-Sorted_Premium-Promo_(1).jpg"
          alt="bannerimg"
          className="h-[180px] lg:h-[330px] w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default ExploreNewCategories;


