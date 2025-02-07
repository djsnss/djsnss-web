import React, { useState, useEffect } from "react";
import axios from "axios";

const EditVolunteerDetails = () => {
  const [events, setEvents] = useState([]); // List of events
  const [selectedEvent, setSelectedEvent] = useState(""); // Selected event
  const [volunteers, setVolunteers] = useState([]); // List of registered volunteers
  const [attendanceStatus, setAttendanceStatus] = useState({}); // Updated attendance status for volunteers
  const [attendanceList, setAttendanceList] = useState([]); // Attendance list (for updateHours API)
  const token = localStorage.getItem("adminAuthToken");

  useEffect(() => {
    if (!localStorage.getItem("adminAuthToken")) {
      // Redirect to login if not authenticated
      window.location.href = "/unauthorized";
    }
  }, []);

  // Fetch all events when the component loads
  useEffect(() => {
    const fetchEvents = async () => {
      if (!token) {
        console.error("Token is missing or expired!");
        return;
      }
      try {
        const response = await axios.get(
          "https://djsnss-web.onrender.com/admin/getAllEvents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [token]);

  // Fetch volunteers when an event is selected
  useEffect(() => {
    const fetchVolunteers = async () => {
      if (selectedEvent) {
        try {
          const response = await axios.get(
            `https://djsnss-web.onrender.com/admin/${selectedEvent}/volunteers`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data.volunteers);
          setVolunteers(response.data.volunteers);
        } catch (error) {
          console.error("Error fetching volunteers:", error);
        }
      }
    };

    fetchVolunteers();
  }, [selectedEvent, token]);

  // Handle attendance change (Present/Absent)
  const handleAttendanceChange = (volunteerId, status) => {
    setAttendanceStatus((prevStatus) => ({
      ...prevStatus,
      [volunteerId]: status,
    }));
  };

  // Update attendance hours
  const updateHours = async () => {
    try {
      // Prepare the attendance list based on marked attendance
      const updatedAttendanceList = volunteers.map((volunteer) => ({
        volunteerId: volunteer._id,
        attended: attendanceStatus[volunteer._id] ?? false, // Default to false if not set
      }));

      // Fetch the existing attendance list
      const response = await axios.get(
        `https://djsnss-web.onrender.com/admin/getAttendanceList/${selectedEvent}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendanceList(response.data);

      // Update hours
      await axios.post(
        "https://djsnss-web.onrender.com/admin/updateHours",
        {
          eventId: selectedEvent,
          attendanceList: updatedAttendanceList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Attendance hours updated successfully.");
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update hours. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-[#f1f8ff] min-h-screen">
      <h1 className="text-3xl font-bold text-[#003366] mb-8 text-center">
        Edit Volunteer Details
      </h1>

      {/* Event selection dropdown */}
      <div className="mb-8">
        <label
          htmlFor="event"
          className="block text-lg font-semibold text-[#003366] mb-2"
        >
          Select Event:
        </label>
        <select
          id="event"
          className="w-full p-3 border border-[#387fa8] rounded-md text-[#333] bg-white"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">-- Select an Event --</option>
          {events.length > 0 ? (
            events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.name}
              </option>
            ))
          ) : (
            <option disabled>No events available</option>
          )}
        </select>
      </div>

      {/* Display volunteers and attendance options */}
      {selectedEvent && volunteers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">
            Volunteer Attendance for {selectedEvent}
          </h2>
          <div className="space-y-4">
            {volunteers.map((volunteer) => {
              const isPresent = attendanceStatus[volunteer._id] ?? false;

              return (
                <div
                  key={volunteer._id}
                  className="flex items-center justify-between p-4 border border-[#387fa8] rounded-md"
                >
                  <span className="text-lg text-[#003366]">
                    {volunteer.studentDetails.name}
                  </span>
                  <div className="flex gap-4 items-center">
                    <button
                      className={`px-4 py-2 ${
                        isPresent ? "bg-green-500" : "bg-gray-300"
                      } text-white rounded-md`}
                      onClick={() =>
                        handleAttendanceChange(volunteer._id, true)
                      }
                    >
                      Present
                    </button>
                    <button
                      className={`px-4 py-2 ${
                        !isPresent ? "bg-red-500" : "bg-gray-300"
                      } text-white rounded-md`}
                      onClick={() =>
                        handleAttendanceChange(volunteer._id, false)
                      }
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Update attendance hours button */}
      {selectedEvent && volunteers.length > 0 && (
        <button
          onClick={updateHours}
          className="px-6 py-3 bg-blue-500 text-white rounded-md"
        >
          Update Hours
        </button>
      )}
    </div>
  );
};

export default EditVolunteerDetails;
