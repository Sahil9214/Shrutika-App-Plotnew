import { useEffect } from "react";
import { Trash2, PlusCircle, PenBox } from "lucide-react";

const AdminCabinate = ({
  adminCabinetData,
  selectedRoomId,
  handleCabinetSelect,
  selectedCabinetId,
  setSelectedCabinetId,
}) => {
  // Set default selected cabinet when cabinet data changes
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
          <h2 className="text-xl font-bold">Cabinet Management</h2>
          <button className="flex items-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add edit functionality here
                    }}
                  >
                    <PenBox size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add delete functionality here
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
      </div>
    </div>
  );
};

export { AdminCabinate };
