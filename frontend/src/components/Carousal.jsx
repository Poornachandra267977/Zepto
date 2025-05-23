// import React from 'react'
// import { carousalone, carousaltwo, carousalthree, carousalfour, carousalfive, carousalsix, carousalseven } from '../assets';
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";

// const Carousal = () => {

//   const sliderLeft = () =>{
//     const slider = document.getElementById("slider1");
//     slider.scrollLeft = slider.scrollLeft - 500;
//   }

//   const sliderRight = () =>{
//     const slider = document.getElementById("slider1");
//     slider.scrollLeft = slider.scrollLeft + 500;
//   }

//   return (
//     <div className='w-[1850px] flex flex-row '>
//       <MdChevronLeft onClick={sliderLeft} className="text-[40px] text-black ml-10 cursor-pointer opacity-50 hover:opacity-100 mt-6 md:mt-36"/>
//         <div
//           id={"slider1"}
//           className=" mt-8 flex-row gap-6 cursor-pointer relative flex items-center w-[1125px] h-full whitespace-nowrap scroll-smooth overflow-x-hidden"
//         >
//             <img src={carousalone} alt="carousalone" className='h-[250px] '/>
//             <img src={carousaltwo} alt="carousaltwo" className='h-[250px]'/>
//             <img src={carousalthree} alt="carousalthree" className='h-[250px]'/>
//             <img src={carousalfour} alt="carousalfour" className='h-[250px]'/>
//             <img src={carousalfive} alt="carousalfive" className='h-[250px]'/>
//             <img src={carousalsix} alt="carousalsix" className='h-[250px]'/>
//             <img src={carousalseven} alt="carousalseven" className='rounded-xl h-[250px]'/>
//         </div>
//         <MdChevronRight onClick={sliderRight} className="text-[40px] text-black ml-2 cursor-pointer opacity-50 hover:opacity-100 mt-6 md:mt-36"/>
//     </div>
//   )
// }

// export default Carousal

// 
// import React from 'react';
// import {
//   all,
//   cafe,
//   home,
//   toys,
//   fresh,
//   electronics,
//   mobiles,
//   beauty,
//   fashion,
//   dealzone,
//   babystore
// } from '../assets'; // Update with your image paths

// const categories = [
//   { name: "All", image: all },
//   { name: "Cafe", image: cafe },
//   { name: "Home", image: home },
//   { name: "Toys", image: toys },
//   { name: "Fresh", image: fresh },
//   { name: "Electronics", image: electronics },
//   { name: "Mobiles", image: mobiles },
//   { name: "Beauty", image: beauty },
//   { name: "Fashion", image: fashion },
//   { name: "DealZone", image: dealzone },
//   { name: "BabyStore", image: babystore }
// ];

// const CategoryBar = () => {
//   return (
//     // <div className="w-full flex justify-center mt-6">
//     <div className="w-full flex justify-center mt-6 mb-0">

//       <div className="w-[80%] flex overflow-x-auto space-x-8 items-center">
//         {categories.map((category, index) => (
//           <div
//             key={index}
//             className="flex items-center space-x-2 cursor-pointer pb-1 border-b-2 border-transparent hover:border-purple-600 transition-all"
//             onClick={() => console.log(`${category.name} clicked`)}
//           >
//             <img
//               src={category.image}
//               alt={category.name}
//               className="h-[30px] w-auto object-contain"
//             />
//             <span className="text-sm text-gray-800 font-medium">
//               {category.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryBar;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  all,
  cafe,
  home,
  toys,
  fresh,
  electronics,
  mobiles,
  beauty,
  fashion,
  dealzone,
  babystore
} from '../assets';

const categories = [
  { name: "All", image: all, link: "/allproducts/Fruits" },
  { name: "Cafe", image: cafe, link: "/allproducts/Drinks" },
  { name: "Home", image: home, link: "/allproducts/Fruits" },
  { name: "Toys", image: toys, link: "/allproducts/Toys" },
  { name: "Fresh", image: fresh, link: "/allproducts/Fruits" },
  { name: "Electronics", image: electronics, link: "/allproducts/Electronics" },
  { name: "Mobiles", image: mobiles, link: "/allproducts/Mobiles" },
  { name: "Beauty", image: beauty, link: "/allproducts/Makeup" },
  { name: "Fashion", image: fashion, link: "/allproducts/Makeup" },
  { name: "DealZone", image: dealzone, link: "/allproducts/Deals" },
  { name: "BabyStore", image: babystore, link: "/allproducts/Baths" }
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mt-6 mb-0">
      <div className="w-[80%] flex overflow-x-auto space-x-8 items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 cursor-pointer pb-1 border-b-2 border-transparent hover:border-purple-600 transition-all"
            onClick={() => navigate(category.link)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-[30px] w-auto object-contain"
            />
            <span className="text-sm text-gray-800 font-medium">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
