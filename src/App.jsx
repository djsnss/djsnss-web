import React, { Suspense } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loaders/loader2/CustomLoader2";
import Sidebar from "./pages/Sidebar";
import Events from "./pages/Events";
import Footer from "./pages/Footer";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
const Home = React.lazy(() => import("./pages/Landing"))


const App = () => {
  
  return (
    <>
      <Router>
        <div className="flex flex-col justify-between min-h-screen">
          <Suspense fallback={
            <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-300 to-white'>
              <Loader className="h-40" />
            </div>
          }>
            
            <Sidebar />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
            </Routes>

            <Footer/>
          </Suspense>
        </div>
      </Router>
    </>
  )
}

export default App