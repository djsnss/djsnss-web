import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loaders/loader2/CustomLoader2";
import Sidebar from "./components/Sidebar";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import TimelineComponent from "./pages/Timeline";
import EventDetails from "./pages/EventDetails";
import AboutUs from "./components/aboutus/AboutUs";
import MessageDetails from "./pages/Messages";


const Home = React.lazy(() => import("./pages/Landing"));

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />

      <div className="flex flex-row justify-center min-h-screen w-screen">
        <Suspense
          fallback={
            <div className="min-h-screen w-screen flex items-center justify-center bg-cream">
              <Loader className="h-40" />
            </div>
          }
        >
          <div className="w-max">
            <Sidebar />
          </div>

          <div
            className="w-full h-screen overflow-y-scroll"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/eventdetails/:slug" element={<EventDetails/>}/>
              <Route path="/team" element={<Team/>} />
              <Route path="/timeline" element={<TimelineComponent />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/messages/:slug" element={<MessageDetails />} />
            </Routes>

            <Footer />
          </div>
        </Suspense>
      </div>
    </Router>
    // <TimelineComponent/>
  );
};

export default App;
