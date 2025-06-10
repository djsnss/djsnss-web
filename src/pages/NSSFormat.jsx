import React from 'react'

const NSSFormat = () => {
  const folders = [
    { id: "1Vv4QxMRkkRicvYI6m2n6BfRBQry4RIcb", name: "" },
  ]; 
  
  return (
    <div className="w-full p-4 font-poppins pt-16">
      <h1 className="flex mx-auto mb-2 py-4 h-max w-full justify-center items-center text-3xl md:text-7xl text-black">
        NSS Format
      </h1>

      <div className="space-y-8 px-4 md:px-8 lg:px-16">
        {folders.map((folder, index) => (
          <div
            key={index}
            className="w-full h-max border border-gray-300 rounded-2xl shadow-xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold font-montserrat text-gray-800 mb-4">
              {folder.name}
            </h2>
            <iframe
              src={`https://drive.google.com/embeddedfolderview?id=${folder.id}#grid`}
              width="100%"
              height="450px"
              className="rounded-lg border border-gray-200 shadow-md"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NSSFormat
