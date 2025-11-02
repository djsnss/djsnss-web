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
    <div className="flex flex-row md:flex-col items-center justify-center p-6 md:p-10 bg-secondary-blue min-h-screen">
      <div className="flex flex-row gap-2 pb-10 items-center md:items-start md:mr-10">
        <img
          src={alumniDetail.image}
          alt={alumniDetail.name}
          className="w-40 md:w-64 object-cover rounded-xl shadow-2xl border border-blue-600"
        />
        <div className="flex flex-col pl-20">
          <h1 className="text-2xl md:text-4xl font-bold font-geist mt-4 md:mt-6 text-gray-800 text-center md:text-left">
            {alumniDetail.name}
          </h1>
          <p className="text-lg md:text-4xl text-black font-lateef  text-center md:text-left">
            {alumniDetail.position}
          </p>
          {alumniDetail.linkedin && (
            <div className="flex justify-center font-roboto md:justify-start mt-8">
              <a
                href={alumniDetail.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View LinkedIn Profile
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 md:mt-0 md:ml-10 max-w-2xl">
        <p className="text-gray-700 text-left  md:text-left font-roboto leading-relaxed pl-3">
          {alumniDetail.details || "No details available."}
        </p>
      </div>
    </div>
  );
}

export default AlumniDetails;
