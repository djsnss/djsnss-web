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

const CheckHoursNew = () => {
  const [userData, setUserData] = useState(UserData)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch volunteer data
        const volunteerId = "60004230019" //static id, login person will work on this
        // adjust as needed
        const volunteerResponse = await fetch(`http://localhost:8000/check-hours/volunteer/${volunteerId}`)
        const volunteerData = await volunteerResponse.json()
        // Fetch event details for each connected event
        const eventDetails = await Promise.all(
          volunteerData.connectedEvents.map(async (eventId) => {
            const eventResponse = await fetch(`http://localhost:8000/check-hours/event/${eventId}`)
            const eventData = await eventResponse.json()
            return {
              name: eventData.name,
              hours: eventData.TotalNoOfHours
            }
          })
        )

        // Format the user data
        const formattedUserData = {
          displayName: volunteerData.studentDetails.name,
          avatar: volunteerData.passportPhoto.url,
          eventsAttended: eventDetails
        }

        setUserData(formattedUserData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-bl from-blue-400 to-gray-300"
    >
      <Card className="w-full max-w-4xl border-2 border-white/50 backdrop-blur-lg bg-white/40 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.displayName} />
              <AvatarFallback>{userData.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
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

export default CheckHoursNew