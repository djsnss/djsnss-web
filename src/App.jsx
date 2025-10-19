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
import Bot from "./components/Bot";
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
const CheckEvent = React.lazy(() => import("./pages/volunteer/CheckEvent"));
const MessageDetails = React.lazy(() => import("./pages/Messages"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
// const TimelineComponent = React.lazy(() => import("./pages/Timeline"));
const TimelineTour = React.lazy(() => import("./pages/TimelineModel/TimelineTour"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const Calendar = React.lazy(() => import("./pages/calendar/calendar"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));
const Events = React.lazy(() => import("./pages/Events"));
const Team = React.lazy(() => import("./pages/Team"));
const AdminDashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const CreateEvent = React.lazy(() => import("./pages/admin/CreateEvent"));
const CreateBlog = React.lazy(() => import("./pages/admin/CreateBlog"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const AdminLogin = React.lazy(() => import("./pages/admin/Login"));
const AdminPass = React.lazy(() => import("./pages/admin/ChangePassword"));
const AdminEmail = React.lazy(() => import("./pages/admin/ChangeEmail"));
const UpdateEvent = React.lazy(() => import("./pages/admin/UpdateEvent"));
const UpdateBlog = React.lazy(() => import("./pages/admin/UpdateBlog"));
const CreateAnnouncement = React.lazy(() => import("./pages/admin/CreateAnnouncement"));
const UpdateAnnouncement = React.lazy(() => import("./pages/admin/UpdateAnnouncement"));
const EditVolunteerDetails = React.lazy(() => import("./pages/admin/EditVolunteerDetails"));
const VolunteerLogin = React.lazy(() => import("./pages/volunteer/VolLogin"));
const VolunteerPass = React.lazy(() => import("./pages/volunteer/ChangePassword"));
const FolderTree = React.lazy(() => import("./components/FolderTree"));
const TechnicalProject = React.lazy(() => import("./pages/TechnicalProject"));
const VolunteerDetails = React.lazy(() => import("./pages/alumni/AlumniDetails"));
const NSSFormat = React.lazy(() => import("./pages/NSSFormat"));
const Blog = React.lazy(() => import("./pages/blog/Blog"));
const BlogPage = React.lazy(() => import("./pages/blog/BlogPage"));
// ProtectedRoute component
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      {/* Scroll to top and Scroll tracking components */}
      <ScrollTT />
      <ScrollToTop />
      <Bot />
      <Toaster position="top-right" reverseOrder={false} />

      <div className="justify-start min-h-screen w-screen bg-white">
      {/* <div className="flex flex-row justify-start min-h-screen w-screen bg-white"> */}
        {/* Sidebar */}
        {/* <Sidebar /> */}
        <Navbar />

        <div className="w-full h-screen overflow-y-scroll scroll-smooth">
          {/* Suspense to handle lazy-loaded components */}
          <Suspense
            fallback={
              <div className="min-h-screen max-w-screen flex items-center justify-center bg-cream">
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
              {/* <Route path="/timeline" element={<TimelineComponent />} /> */}
              <Route path="/timeline-tour" element={<TimelineTour />} />
              <Route path="/technical-project" element={<TechnicalProject />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/messages/:slug" element={<MessageDetails />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/update-event" element={<UpdateEvent />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              {/* Protected admin routes */}
              <Route element={<ProtectedRoute authTokenKey="adminAuthToken" userType="admin"/>}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/create-event" element={<CreateEvent />} />
                <Route path="/admin/update-event" element={<UpdateEvent />} />
                <Route path="/admin/create-blog" element={<CreateBlog />} />
                <Route path="/admin/update-blog" element={<UpdateBlog />} />
                <Route path="/admin/create-announcement" element={<CreateAnnouncement />} />
                <Route path="/admin/update-announcement" element={<UpdateAnnouncement />} />
                <Route path="/admin/change-password" element={<AdminPass />} />
                <Route path="/admin/edit-details" element={<EditVolunteerDetails />} />
                <Route path="/admin/change-email" element={<AdminEmail />} />
              </Route>
              
              <Route path="/volunteer/volunteer-login" element={<VolunteerLogin />} />
              <Route path="/volunteer/change-password" element={<VolunteerPass />} />
              {/* Protected volunteer routes */}
              <Route element={<ProtectedRoute authTokenKey="authToken" userType="volunteer"/>}>
                <Route path="/volunteer/checkevent" element={<CheckEvent />} />
              </Route>
              <Route path="/alumni" element={<AllAlumni />} />
              <Route path="/reports" element={<FolderTree />} />
              <Route path="/nss-format" element={<NSSFormat />} />
              <Route path="/alumni-details/:name" element={<VolunteerDetails />} />

              {/* Blog route */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPage />} />
            


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
