'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"

// Dummy placeholder
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

export default function CheckHours() {
  const [userData, setUserData] = useState(UserData)
  const [events, setEvents] = useState(UserData.eventsAttended)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace the userId with the logged-in user's ID (e.g., from localStorage or context)
        const volunteerId = "yourVolunteerIdHere" // You can fetch this from context or session

        // Fetch the volunteer's data (name, avatar, etc.)
        const userResponse = await fetch(`/api/volunteer/${volunteerId}/hours`)
        const user = await userResponse.json()

        // Fetch the events attended by the volunteer
        const eventsResponse = await fetch(`/api/event/volunteer/${volunteerId}`)
        const events = await eventsResponse.json()

        // Set state
        setUserData(user)
        setEvents(events)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data or events:", error)
        setLoading(false)
      }
    }
    
    // fetchUserData()
  }, [])

  if (loading || !userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-4 flex items-center justify-center"
      style={{
        backgroundImage: "url('/src/assets/Events/TreePlantation.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card className="w-full max-w-4xl backdrop-blur-sm bg-white/30 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.displayName} />
              <AvatarFallback>{userData.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl md:text-3xl text-center md:text-left text-white">
              {userData.displayName}
            </CardTitle>
            <CardTitle className="text-2xl md:text-3xl text-center md:text-left text-white">
              {userData.displayName}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileSummary events={events} />
          <h2 className="text-xl font-semibold mb-7 text-white text-center">Events Attended</h2>
          <EventList events={events} />
        </CardContent>
      </Card>
    </div>
  )
}
