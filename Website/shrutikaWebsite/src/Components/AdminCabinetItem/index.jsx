import { Trash2, PlusCircle, PenBox, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { updateCabinetItemQuantity } from "../../service/cabinateItemService/cabinateItemService";
const AdminCabinetItem = ({ adminCabinetItemData }) => {
  // TODO: Implement API call to update quantity
  //   console.log("Update quantity for item:", itemId, "change:", change);
  const handleQuantityChange = async (itemId, change) => {
    // try {
    //   const currentItem = adminCabinetItemData.find(
    //     (item) => item._id === itemId
    //   );
    //   const newQuantity = Math.max(0, Number(currentItem.quantity) + change);
    //   await updateCabinetItemQuantity(itemId, String(newQuantity));
    //   // Refresh the cabinet items data after update
    //   // You'll need to implement this refresh logic in the parent component
    // } catch (error) {
    //   console.error("Error updating quantity:", error);
    // }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
          <h1 className="text-xl font-bold mb-4 lg:mb-0">Cabinet Items</h1>
          <button className="flex items-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors">
            <PlusCircle className="mr-2" /> Add Item
          </button>
        </div>

        {/* Scrollable Items List */}
        <div className="space-y-4 max-h-[calc(80vh-10rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-4">
          {adminCabinetItemData && adminCabinetItemData?.length > 0 ? (
            adminCabinetItemData.map((item) => (
              <div
                key={item._id}
                className="flex w-[90%] mx-auto justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-sm text-gray-500">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        disabled={Number(item.quantity) <= 0}
                        className="text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors p-1"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-12 text-center font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="text-gray-600 hover:text-green-600 transition-colors p-1"
                        aria-label="Increase quantity"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange()}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                  >
                    <PenBox size={20} />
                  </button>
                  <button
                    onClick={() => handleQuantityChange()}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>
                No items found in this cabinet. Click "Add Item" to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { AdminCabinetItem };
