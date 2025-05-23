// import React from 'react';
// import { Route, Routes } from 'react-router-dom'
// import PrivateRoute from '../components/PrivateRoute';
// import AllProducts from '../Pages/AllProducts';
// import Cart from '../Pages/Cart';
// import Home from '../Pages/Home';
// import Login from '../Pages/Login';
// import SignUp from '../Pages/SignUp';
// import SingleProduct from '../Pages/SingleProduct';
// import UserAccount from '../Pages/UserAccount';
// import Payment from '../Pages/Payment';
// import SearchResults from '../components/SearchResults';
// import ProductsPage from '../Pages/ProductsPage';
// import Order from "../components/Order";
// import VendorSignUp from "../Pages/VendorSignUp";
// import AdminSignUp from "../Pages/AdminSignUp";




// function AllRoutes() {
//   return (
//     <>
//         <Routes>
//             <Route path='/' element={<Home/>} />
//             <Route path='/allproducts/:products' element={<AllProducts/>} />
//             <Route path='/signup' element={<SignUp/>} />
//             <Route path='/login' element={<Login/>} />
//             <Route path='/cart' element={
//               <PrivateRoute>
//                 <Cart/>
//               </PrivateRoute>
//               } />
//             <Route path='/allproducts/:products/:id' element={
//               <SingleProduct/>
//             } />
//             <Route path='/account/' element={
//               <PrivateRoute>
//                 <UserAccount/>
//               </PrivateRoute>
//             } />
//             <Route path='/payment' element={<Payment/>} />

//              {/* ✅ New Route for ProductsPage */}
//             <Route path='/products' element={<ProductsPage />} />

//              {/* ✅ Search Results Route */}
//              <Route path='/search' element={<SearchResults />} />

//              <Route path="/order" element={<Order />} />

//              <Route path="/vendor-signup" element={<VendorSignUp />} />
//              <Route path="/admin-signup" element={<AdminSignUp />} />
        
//         </Routes>
//     </>
    
//   )
// }

// export default AllRoutes

import { Route, Routes, useParams } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute';
import AllProducts from '../Pages/AllProducts';
import Cart from '../Pages/Cart';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import SingleProduct from '../Pages/SingleProduct';
import UserAccount from '../Pages/UserAccount';
import Payment from '../Pages/Payment';
import SearchResults from '../components/SearchResults';
import ProductsPage from '../Pages/ProductsPage';
import Order from "../components/Order";
import VendorSignUp from "../Pages/VendorSignUp";
import AdminSignUp from "../Pages/AdminSignUp";
import AdminDashboard from '../Pages/AdminDashboard';
import AdminLogin from '../Pages/AdminLogin';


// Import vendor-related components
import VendorAddProduct from '../Pages/VendorAddProduct';
import CategoryProducts from '../components/CategoryProducts';

const CategoryPage = () => {
  const { category } = useParams();
  return <CategoryProducts category={category} />;
};

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/allproducts/:products' element={<AllProducts/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={
          <PrivateRoute>
            <Cart/>
          </PrivateRoute>
        } />
        <Route path='/allproducts/:products/:id' element={<SingleProduct/>} />
        <Route path='/account/' element={
          <PrivateRoute>
            <UserAccount/>
          </PrivateRoute>
        } />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/search' element={<SearchResults />} />
        <Route path='/order' element={<Order />} />
        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />

        {/* Vendor Add Product route */}
        <Route path="/vendor/add-product" element={<VendorAddProduct />} />


        {/* Category Products route */}
        <Route path="/category/:category" element={<CategoryPage />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/admin-login" element={<AdminLogin />} />

      </Routes>
    </>
  )
}

export default AllRoutes;
