
import React, { useEffect, useState } from "react";
import AllCategories from "../components/AllCategories";
import ProductDetails from "../components/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Products/products.actions";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Filter from "../components/Filter";
import ProductLoading from "../components/LoadingComponent/ProductLoading";
import CategoryLoading from "../components/LoadingComponent/CategoryLoading";

function AllProducts() {
  const dispatch = useDispatch();
  const { products } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [totalCount, setTotalCount] = useState(0);

  const isLoading = useSelector((store) => store.productReducer.isLoading);
  const prod = useSelector((store) => store.productReducer.products);

  // const getDataOnce = async () => {
  //   try {
  //     const res = await axios.get(`https://zeptojson.onrender.com/${products}`);
  //     setTotalCount(res.data.length);
  //   } catch (err) {
  //     console.error("Failed to fetch product count:", err);
  //   }
  // };

  // useEffect(() => {
  //   const params = { _limit: 15, _page: page };
  //   if (sort) {
  //     params._sort = "price";
  //     params._order = sort;
  //   }

  //   getDataOnce();
  //   setSearchParams({ page, sort });
  //   dispatch(getProducts(products, { params }));
  // }, [products, sort, page]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const res = await axios.get(`https://zeptojson.onrender.com/${products}`);
        setTotalCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch product count:", err);
      }
    };
  
    const params = { _limit: 15, _page: page };
    if (sort) {
      params._sort = "price";
      params._order = sort;
    }
  
    fetchTotalCount();
    setSearchParams({ page, sort });
    dispatch(getProducts(products, { params }));
  }, [products, sort, page, dispatch, setSearchParams]);
  
  const handleSort = (e) => setSort(e.target.value);

  return (
    <div>
      <div className="flex flex-row w-auto">
        {isLoading ? (
          <>
            <CategoryLoading />
            <div className="flex flex-row flex-wrap pb-20 w-auto mt-[90px]">
              {[...Array(15)].map((_, index) => (
                <ProductLoading key={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-row">
            <div>
              <AllCategories />
              <Filter />
            </div>

            <div className="pt-5 flex flex-col justify-center items-center">
              {/* Header Section */}
              <div className="flex flex-row justify-between w-full pr-[50px]">
                <div className="text-2xl font-semibold pb-[20px] ml-6 capitalize">
                  {products} ({totalCount})
                </div>
                <div>
                  <select
                    className="px-4 py-2 border rounded"
                    onChange={handleSort}
                    value={sort}
                  >
                    <option value="">Sort by</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product Details Section */}
              <ProductDetails data={prod} />
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center my-4">
        {[...Array(Math.ceil(totalCount / 15)).keys()].map((item) => (
          <button
            key={item}
            onClick={() => setPage(item + 1)}
            className={`px-3 py-2 rounded-lg mx-1 border-2 ${
              page === item + 1
                ? "bg-[#F61571] text-white border-[#F61571]"
                : "bg-white text-[#F61571] border-[#F61571] hover:bg-[#F61571] hover:text-white"
            }`}
          >
            {item + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
