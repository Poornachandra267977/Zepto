
// import { ToastContainer } from 'react-toastify';
// import {Footer, Navbar} from './components';
// import AllRoutes from './Routes/AllRoutes';





// function App() {
 
//   return (
//     <div className="App">
//       <Navbar/>
//       <AllRoutes/>
//       <Footer/>
//       <ToastContainer
//             position="top-right"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//             theme="light"
//         />
//     </div>
//   );
// }

// export default App;






// import { ToastContainer } from 'react-toastify';
// import { Footer, Navbar } from './components';
// import AllRoutes from './Routes/AllRoutes';
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // useNavigate hook for search action
// import ProductsPage from "./Pages/ProductsPage";

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   // ✅ Handle search action on Enter key
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchTerm.trim()) {
//       navigate(`/search?q=${searchTerm.trim()}`);
//     }
//   };

//   return (
//     <div className="App">
//       <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
//       <AllRoutes />
//       <Footer />

//       {/* Toast Notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
      
//     </div>
//   );
// }

// export default App;

import { ToastContainer } from 'react-toastify';
import { Footer, Navbar } from './components';
import AllRoutes from './Routes/AllRoutes';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RLmHLQ7vf52kw8n9dPUzwCNjYZD5zD51hUDf481pxsLr94kguUsihG2H5LJCiFhRM2tYrZmeh1aNbOFJasaDa6Y00YT0RZP2I"); // Replace this

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?q=${searchTerm.trim()}`);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <AllRoutes />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Elements>
  );
}

export default App;
