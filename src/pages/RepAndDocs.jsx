import React, { useState } from 'react';
import RepData from '../data/ReportData';

const RepAndDocs = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleYearClick = (year) => {
        setSelectedYear(year);
        setSelectedDoc(null);
    };

    const handleDocClick = (doc) => {
        setSelectedDoc(doc);
    };

    return (
        <div className="container mx-auto p-4 pt-20">
            <h1 className="text-3xl font-bold mb-4">Reports and Documents</h1>
            <div className="flex flex-wrap">
                {Object.keys(documents).map((year) => (
                    <div key={year} className="w-full md:w-1/2 lg:w-1/4 p-2">
                        <button
                            onClick={() => handleYearClick(year)}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            {year}
                        </button>
                        {selectedYear === year && (
                            <div className="mt-2">
                                {documents[year].map((doc, index) => (
                                    <div key={index} className="mt-2">
                                        <button
                                            onClick={() => handleDocClick(doc)}
                                            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                                        >
                                            {doc.title}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedDoc && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-2">{selectedDoc.title}</h2>
                    <iframe
                        src={selectedDoc.url}
                        width="600"
                        height="400"
                        title={selectedDoc.title}
                        className="w-full border rounded"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default RepAndDocs;