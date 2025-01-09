import React from "react";
import GenerateCertificate from "../components/events/GenerateCertificate";
import LargeEvents from "../components/events/LargeEvents";
import LocalEvents from "../components/events/LocalEvents";
import UniversityEvents from "../components/events/UniversityEvents";
import { MapPin, CalendarDays } from "lucide-react";
import Pic from "../assets/Core.jpg";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";

const Events = () => {
  return (
    <div className="h-max w-full font-poppins scroll-smooth">
      <h1 className="flex mx-auto my-2 h-max w-full justify-center items-center text-[6vw] text-white">
        EVENTS
      </h1>

      <div className="h-[60vh] sm:h-[80vh] w-full px-4 mt-12 mb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Upcoming Events :-
        </h1>

        <CCarousel controls indicators>
          <CCarouselItem>
            <CImage
              className="d-block w-100 rounded-lg h-[50vh] sm:h-[60vh] bg-center object-cover"
              src={Pic}
              alt="NSS"
            />
            <CCarouselCaption className="text-shadow p-4 bg-white/60 rounded-lg">
              <h5
                // onClick={() => navigate(`/eventdetails/${event.slug}`)}
                className="text-black text-base sm:text-xl font-bold cursor-pointer mb-2"
              >
                DJS NSS
              </h5>
              <p className="text-black text-xs sm:text-sm">Desc</p>
              <div className="flex justify-center text-xs sm:text-sm text-black">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Loc</span>
              </div>
              <div className="mt-2 flex justify-center text-xs sm:text-sm  text-black">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>Date</span>
              </div>
            </CCarouselCaption>
          </CCarouselItem>
        </CCarousel>
      </div>

      <LargeEvents />

      <GenerateCertificate />

      <LocalEvents />

      <UniversityEvents />
    </div>
  );
};

export default Events;
