import { AdminRoom } from "../../../Components/AdminRoom";
import { AdminCabinate } from "../../../Components/AdminCabinet";
import { AdminCabinetItem } from "../../../Components/AdminCabinetItem";
import { useState, useEffect } from "react";
import { getRoomData } from "../../../service/roomServices";
import { getCabinetData } from "../../../service/cabinetServices/cabinetServices";
import { addRoomData } from "../../../service/roomServices";
import { deleteRoom } from "../../../service/roomServices";
import { getCabinateItemData } from "../../../service/cabinateItemService/cabinateItemService";

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [adminCabinetData, setAdminCabinetData] = useState([]);
  const [selectedCabinetId, setSelectedCabinetId] = useState(null);
  const [adminCabinetItemData, setAdminCabinetItemData] = useState([]);
  console.log("**** adminCabinetItemData ********** ", adminCabinetItemData);
  const fetchRoomData = async () => {
    try {
      setIsLoading(true);
      const response = await getRoomData();
      const roomsData = response.data || [];
      setRooms(roomsData);

      // Set default selected room if none is selected
      if (!selectedRoomId && roomsData.length > 0) {
        setSelectedRoomId(roomsData[0]._id);
        handleRoomSelect(roomsData[0]._id);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoomSelect = async (roomId) => {
    setSelectedRoomId(roomId);
    try {
      const response = await getCabinetData(roomId);
      // Set the cabinet data in state to render it in AdminCabinet section
      setAdminCabinetData(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  const handleAddRoom = async () => {
    if (!newRoomName.trim()) return;

    try {
      setIsLoading(true);
      await addRoomData(newRoomName);
      setIsAddRoomModalOpen(false);
      setNewRoomName("");
      await fetchRoomData();
    } catch (err) {
      console.error("Error adding room:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      setIsLoading(true);
      await deleteRoom(roomId);
      await fetchRoomData(); // Refresh the room list after deletion
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCabinetSelect = async (cabinetId) => {
    setSelectedCabinetId(cabinetId);
    try {
      const response = await getCabinateItemData(cabinetId);
      setAdminCabinetItemData(response.data);
    } catch (error) {
      console.error("Error fetching cabinet items:", error);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-wrap justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 gap-4 overflow-y-auto ">
      <div className="h-[80vh] w-full sm:w-1/2 lg:w-1/3 flex-1 shadow-lg">
        <AdminRoom
          handleAddRoom={handleAddRoom}
          isAddRoomModalOpen={isAddRoomModalOpen}
          setIsAddRoomModalOpen={setIsAddRoomModalOpen}
          isLoading={isLoading}
          handleDeleteRoom={handleDeleteRoom}
          rooms={rooms}
          selectedRoomId={selectedRoomId}
          handleRoomSelect={handleRoomSelect}
        />
      </div>
      <div className="h-[80vh] w-full sm:w-1/2 lg:w-1/3 flex-1 shadow-lg">
        <AdminCabinate
          adminCabinetData={adminCabinetData}
          selectedRoomId={selectedRoomId}
          handleCabinetSelect={handleCabinetSelect}
          selectedCabinetId={selectedCabinetId}
          setSelectedCabinetId={setSelectedCabinetId}
        />
      </div>
      <div className="h-[80vh] w-full sm:w-1/2 lg:w-1/3 flex-1 shadow-lg">
        <AdminCabinetItem adminCabinetItemData={adminCabinetItemData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
