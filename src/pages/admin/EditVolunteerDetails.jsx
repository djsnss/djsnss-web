import React, { useState, useEffect } from "react";

const EditVolunteerDetails = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedHours, setUpdatedHours] = useState("");
  const [editVolunteerId, setEditVolunteerId] = useState(null);

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
      setUpdatedHours(""); // Clear the input after update
      setEditVolunteerId(null); // Reset the edit state
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

      {/* Search Input for Volunteers */}
      <div className="mb-8">
        <input
          type="text"
          className="w-full p-3 border border-[#387fa8] rounded-md text-[#333] placeholder-[#555]"
          placeholder="Search for a volunteer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <p className="mt-2 text-[#555] text-sm">Search volunteers by name.</p>
      </div>

      {/* Volunteers List (Attendance Management) */}
      {volunteers.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#003366] mb-4">
            Volunteer Attendance
          </h2>
          <div className="space-y-4">
            {volunteers
              .filter((volunteer) =>
                volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((volunteer) => (
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
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                      onClick={() => handleAttendanceChange(volunteer.id, true)}
                    >
                      Present
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
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
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-[#387fa8] rounded-md mb-4 placeholder-[#555] text-[#333]"
            placeholder="Search for a volunteer to update hours"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* List of Volunteers to Edit Hours */}
        {volunteers
          .filter((volunteer) =>
            volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((volunteer) => (
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
                    onClick={() => {
                      setEditVolunteerId(volunteer.id); // Set volunteer ID for hours update
                    }}
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
