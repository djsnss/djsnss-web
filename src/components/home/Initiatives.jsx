import React from 'react'
import Card from './Card'
import GrainAThon from '../../assets/Events/GrainAThon.png';
// import BorivaliTP from '../../assets/Events/TreePlantation.png'
// import NSSCamp from '../../assets/Events/NSSCamp.jpg'
// import AnnualCharity from '../../assets/Events/AnnualCharity.png'
// import VoterRegistration from '../../assets/Events/VoterRegistration.png'
import BDD from '../../assets/Events/BDD.jpg'
// import NewspaperCollectionDrive from '../../assets/Events/NewspaperCollection.png';
// import IndependenceDayRally from '../../assets/Events/TirangaRally/IMG_4530.jpg';
// import { eventNames } from 'process';

const Initiatives = () => {

  const data = [
    {
      eventName: "Grain-A-Thon",
      imageUrl: GrainAThon,
      link: "/eventdetails/grain-a-thon"
    },
    {
      eventName: "Blood Donation Drive",
      imageUrl: BDD,
      link: "/eventdetails/blood-donation-drive"
    }
  ];
  return (
    <div>Initiatives
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          data.map((event, index) => {
            return (
              <Card
                key={index}
                name={event.eventName}
                imageUrl={event.imageUrl}
                link={event.link}
              />
            )})}
      </div>
    </div>
  )
}

export default Initiatives