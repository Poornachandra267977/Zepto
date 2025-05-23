import React from "react";
import { useNavigate } from "react-router-dom";

const PaanBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/allproducts/Paan");
  };

  return (
    <div className="w-full flex justify-center items-center py-10 bg-white">
      <img
        src="https://cdn.zeptonow.com/production/tr:w-1280,ar-3840-705,pr-true,f-auto,q-80/inventory/banner/4ea3de05-f469-4df2-9548-db9c9863dfdf.png"
        alt="Pan & Cigarettes"
        className="w-[80%] cursor-pointer rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        onClick={handleClick}
      />
    </div>
  );
};

export default PaanBanner;
