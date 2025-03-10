import React from "react";
import { useParams } from "react-router-dom";
import alumni from "../../data/alumniData";

function AlumniDetails() {
    const { name } = useParams();
    const alumniDetail = alumni.find((alumni) =>
        alumni.url.includes(name)
    );

    if (!alumniDetail) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <h1 className="text-4xl font-bold text-red-600">Alumni Not Found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-10 bg-gradient-to-br from-white to-blue-400 min-h-screen">
            <div className="flex flex-col items-center md:items-start md:mr-10">
                <img
                    src={alumniDetail.image}
                    alt={alumniDetail.name}
                    className="w-40 md:w-64  object-cover rounded-xl shadow-2xl border border-blue-600"
                />
                <h1 className="text-2xl md:text-4xl font-bold mt-4 md:mt-6 text-gray-800 text-center md:text-left">{alumniDetail.name}</h1>
                <p className="text-lg md:text-xl text-gray-500 mt-2 text-center md:text-left">{alumniDetail.position}</p>
            </div>
            <div className="mt-6 md:mt-0 md:ml-10 max-w-2xl">
                <p className="text-gray-700 text-center md:text-left leading-relaxed">
                    {alumniDetail.details || "No details available."}
                </p>
                {alumniDetail.linkedin && (
                    <div className="flex justify-center md:justify-start mt-4">
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
    );
}

export default AlumniDetails;
