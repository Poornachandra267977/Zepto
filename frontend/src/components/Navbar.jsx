

// import React, { useState } from "react";
// import { logo } from "../assets";
// import { BsBag, BsSearch } from "react-icons/bs";
// import { BiUser } from "react-icons/bi";
// import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const userData = useSelector((store) => store.userAuthReducer.user);
//   const cartItem = useSelector((store) => store.cartReducer.cart);

//   let value = 0;
//   let offerValue = 0;
//   cartItem.map((el) => {
//     offerValue += Number(el.price);
//     return (value = value + Number(el.price2));
//   });
//   const finalAmount = offerValue;
//   offerValue = value - offerValue;

//   const id = userData?.uid;

//   // ✅ Handle search
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchTerm.trim()) {
//       navigate(`/search?q=${searchTerm.trim()}`);
//     }
//   };

//   return (
//     <>
//       <div className="bg-white flex flex-row h-[80px] w-full items-center justify-between px-4 md:px-10 shadow-md">
//         <div className="flex flex-row items-center gap-4 md:gap-6">
//           {/* Logo */}
//           <Link to="/">
//             <img src={logo} alt="logo" className="h-[24px] md:h-[36px]" />
//           </Link>

//           {/* Super Saver Button */}
//           <button className="h-[44px] w-[120px] rounded-full border border-gray-200 p-1 flex items-center bg-slate-100">
//             <div className="relative flex items-center w-full h-full">
//               <div className="absolute h-8 w-8 rounded-full bg-white shadow-md transition-transform duration-[0.5s] ease-in-out translate-x-0"></div>
//               <img
//                 alt="super-saver"
//                 width="44"
//                 height="26"
//                 className="relative overflow-hidden h-[26px] w-11 left-10 object-contain"
//                 src="https://www.zeptonow.com/images/super-saver/super-saver-inactive.svg"
//               />
//             </div>
//           </button>

//           {/* Location Dropdown */}
//           <select className="border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none">
//             <option>Select Location</option>
//             <option>Mumbai</option>
//             <option>Delhi</option>
//             <option>Bangalore</option>
//           </select>
//         </div>

//         {/* ✅ Search Input */}
//         <div>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={handleSearch}
//             className="hidden md:flex md:w-[300px] lg:w-[600px] h-[40px] rounded-lg px-8 border border-gray-300 focus:outline-none"
//             placeholder="Search for over 5000+ products"
//           />
//         </div>


//         <BsSearch className="hidden sm:flex md:hidden text-gray-700 text-[20px]" />

//         {/* Right-side */}
//         <div className="flex items-center gap-5">
//           {!id ? (
//             <Link to="/login" className="text-gray-800 font-semibold hidden sm:flex items-center gap-1">
//               <BiUser className="text-xl" />
//             </Link>
//           ) : (
//             <Link to="/account" className="text-gray-800 font-semibold hidden sm:flex">
//               My Account
//             </Link>
//           )}

//           <Link to="/cart">
//             {cartItem.length === 0 ? (
//               <button className="text-gray-800 font-semibold hidden sm:flex items-center gap-1">
//                 <BsBag className="text-[24px] mr-3" />
//               </button>
//             ) : (
//               <button className="hidden sm:flex bg-[#FF3269] text-white text-[13px] md:text-[16px] font-semibold px-4 md:px-7 rounded-lg h-[60px] items-center justify-center">
//                 <BsBag className="text-[19px] mr-3" />
//                 <div className="h-[30px] w-[2px] bg-white mr-3"></div>
//                 <div className="md:flex hidden flex-col gap-y-[1px]">
//                   <div className="font-medium">{cartItem.length} Items</div>
//                   <div>₹{finalAmount}</div>
//                 </div>
//               </button>
//             )}
//           </Link>

//           <BiUser className="flex sm:hidden text-gray-700 text-[20px] font-semibold cursor-pointer" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { logo } from "../assets";
import { BsBag, BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((store) => store.userAuthReducer.user);
  const cartItem = useSelector((store) => store.cartReducer.cart);

  let value = 0;
  let offerValue = 0;
  cartItem.map((el) => {
    offerValue += Number(el.price);
    return (value = value + Number(el.price2));
  });
  const finalAmount = offerValue;
  offerValue = value - offerValue;

  const id = userData?.uid;

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
    }
  };

  return (
    <>
      <div className="bg-white flex flex-row h-[80px] w-full items-center justify-between px-4 md:px-10 shadow-md relative">
        <div className="flex flex-row items-center gap-4 md:gap-6">
          <Link to="/">
            <img src={logo} alt="logo" className="h-[24px] md:h-[36px]" />
          </Link>

          <button className="h-[44px] w-[120px] rounded-full border border-gray-200 p-1 flex items-center bg-slate-100">
            <div className="relative flex items-center w-full h-full">
              <div className="absolute h-8 w-8 rounded-full bg-white shadow-md transition-transform duration-[0.5s] ease-in-out translate-x-0"></div>
              <img
                alt="super-saver"
                width="44"
                height="26"
                className="relative overflow-hidden h-[26px] w-11 left-10 object-contain"
                src="https://www.zeptonow.com/images/super-saver/super-saver-inactive.svg"
              />
            </div>
          </button>

          <select className="border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 focus:outline-none">
            <option>Select Location</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            className="hidden md:flex md:w-[300px] lg:w-[600px] h-[40px] rounded-lg px-8 border border-gray-300 focus:outline-none"
            placeholder="Search for over 5000+ products"
          />
        </div>

        <BsSearch className="hidden sm:flex md:hidden text-gray-700 text-[20px]" />

        <div className="flex items-center gap-5 relative">
          {!id ? (
            <div className="relative">
              <div
                className="text-gray-800 font-semibold hidden sm:flex items-center gap-1 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <BiUser className="text-xl" />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-[180px] bg-white shadow-lg rounded-lg z-10">
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    User Sign Up
                  </Link>
                  <Link
                    to="/vendor-signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Vendor Sign Up
                  </Link>
                  <Link
                    to="/admin-signup"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Admin Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t"
                    onClick={() => setShowDropdown(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/account" className="text-gray-800 font-semibold hidden sm:flex">
              My Account
            </Link>
          )}

          <Link to="/cart">
            {cartItem.length === 0 ? (
              <button className="text-gray-800 font-semibold hidden sm:flex items-center gap-1">
                <BsBag className="text-[24px] mr-3" />
              </button>
            ) : (
              <button className="hidden sm:flex bg-[#FF3269] text-white text-[13px] md:text-[16px] font-semibold px-4 md:px-7 rounded-lg h-[60px] items-center justify-center">
                <BsBag className="text-[19px] mr-3" />
                <div className="h-[30px] w-[2px] bg-white mr-3"></div>
                <div className="md:flex hidden flex-col gap-y-[1px]">
                  <div className="font-medium">{cartItem.length} Items</div>
                  <div>₹{finalAmount}</div>
                </div>
              </button>
            )}
          </Link>

          <BiUser className="flex sm:hidden text-gray-700 text-[20px] font-semibold cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
