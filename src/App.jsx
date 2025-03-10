import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Loader from "./components/Loaders/CustomLoader2";
// import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollTT from "./components/ScrollTT";
import { propsData } from "./data/dynamicPageData"; // Import data
import DynamicPage from "./pages/ThemedPages"; // Import DynamicPage
import { Toaster } from "react-hot-toast";

// Lazy-loaded components
const Home = React.lazy(() => import("./pages/Landing"));
const AllAlumni = React.lazy(() => import("./pages/alumni/AllAlumni"));
const Volunteer = React.lazy(() => import("./pages/volunteer/Volunteer"));
const VolunteerPolicy = React.lazy(() => import("./pages/volunteer/VolunteerPolicy"));
const VolunteerRegistration = React.lazy(() => import("./pages/volunteer/VolunteerRegistration"));
const CheckHoursNew = React.lazy(() => import("./pages/volunteer/CheckHoursNew"));
const MessageDetails = React.lazy(() => import("./pages/Messages"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const TimelineComponent = React.lazy(() => import("./pages/Timeline"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Calendar = React.lazy(() => import("./pages/calendar/calendar"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));
const Events = React.lazy(() => import("./pages/Events"));
const Team = React.lazy(() => import("./pages/Team"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const CreateEvent = React.lazy(() => import("./pages/admin/CreateEvent"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const AdminLogin = React.lazy(() => import("./pages/admin/Login"));
const AdminPass = React.lazy(() => import("./pages/admin/ChangePassword"));
const AdminEmail = React.lazy(() => import("./pages/admin/ChangeEmail"));
const UpdateEvent = React.lazy(() => import("./pages/admin/UpdateEvent"));
const EditVolunteerDetails = React.lazy(() => import("./pages/admin/EditVolunteerDetails"));
const VolunteerLogin = React.lazy(() => import("./pages/volunteer/VolLogin"));
const VolunteerPass = React.lazy(() => import("./pages/volunteer/ChangePassword"));
const FolderTree = React.lazy(() => import("./components/FolderTree"));
const TechnicalProject = React.lazy(() => import("./pages/TechnicalProject"));
const VolunteerDetails = React.lazy(() => import("./pages/alumni/AlumniDetails"));

const App = () => {
  return (
    <Router>
      {/* Scroll to top and Scroll tracking components */}
      <ScrollTT />
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="
      justify-start 
      min-h-screen w-screen bg-white">
        {/* Sidebar */}
        {/* <Sidebar /> */}
        <Navbar />

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
              <Route path="/eventdetails/:slug" element={<EventDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/volunteer/volunteer-policy" element={<VolunteerPolicy />} />
              <Route path="/events" element={<Events />} />
              <Route path="/volunteer/volunteer-registration" element={<VolunteerRegistration />} />
              <Route path="/volunteer/volunteer-login" element={<VolunteerLogin />} />
              <Route path="/volunteer/checkhours" element={<CheckHoursNew />} />
              <Route path="/timeline" element={<TimelineComponent />} />
              <Route path="/technical-project" element={<TechnicalProject />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/messages/:slug" element={<MessageDetails />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/update-event" element={<UpdateEvent />} />
              <Route path="/admin/edit-details" element={<EditVolunteerDetails />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/change-password" element={<AdminPass />} />
              <Route path="/admin/change-email" element={<AdminEmail />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/create-event" element={<CreateEvent />} />
              <Route path="/admin/update-event" element={<UpdateEvent />} />
              <Route path="/volunteer/change-password" element={<VolunteerPass />} />
              <Route path="/drive" element={<FolderTree />} />
              <Route path="/alumni" element={<AllAlumni />} />
              <Route path="/reports" element={<FolderTree />} />
              <Route path="/alumni-details/:name" element={<VolunteerDetails />} />

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
