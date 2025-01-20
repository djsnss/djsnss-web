import React, { useState, useEffect } from "react";

const EditVolunteerDetails = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [updatedHours, setUpdatedHours] = useState("");
  const [editVolunteerId, setEditVolunteerId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");

  const events = ["Event 1", "Event 2", "Event 3"]; // Placeholder event list

  // Placeholder: Fetch all volunteers (replace with API call later)
  useEffect(() => {
    console.log("Fetching volunteers logic here...");
    // Example volunteers data (replace with fetched data later)
    setVolunteers([
      { id: "101", name: "Volunteer A", hours: 5, attended: false },
      { id: "102", name: "Volunteer B", hours: 8, attended: false },
      { id: "103", name: "Volunteer C", hours: 3, attended: false },
    ]);
  }, []);

  // Handle updating volunteer hours
  const handleEditHours = () => {
    if (updatedHours !== "" && editVolunteerId !== null) {
      setVolunteers((prev) =>
        prev.map((volunteer) =>
          volunteer.id === editVolunteerId
            ? { ...volunteer, hours: parseInt(updatedHours) }
            : volunteer
        )
      );
      setUpdatedHours("");
      setEditVolunteerId(null);
    }
  };

  // Handle attendance update (Present/Absent)
  const handleAttendanceChange = (volunteerId, status) => {
    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.id === volunteerId
          ? {
              ...volunteer,
              attended: status,
              hours: status ? volunteer.hours + 3 : volunteer.hours, // Example: Add 3 hours for Present
            }
          : volunteer
      )
    );
  };

  return (
    <div className="p-6 bg-[#f1f8ff] min-h-screen">
      <h1 className="text-3xl font-bold text-[#003366] mb-8 text-center">
        Edit Volunteer Details
      </h1>

      {/* Event Selection */}
      <div className="mb-8">
        <label htmlFor="event" className="block text-lg font-semibold text-[#003366] mb-2">
          Select Event:
        </label>
        <select
          id="event"
          className="w-full p-3 border border-[#387fa8] rounded-md text-[#333] bg-white"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">-- Select an Event --</option>
          {events.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>

      {/* Volunteers List (Attendance Management) */}
      {selectedEvent && volunteers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">
            Volunteer Attendance for {selectedEvent}
          </h2>
          <div className="space-y-4">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="flex items-center justify-between p-4 border border-[#387fa8] rounded-md"
              >
                <div>
                  <span className="text-lg text-[#003366]">{volunteer.name}</span>
                  <p className="text-sm text-[#555]">
                    Marked: {volunteer.attended ? "Present" : "Absent"}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md sm:hidden"
                    onClick={() => handleAttendanceChange(volunteer.id, true)}
                  >
                    ✔
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md sm:hidden"
                    onClick={() => handleAttendanceChange(volunteer.id, false)}
                  >
                    ✘
                  </button>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hidden sm:block"
                    onClick={() => handleAttendanceChange(volunteer.id, true)}
                  >
                    Present
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hidden sm:block"
                    onClick={() => handleAttendanceChange(volunteer.id, false)}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Volunteer Hours Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[#003366] mb-4">
          Update Volunteer Hours
        </h2>
        {volunteers.map((volunteer) => (
          <div key={volunteer.id} className="mb-4 p-4 border border-[#387fa8] rounded-md">
            <div className="flex justify-between">
              <span className="text-lg text-[#003366]">{volunteer.name}</span>
              <span className="text-xl font-semibold text-[#003366]">
                Current Hours: {volunteer.hours}
              </span>
            </div>
            <div className="flex gap-4 items-center mt-2">
              {editVolunteerId === volunteer.id ? (
                <>
                  <input
                    type="number"
                    className="p-3 border border-[#387fa8] rounded-md text-[#333] placeholder-[#555]"
                    placeholder="Enter new hours"
                    value={updatedHours}
                    onChange={(e) => setUpdatedHours(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleEditHours}
                  >
                    Apply Changes
                  </button>
                </>
              ) : (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => setEditVolunteerId(volunteer.id)}
                >
                  Edit Hours
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditVolunteerDetails;
