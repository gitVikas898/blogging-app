const SkeletonUserCard = () => {
    return (
      <div className="p-6 flex flex-col items-center bg-white rounded-xl text-center gap-4 animate-pulse">
  
        {/* Avatar Placeholder */}
        <div className="w-24 h-24 rounded-full bg-gray-300"></div>
  
        {/* Info Placeholder */}
        <div className="w-full flex items-center flex-col gap-3">
          <div className="w-40 h-6 bg-gray-300 rounded"></div> {/* username */}
          <div className="w-24 h-8 bg-gray-300 rounded-md"></div> {/* Follow button */}
          <div className="w-48 h-4 bg-gray-300 rounded"></div> {/* followers */}
          <div className="w-56 h-4 bg-gray-300 rounded"></div> {/* email */}
          <div className="w-52 h-4 bg-gray-300 rounded"></div> {/* joined date */}
          <div className="w-60 h-4 bg-gray-300 rounded"></div> {/* interests */}
          <div className="w-64 h-4 bg-gray-300 rounded"></div> {/* bio */}
  
          <div className="mt-4 w-full">
            <div className="h-4 w-32 bg-gray-300 rounded mb-2 mx-auto"></div> {/* blog heading */}
            <div className="grid gap-2">
              <div className="w-48 h-3 bg-gray-300 rounded mx-auto"></div>
              <div className="w-44 h-3 bg-gray-300 rounded mx-auto"></div>
              <div className="w-40 h-3 bg-gray-300 rounded mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SkeletonUserCard;
  