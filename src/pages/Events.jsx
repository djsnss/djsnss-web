import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateCertificate from "../components/events/generateCertificate";
import LargeEvents from "../components/events/LargeEvents";
import { MapPin, CalendarDays } from "lucide-react";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import CustomLoader2 from "../components/Loaders/CustomLoader2";
import AllPastEvents from "../components/events/AllPastEvents";
import UpcomingEvents from "../components/events/UpcomingEvents";

const Events = () => {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col items-center pt-20">
      <h1 className="mx-auto mb-6 py-4 text-center text-3xl md:text-6xl font-bold text-black">
        EVENTS
      </h1>

      {/* Event Sections */}
      <div className="w-full flex flex-col gap-6">
        <UpcomingEvents />
        <LargeEvents />
        <GenerateCertificate />
        <AllPastEvents />
      </div>
    </div>
  );
};

export default Events;
