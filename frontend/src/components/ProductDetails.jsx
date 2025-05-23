// import React from 'react'
// import { Link } from 'react-router-dom'
// import ProductCard from './ProductCard'

// function ProductDetails({data}) {
  
//   // console.log(data,"product")
//   return (
//     <>
    
//     <div className='flex flex-row flex-wrap pb-15 w-auto'>
    
//         {
//             data?.map((el,id) => 
//             <>
//               <Link to={`${id}`} key={id} >
//                 <div className='border-[1px] border-[#b9b9b971] relative'  >
//                   <ProductCard key={id} data={el} />
//                 </div>
//               </Link>
              
//             </>
                
//             )
//         }
//     </div>
//     </>
    
//   )
// }

// export default ProductDetails

import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

function ProductDetails({ data, searchTerm = "" }) {

  // Ensure searchTerm is a string
  const normalizedSearchTerm = searchTerm?.toLowerCase() || "";

  // Filter products based on searchTerm
  const filteredData = data?.filter(product => {
    // Safely check title and category
    const title = product?.title?.toLowerCase() || "";
    const category = product?.category?.toLowerCase() || "";

    const titleMatch = title.includes(normalizedSearchTerm);
    const categoryMatch = category.includes(normalizedSearchTerm);

    return titleMatch || categoryMatch;
  });

  return (
    <>
      <div className='flex flex-row flex-wrap pb-15 w-auto'>
        {
          filteredData?.map((el, id) => 
            <Link to={`${id}`} key={id}>
              <div className='border-[1px] border-[#b9b9b971] relative'>
                <ProductCard key={id} data={el} />
              </div>
            </Link>
          )
        }
      </div>
    </>

  )
}

export default ProductDetails;

