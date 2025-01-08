import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loaders/CustomLoader2";
import Sidebar from "./components/Sidebar";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import TimelineComponent from "./pages/Timeline";
import EventDetails from "./pages/EventDetails";
import AboutUs from "./components/aboutus/AboutUs";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MessageDetails from "./pages/Messages";
import FAQ from "./pages/FAQ";
import Gallery from "./pages/Gallery";
import Volunteer from "./pages/Volunteer";
import VolunteerPolicy from "./components/volunteer/VolunteerPolicy";
import Calendar from "./components/calendar/Calendar";
import CheckHours from "./components/volunteer/checkhours";

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

          <div className="w-full h-screen overflow-y-scroll scroll-smooth">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<Events />} />
              <Route path="/eventdetails/:slug" element={<EventDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/volunteer/VolunteerPolicy" element={<VolunteerPolicy />} />
              <Route path="/volunteer/CheckHours" element={<CheckHours />} />
              <Route path="/timeline" element={<TimelineComponent />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/messages/:slug" element={<MessageDetails />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>

            <Footer />
          </div>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
