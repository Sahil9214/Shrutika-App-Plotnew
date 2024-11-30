/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Trash2, PlusCircle, PenBox, X } from "lucide-react";
import {
  addCabinetData,
  deleteCabinateData,
  updateCabinateData,
} from "../../service/cabinetServices/cabinetServices";

const AdminCabinate = ({
  adminCabinetData,
  selectedRoomId,
  handleCabinetSelect,
  selectedCabinetId,
  setSelectedCabinetId,
  refreshCabinetData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCabinet, setEditingCabinet] = useState(null);

  const handleModalSuccess = async () => {
    if (selectedRoomId) {
      await refreshCabinetData(selectedRoomId);
    }
  };

  const handleEditClick = (e, cabinet) => {
    e.stopPropagation();
    setEditingCabinet(cabinet);
    setIsEditModalOpen(true);
  };

  const handleDeleteCabinet = async (id) => {
    try {
      await deleteCabinateData(id);
      if (selectedRoomId) {
        await refreshCabinetData(selectedRoomId);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (adminCabinetData?.length > 0 && !selectedCabinetId) {
      handleCabinetSelect(adminCabinetData[0]._id);
      setSelectedCabinetId(adminCabinetData[0]._id);
    }
  }, [
    adminCabinetData,
    selectedCabinetId,
    handleCabinetSelect,
    setSelectedCabinetId,
  ]);

  if (!selectedRoomId) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Please select a room to view its cabinets
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm sm:text-base md:text-base lg:text-base font-bold mb-4 lg:mb-0">
            Cabinet Management
          </h2>
          <button
            className="text-sm sm:text-base md:text-base lg:text-sm flex items-center bg-green-500 text-white  px-2 py-2 rounded hover:bg-green-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircle className="mr-2" /> Add Cabinet
          </button>
        </div>

        {/* Scrollable Cabinet List */}
        <div className="space-y-4 max-h-[calc(80vh-10rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-4">
          {adminCabinetData && adminCabinetData.length > 0 ? (
            adminCabinetData.map((cabinet) => (
              <div
                key={cabinet._id}
                className={`flex w-[90%] mx-auto justify-between items-center bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
                  ${
                    selectedCabinetId === cabinet._id
                      ? "ring-2 ring-green-500 bg-green-50"
                      : ""
                  }`}
                onClick={() => {
                  handleCabinetSelect(cabinet._id);
                  setSelectedCabinetId(cabinet._id);
                }}
              >
                <span className="font-medium">{cabinet.cabinetName}</span>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                    onClick={(e) => handleEditClick(e, cabinet)}
                  >
                    <PenBox size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                    onClick={() => {
                      handleDeleteCabinet(cabinet._id);
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No cabinets found in this room</p>
            </div>
          )}
        </div>

        {/* Add Cabinet Modal */}
        <AddCabinetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedRoomId={selectedRoomId}
          onSuccess={handleModalSuccess} // Add this prop
        />

        {/* Add the EditCabinetModal */}
        {editingCabinet && (
          <EditCabinetModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingCabinet(null);
            }}
            cabinet={editingCabinet}
            onSuccess={async () => {
              await refreshCabinetData(selectedRoomId);
            }}
          />
        )}
      </div>
    </div>
  );
};

export { AdminCabinate };

// Centered Modal Component
const AddCabinetModal = ({ isOpen, onClose, selectedRoomId, onSuccess }) => {
  const [cabinetName, setCabinetName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cabinetName.trim()) return;

    try {
      setIsLoading(true);
      await addCabinetData({
        roomId: selectedRoomId,
        cabinetName: cabinetName.trim(),
      });

      // Reset form and close modal
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding cabinet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Cabinet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cabinet Title
              </label>
              <input
                type="text"
                value={cabinetName}
                onChange={(e) => setCabinetName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter cabinet title"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Cabinet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add EditCabinetModal component
const EditCabinetModal = ({ isOpen, onClose, cabinet, onSuccess }) => {
  const [cabinetName, setCabinetName] = useState(cabinet?.cabinetName || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cabinetName.trim()) return;

    try {
      setIsLoading(true);
      await updateCabinateData(cabinet._id, {
        cabinetName: cabinetName.trim(),
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating cabinet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Cabinet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cabinet Title
              </label>
              <input
                type="text"
                value={cabinetName}
                onChange={(e) => setCabinetName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter cabinet title"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Cabinet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
