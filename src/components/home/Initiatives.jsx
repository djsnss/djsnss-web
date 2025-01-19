import Card from "./Card";
import GrainAThon from "../../assets/Events/GrainAThon.png";
import NSSCamp from "../../assets/Events/NSSCamp.jpg";
import BDD from "../../assets/Events/BDD.jpg";
import StemCell from "../../assets/Events/TirangaRally/IMG_4530.jpg";
import ACD from "../../assets/Events/AnnualCharity.png";

const Initiatives = () => {
  const data = [
    {
      eventName: "Grain-A-Thon",
      shortDesc: "Collected and donated grains of more than 1000kgs for the underprivileged.",
      imageUrl: GrainAThon,
      link: "/eventdetails/grain-a-thon",
    },
    {
      eventName: "Blood Donation Drive",
      shortDesc: "Organized a successful blood donation campaign donating 650+ blood bags for the needy.",
      imageUrl: BDD,
      link: "/eventdetails/blood-donation-drive",
    },
    {
      eventName: "NSS Camp",
      shortDesc: "A camp to remember for the volunteers to learn and grow.",
      imageUrl: NSSCamp,
      link: "/eventdetails/nss-camp",
    },
    {
      eventName: "Stem Cell Donation Drive",
      shortDesc: "A drive to raise awareness about stem cell donation.",
      imageUrl: StemCell,
      link: "/eventdetails/stem-cell-donation-drive",
    },
    {
      eventName: "Annual Charity Drive",
      shortDesc: "A drive to collect clothes, books, and toys for the underprivileged.",
      imageUrl: ACD,
      link: "/eventdetails/annual-charity-drive",
    }
  ];

  return (
    <div className="mb-6">
      <h1 className="bg-white text-4xl font-bold text-center mx-4 text-dark-navy">
        Initiatives
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {data.map((event, index) => {
          return (
            <div
              key={index}
              className={`transform transition-transform ${
                index % 2 === 0 ? "mt-16" : "mt-0"
              }`}
            >
              <Card
                name={event.eventName}
                imageUrl={event.imageUrl}
                link={event.link}
                shortDesc={event.shortDesc}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Initiatives;
