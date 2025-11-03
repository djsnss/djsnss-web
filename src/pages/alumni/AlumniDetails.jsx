import React from "react";
import { useParams } from "react-router-dom";
import alumni from "../../data/alumniData";

function AlumniDetails() {
  const { name } = useParams();
  const alumniDetail = alumni.find((alumni) => alumni.url.includes(name));

  if (!alumniDetail) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600">Alumni Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-blue flex flex-col items-center justify-start mx-auto pt-20">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 max-w-5xl w-full">
        {/* Image */}
        <img
          src={alumniDetail.image}
          alt={alumniDetail.name}
          className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-xl shadow-2xl border-2 border-tertiary-blue flex-shrink-0"
        />

        {/* Text Content Wrapper */}
        <div className="flex flex-col items-center justify-center sm:items-start text-center sm:text-left w-full sm:w-1/3 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold font-geist text-gray-800">
            {alumniDetail.name}
          </h1>
          <p className="text-xl sm:text-2xl text-black font-lateef mt-1">
            {alumniDetail.position}
          </p>

          {alumniDetail.linkedin && (
            <div className="mt-6">
              <a
                href={alumniDetail.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-tertiary-blue hover:text-dark-blue underline text-lg"
              >
                View LinkedIn Profile
              </a>
            </div>
          )}

        </div>
      </div>
      <div className="mt-4 w-full flex item-center justify-center">
        <p className="text-base text-tertiary-blue font-roboto leading-relaxed max-w-2xl px-4 py-2">
          {alumniDetail.details || "No details available."}
        </p>
      </div>
    </div>
  );
}

export default AlumniDetails;
