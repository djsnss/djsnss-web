import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loaders/CustomLoader2";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollTT from "./components/ScrollTT";
import { propsData } from "./data/dynamicPageData"; // Import data
import DynamicPage from "./pages/ThemedPages"; // Import DynamicPage

// Lazy-loaded components
const Home = React.lazy(() => import("./pages/Landing"));
const Volunteer = React.lazy(() => import("./pages/Volunteer"));
const VolunteerPolicy = React.lazy(() => import("./components/volunteer/VolunteerPolicy"));
const VolunteerRegistration = React.lazy(() => import("./components/volunteer/VolunteerRegistration"));
const CheckHoursNew = React.lazy(() => import("./components/volunteer/CheckHoursNew"));
const MessageDetails = React.lazy(() => import("./pages/Messages"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const TimelineComponent = React.lazy(() => import("./pages/Timeline"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Calendar = React.lazy(() => import("./components/calendar/Calendar"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));
const Events = React.lazy(() => import("./pages/Events"));
const Team = React.lazy(() => import("./pages/Team"));
const Login = React.lazy(() => import("./pages/Login"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const CreateEvent = React.lazy(() => import("./pages/admin/CreateEvent"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const AdminLogin = React.lazy(() => import("./pages/admin/Login"));
const UpdateEvent = React.lazy(() => import("./pages/admin/UpdateEvent"));

const App = () => {
  return (
    <Router>
      {/* Scroll to top and Scroll tracking components */}
      <ScrollTT />
      <ScrollToTop />

      <div className="flex flex-row justify-start min-h-screen w-screen bg-white">
        {/* Sidebar */}
        <Sidebar />

        <div className="w-full h-screen overflow-y-scroll scroll-smooth">
          {/* Suspense to handle lazy-loaded components */}
          <Suspense
            fallback={
              <div className="min-h-screen w-screen flex items-center justify-center bg-cream">
                <Loader className="h-40" />
              </div>
            }
          >
            <Routes>
              {/* Existing routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<Events />} />
              <Route path="/eventdetails/:slug" element={<EventDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/volunteer/VolunteerPolicy" element={<VolunteerPolicy />} />
              <Route path="/volunteer/VolunteerRegistration" element={<VolunteerRegistration />} />
              <Route path="/volunteer/CheckHours" element={<CheckHoursNew />} />
              <Route path="/timeline" element={<TimelineComponent />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/messages/:slug" element={<MessageDetails />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/create-event" element={<CreateEvent />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/update-event" element={<UpdateEvent />} />

              {/* Dynamic routes for events */}
              {propsData.map((event) => (
                <Route
                  key={event.id}
                  path={`/${event.slug}`}
                  element={<DynamicPage event={event} />}
                />
              ))}
            </Routes>
          </Suspense>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
