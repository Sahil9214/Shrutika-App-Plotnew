import { Trash2, PlusCircle, PenBox } from "lucide-react";

// Moved modal component outside
const AddRoomModal = ({
  isOpen,
  onClose,
  onAdd,
  newRoomName,
  setNewRoomName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Add New Room</h2>
        <input
          type="text"
          placeholder="Room Name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          autoFocus
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminRoom = ({
  handleAddRoom,
  isAddRoomModalOpen,
  setIsAddRoomModalOpen,
  isLoading,
  handleDeleteRoom,
  rooms,
  selectedRoomId,
  handleRoomSelect,
  newRoomName,
  setNewRoomName,
}) => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h1 className="text-xl font-bold mb-4 lg:mb-0">Room Management</h1>
          <button
            onClick={() => setIsAddRoomModalOpen(true)}
            className="flex items-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
            disabled={isLoading}
          >
            <PlusCircle className="mr-2" /> Add Room
          </button>
        </div>

        {/* Scrollable Rooms List */}
        <div className="space-y-4 max-h-[calc(80vh-10rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`flex w-[90%] mx-auto justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer
                ${
                  selectedRoomId === room._id
                    ? "ring-2 ring-green-500 bg-green-50"
                    : ""
                }`}
              onClick={() => handleRoomSelect(room._id)}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{room.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRoom(room._id);
                  }}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                  disabled={isLoading}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {!isLoading && rooms.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              <p>No rooms added yet. Click "Add Room" to get started.</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          )}
        </div>
      </div>

      {/* Add Room Modal */}
      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        onAdd={handleAddRoom}
        newRoomName={newRoomName}
        setNewRoomName={setNewRoomName}
      />
    </div>
  );
};

export { AdminRoom };