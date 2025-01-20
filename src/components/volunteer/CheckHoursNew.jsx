'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"

const UserData = {
  displayName: "John Doe",
  avatar: "https://github.com/shadcn.png",
  eventsAttended: [
    { name: "Blood Donation Drive", hours: 8 },
    { name: "Grainathon", hours: 4 },
    { name: "Tree Plantation", hours: 6 },
    { name: "NSS Camp", hours: 48 },
    { name: "Stem Cell Donation Drive", hours: 10 },
  ]
}

const VolunteerHours = () => {
  const [userData, setUserData] = useState(UserData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Admin-specific state
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [volunteers, setVolunteers] = useState([])
  const [attendanceList, setAttendanceList] = useState({})

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (userData?.isAdmin) {
      fetchEvents()
    }
  }, [userData?.isAdmin])

  const fetchUserData = async () => {
    try {
      const volunteerId = "60004230019" // static id, login person will work on this
      const volunteerResponse = await fetch(`https://djsnss-web.onrender.com/check-hours/volunteer/${volunteerId}`)
      if (!volunteerResponse.ok) throw new Error("Failed to fetch volunteer data")
      const volunteerData = await volunteerResponse.json()

      const eventDetails = await Promise.all(
        volunteerData.connectedEvents.map(async (eventId) => {
          const eventResponse = await fetch(`https://djsnss-web.onrender.com/check-hours/event/${eventId}`)
          if (!eventResponse.ok) throw new Error("Failed to fetch event data")
          const eventData = await eventResponse.json()
          return {
            name: eventData.name,
            hours: eventData.TotalNoOfHours,
          }
        }),
      )

      const formattedUserData = {
        displayName: volunteerData.studentDetails.name,
        avatar: volunteerData.passportPhoto.url,
        eventsAttended: eventDetails,
        isAdmin: volunteerData.isAdmin, // Assuming the backend provides this information
      }

      setUserData(formattedUserData)
    } catch (error) {
      console.error("Error fetching user data:", error)
      setError("Failed to load user data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://djsnss-web.onrender.com/admin/getAllEvents", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      })
      if (!response.ok) throw new Error("Failed to fetch events")
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events:", error)
      setError("Failed to fetch events. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchVolunteers = async (eventId) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://djsnss-web.onrender.com/admin/${eventId}/volunteers`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      })
      if (!response.ok) throw new Error("Failed to fetch volunteers")
      const data = await response.json()
      setVolunteers(data)
      const initialAttendance = data.reduce((acc, volunteer) => {
        acc[volunteer._id] = false
        return acc
      }, {})
      setAttendanceList(initialAttendance)
    } catch (error) {
      console.error("Error fetching volunteers:", error)
      setError("Failed to fetch volunteers. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleEventChange = (e) => {
    const eventId = e.target.value
    setSelectedEvent(eventId)
    if (eventId) {
      fetchVolunteers(eventId)
    } else {
      setVolunteers([])
      setAttendanceList({})
    }
  }

  const handleAttendanceChange = (volunteerId) => {
    setAttendanceList((prev) => ({ ...prev, [volunteerId]: !prev[volunteerId] }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("https://djsnss-web.onrender.com/admin/updateHours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          eventId: selectedEvent,
          attendanceList,
        }),
      })
      if (!response.ok) throw new Error("Failed to update volunteer hours")
      alert("Volunteer hours updated successfully!")
      fetchVolunteers(selectedEvent)
    } catch (error) {
      console.error("Error updating volunteer hours:", error)
      setError("Failed to update volunteer hours. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error || !userData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error || "Failed to load user data"}
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gradient-to-bl from-blue-400 to-gray-300">
      <Card className="w-full max-w-4xl border-2 border-white/50 backdrop-blur-lg bg-white/40 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.displayName} />
              <AvatarFallback>
                {userData.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl md:text-3xl text-center md:text-left text-white">
              {userData.displayName}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileSummary events={userData.eventsAttended} />
          <h2 className="text-xl font-semibold mb-7 text-white text-center">Events Attended</h2>
          <EventList events={userData.eventsAttended} />
        </CardContent>
      </Card>

      {userData.isAdmin && (
        <Card className="w-full max-w-4xl border-2 border-white/50 backdrop-blur-lg bg-white/40 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Update Volunteer Hours</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <select
              className="w-full p-2 mb-4 border rounded bg-black/40 text-white"
              value={selectedEvent}
              onChange={handleEventChange}
              disabled={loading}
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.name}
                </option>
              ))}
            </select>
            {loading && <div className="text-white mb-4">Loading...</div>}
            {volunteers.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Volunteers</h2>
                {volunteers.map((volunteer) => (
                  <div key={volunteer._id} className="flex items-center mb-2">
                    <Checkbox
                      id={volunteer._id}
                      checked={attendanceList[volunteer._id] || false}
                      onCheckedChange={() => handleAttendanceChange(volunteer._id)}
                      disabled={loading}
                    />
                    <label htmlFor={volunteer._id} className="ml-2 text-white">
                      {volunteer.name} ({volunteer.email}) - Current Hours: {volunteer.hours}
                    </label>
                  </div>
                ))}
                <Button
                  onClick={handleSubmit}
                  className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Hours"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const ProfileSummary = ({ events }) => {
  const totalEvents = events.length
  const totalHours = events.reduce((sum, event) => sum + event.hours, 0)

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
  )
}

const EventCard = ({ event }) => (
  <div className="bg-black/40 shadow-lg p-4 rounded-lg flex flex-col items-center justify-center text-center">
    <h3 className="font-serif font-semibold text-white">{event.name}</h3>
    <p className="font-sans text-sky-100 text-sm">Hours: {event.hours}</p>
  </div>
)

const EventList = ({ events }) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {events.map((event, index) => (
      <EventCard key={index} event={event} />
    ))}
  </div>
)

export default VolunteerHours

