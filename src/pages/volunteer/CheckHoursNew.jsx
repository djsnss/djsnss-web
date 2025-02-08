import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/Avatar";
import axios from "axios";
import NSSLogo from "../../assets/NSSLogo.png";
import { MdOutlineModeEdit } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckHoursNew = () => {
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(NSSLogo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      // Redirect to login if not authenticated
      window.location.href = "/unauthorized";
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://djsnss-web.onrender.com/volunteer/checkHours",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
          }
        );

        const volunteerData = response.data;
        const eventsAttended = volunteerData.connectedEvents.map((event) => ({
          eventId: event.eventId,
          name: event.eventName,
          hours: event.hoursCompleted || 0,
        }));

        setUserData({
          displayName: volunteerData.name,
          avatar: volunteerData.image || NSSLogo,
          eventsAttended,
        });

        setImage(volunteerData.image || NSSLogo); // Set initial image
      } catch (err) {
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://djsnss-web.onrender.com/volunteer/update-normalPhoto",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Send token in headers
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImage(data.normalPhoto.url); // Update the profile picture
        toast.success("Image Updated Successfully")
      } else {
        toast.error("Image update failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-bl from-blue-400 to-gray-300">
      <Card className="w-full max-w-4xl border-2 border-white/50 backdrop-blur-lg bg-white/40 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {/* Avatar with Edit Button */}
            <div className="flex items-center gap-4">
              <div className="relative group w-24 h-24">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={image} alt={userData.displayName} />
                  <AvatarFallback>
                    {userData.displayName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {/* Hover Edit Icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                  onClick={() => fileInputRef.current.click()}
                >
                  <MdOutlineModeEdit className="text-white w-6 h-6" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <CardTitle className="text-2xl md:text-3xl text-white">
                {userData.displayName}
              </CardTitle>
            </div>

            {/* Logout Button - Now at the extreme right */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 ml-auto rounded-md bg-red-600 hover:bg-red-700 text-white transition-all"
            >
              Logout
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileSummary events={userData.eventsAttended} />
          <h2 className="text-xl font-semibold mb-7 text-white text-center">
            Events Attended
          </h2>
          <EventList events={userData.eventsAttended} />
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileSummary = ({ events }) => {
  const totalEvents = events.length;
  const totalHours = events.reduce((sum, event) => sum + event.hours, 0);

  return (
    <div className="bg-black/40 p-4 rounded-lg mb-6 flex justify-around">
      <div className="text-center flex flex-col items-center justify-center text-white">
        <p className="text-2xl font-bold">{totalEvents}</p>
        <p className="font-sans text-sm">Events Attended</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center text-white">
        <p className="text-2xl font-bold">{totalHours}</p>
        <p className="font-sans text-sm">Total Hours</p>
      </div>
    </div>
  );
};

const EventCard = ({ event }) => (
  <div className="bg-black/40 shadow-lg p-4 rounded-lg flex flex-col items-center justify-center text-center">
    <h3 className="font-serif font-semibold text-white">{event.name}</h3>
    <p className="font-sans text-sky-100 text-sm">Hours: {event.hours}</p>
  </div>
);

const EventList = ({ events }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {events.map((event, index) => (
      <EventCard key={index} event={event} />
    ))}
  </div>
);

export default CheckHoursNew;
