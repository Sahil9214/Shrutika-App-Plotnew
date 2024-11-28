/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getRoomData } from "../../service/roomServices";
const Room = () => {
  console.log("**** hello ***");
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await getRoomData();
        console.log("*** response ****", response);
        setRoomData(response.data);
      } catch (err) {
        console.error("Error fetching room data:", err);
      }
    };

    fetchRoomData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BeautifulRoomGrid roomsData={roomData} />
    </div>
  );
};

export default Room;

function BeautifulRoomGrid({ roomsData }) {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {roomsData &&
          roomsData?.map((room, _) => (
            <a
              style={{
                background: "rgba(252,176,69,1)",
              }}
              key={room._id}
              href={`/room/${room._id}`}
              className={`block aspect-square
              rounded-xl shadow-md hover:shadow-lg
              transition-all duration-300
              group overflow-hidden
              max-w-[300px] mx-auto w-full`}
            >
              <div className="w-full h-full flex items-center justify-center  group-hover:bg-opacity-20 transition-all duration-300">
                <h2 className="text-white text-2xl md:text-3xl font-bold transform group-hover:scale-110 transition-transform duration-300">
                  {room.title}
                </h2>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
}
