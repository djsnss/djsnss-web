'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar"

// Dummy JSON data
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

//  Event = {
//   name: string
//   hours: number
// }

// type UserData = {
//   displayName: string
//   avatar: string
//   eventsAttended: Event[]
// }

const EventCard = ({ event }) => (
  <div className="bg-secondary p-4 rounded-lg">
    <h3 className="font-serif font-semibold">{event.name}</h3>
    <p className=" font-sans text-sky-100 text-sm text-muted-foreground">Hours: {event.hours}</p>
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
    <div className="bg-primary/10 p-4 rounded-lg mb-6 flex justify-around">
      <div className="text-center">
        <p className="text-2xl font-bold">{totalEvents}</p>
        <p className="font-sans text-sm text-muted-foreground">Events Attended</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{totalHours}</p>
        <p className="font-sans text-sm text-muted-foreground">Total Hours</p>
      </div>
    </div>
  )
}

export default function CheckHours() {
  const [userData, setUserData] = useState(UserData)

  useEffect(() => {
    // Simulating an API call
    const fetchUserData = async () => {
      // const response = await fetch('/api/user-profile')
      // const data = await response.json()
      // setUserData(data)

      setUserData(UserData)
    }

    fetchUserData()
  }, [])

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userData.avatar} alt={userData.displayName} />
              <AvatarFallback>{userData.displayName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl md:text-3xl text-center md:text-left">{userData.displayName}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ProfileSummary events={userData.eventsAttended} />
          <h2 className="text-xl font-semibold mb-4">Events Attended</h2>
          <EventList events={userData.eventsAttended} />
        </CardContent>
      </Card>
    </div>
  )
}
