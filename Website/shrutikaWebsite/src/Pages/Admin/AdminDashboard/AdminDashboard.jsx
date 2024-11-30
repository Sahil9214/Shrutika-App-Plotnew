import { AdminRoom } from "../../../Components/AdminRoom";
import { AdminCabinate } from "../../../Components/AdminCabinet";
import { AdminCabinetItem } from "../../../Components/AdminCabinetItem";
import { useState, useEffect } from "react";
import { getRoomData } from "../../../service/roomServices";
import { getCabinetData } from "../../../service/cabinetServices/cabinetServices";
import { addRoomData, updateRoom } from "../../../service/roomServices";
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

  // for Room API DATA
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
      console.log("*** response ********** ", response.data);
      setAdminCabinetData(response.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };
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
  const handleUpdateRoom = async (roomId, newName) => {
    try {
      await updateRoom(roomId, newName);
      await fetchRoomData();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };
  //  HANDLE THE ADMINCABINETITEM
  const handleCabinetSelect = async (cabinetId) => {
    setSelectedCabinetId(cabinetId);
    try {
      const response = await getCabinateItemData(cabinetId);
      setAdminCabinetItemData(response.data);
    } catch (error) {
      console.error("Error fetching cabinet items:", error);
    }
  };
  const refreshCabinetData = async (roomId) => {
    try {
      const response = await getCabinetData(roomId);
      setAdminCabinetData(response.data);
    } catch (error) {
      console.error("Error refreshing cabinet data:", error);
    }
  };

  const refreshCabinetItems = async (cabinetId) => {
    try {
      const response = await getCabinateItemData(cabinetId);
      setAdminCabinetItemData(response.data);
    } catch (error) {
      console.error("Error refreshing cabinet items:", error);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1920px] mx-auto">
        <div className="min-h-[500px] md:h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg">
          <AdminRoom
            handleAddRoom={handleAddRoom}
            isAddRoomModalOpen={isAddRoomModalOpen}
            setIsAddRoomModalOpen={setIsAddRoomModalOpen}
            isLoading={isLoading}
            handleDeleteRoom={handleDeleteRoom}
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            handleRoomSelect={handleRoomSelect}
            handleUpdateRoom={handleUpdateRoom}
          />
        </div>
        <div className="min-h-[500px] md:h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg">
          <AdminCabinate
            adminCabinetData={adminCabinetData}
            selectedRoomId={selectedRoomId}
            handleCabinetSelect={handleCabinetSelect}
            selectedCabinetId={selectedCabinetId}
            setSelectedCabinetId={setSelectedCabinetId}
            refreshCabinetData={refreshCabinetData}
          />
        </div>
        <div className="min-h-[500px] md:h-[calc(100vh-120px)] bg-white rounded-lg shadow-lg">
          <AdminCabinetItem
            adminCabinetItemData={adminCabinetItemData}
            selectedCabinetId={selectedCabinetId}
            refreshCabinetItems={refreshCabinetItems}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
