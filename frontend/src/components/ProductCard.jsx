
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Cart/cart.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ data }) {
  const dispatch = useDispatch();

  const truncatedstring = (str, num) => {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(data));
    toast.info("Added to Cart!");
  };

  return (
    <div className="flex flex-col justify-center items-center my-5 w-[240px] h-[50%] relative">
      {/* Product Image */}
      <div className="mb-8">
        <img src={data.img} alt={data.title} className="h-[170px] object-contain" />
      </div>

      {/* Discount Tag */}
      {data.discount && (
        <div className="absolute rounded-tl-full rounded-tr-[50%] rounded-bl-full rounded-br-full font-semibold bg-[#f61571] text-white px-4 py-2 top-[-20px] left-[150px] text-[15px]">
          {data.discount} Off
        </div>
      )}

      {/* Product Details */}
      <div>
        <div className="h-[82px] mb-4">
          <div className="font-medium py-1 px-4">
            {truncatedstring(data.title, 40)}
          </div>
          <div className="text-slate-500 text-base py-1 px-4">
            {data.weight}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex flex-row justify-around gap-8 mt-6 px-4">
          <div className="flex flex-col">
            <div className="line-through text-sm text-gray-500">₹{data.price2}</div>
            <div className="font-medium text-[16px]">₹{data.price}</div>
          </div>
          <button
            onClick={handleAddToCart}
            className="border-2 border-[#FF3269] px-7 rounded-md shadow-xl text-[#FF3269] font-medium"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
