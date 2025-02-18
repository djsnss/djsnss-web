const FolderTree = () => {
    const folders = [
      { id: "12qa-XERk8JzCJ2X0ocF3O84fEfv4Sa6f", name: "NSS Data" },
      { id: "1sEtSeeYL-a0P1UCs_Kwl5thgbzIkAHCu", name: "NSS 2021-22" },
      { id: "1bzzElnbii_J72C8O71t96UIe9qnIVPSl", name: "NSS 2022-23" },
    ];
    https://drive.google.com/drive/folders/?usp=drive_link
    return (
      <div className="w-full p-4 font-poppins">
        <h1 className="flex mx-auto mb-2 py-4 h-max w-full justify-center items-center text-3xl md:text-7xl text-black">
          Drive Links
        </h1>
        
        <div className="space-y-8">
          {folders.map((folder, index) => (
            <div key={index} className="w-full h-max border rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-semibold mb-2">{folder.name}</h2>
              <iframe
                src={`https://drive.google.com/embeddedfolderview?id=${folder.id}#grid`}
                width="100%"
                height="450px"
                className="rounded-md"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FolderTree;
  