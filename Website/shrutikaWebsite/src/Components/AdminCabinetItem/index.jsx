/* eslint-disable react/prop-types */
import { Trash2, PlusCircle, Plus, Minus, X } from "lucide-react";
import { useState } from "react";
import {
  addCabinateItem,
  updateCabinateItem,
  deleteCabinateItem,
} from "../../service/cabinateItemService/cabinateItemService";

// Slide-in Modal Component

const AdminCabinetItem = ({
  adminCabinetItemData,
  selectedCabinetId,
  refreshCabinetItems, // Add this prop for refreshing the list
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuantityChange = async (itemId, change) => {
    try {
      const currentItem = adminCabinetItemData.find(
        (item) => item._id === itemId
      );
      const newQuantity = Math.max(0, Number(currentItem.quantity) + change);

      await updateCabinateItem(itemId, {
        quantity: String(newQuantity),
      });

      // Refresh the list after updating
      await refreshCabinetItems(selectedCabinetId);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCabinateItem(itemId);
      await refreshCabinetItems(selectedCabinetId);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleItemAdded = async () => {
    await refreshCabinetItems(selectedCabinetId);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold">Cabinet Items</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition-colors"
        >
          <PlusCircle className="mr-2" /> Add Item
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {adminCabinetItemData && adminCabinetItemData?.length > 0 ? (
            adminCabinetItemData.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-100 p-4 rounded-lg"
              >
                <div className="w-full sm:w-auto">
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
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleDeleteItem(item._id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                No items found in this cabinet. Click &quot;Add &quot;Item to
                get started.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCabinetId={selectedCabinetId}
        onItemAdded={handleItemAdded}
      />
    </div>
  );
};

export { AdminCabinetItem };

const AddItemModal = ({ isOpen, onClose, selectedCabinetId, onItemAdded }) => {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !quantity.trim()) return;

    try {
      setIsLoading(true);
      await addCabinateItem({
        cabinetId: selectedCabinetId,
        title: title.trim(),
        quantity: quantity.trim(),
      });

      setTitle("");
      setQuantity("");
      await onItemAdded();
      onClose();
    } catch (error) {
      console.error("Error adding cabinet item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Cabinet Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter item title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter quantity"
                min="0"
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
              {isLoading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
