import Card from "./Card";
import GrainAThon from "../../assets/Events/grainathon/GrainAThon.png";
import NSSCamp from "../../assets/Events/NSSCamp.jpg";
import BDD from "../../assets/Events/bdd/BDD.jpg";
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
      shortDesc: "Successful collection of 650+ blood bags for the needy.",
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
      eventName: "Stem Cell Donation",
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
    <div className="my-7">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
      <div className="flex flex-wrap justify-center gap-8">
        {data.map((event, index) => {
          return (
            <div
              key={index}
              className={`transform transition-transform ${
                index % 2 === 0 ? "xl:mt-16" : "xl:mt-0"
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
