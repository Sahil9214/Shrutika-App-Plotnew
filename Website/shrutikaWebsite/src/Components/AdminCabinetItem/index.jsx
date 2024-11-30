/* eslint-disable react/prop-types */
import { Trash2, PlusCircle, Plus, Minus, X, PenBox } from "lucide-react";
import { useState, useEffect } from "react";
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  console.log("*** adminCabinetItemData ********** ", adminCabinetItemData);
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
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                      >
                        <PenBox size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm  justify-between">
                    <div className="flex items-center ">
                      <span className="text-gray-500">Quantity:</span>
                      <div className="flex items-center ">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          disabled={Number(item.quantity) <= 0}
                          className="text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors p-1"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="text-gray-600 hover:text-green-600 transition-colors p-1"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-500">Brand:</span>{" "}
                      {item.brand || "-"}
                    </div>
                    <div>
                      <span className="text-gray-500">Stock:</span> {item.stock}
                    </div>
                    <div>
                      <span className="text-gray-500">Catalogue:</span>{" "}
                      {item.catalogueNumber || "-"}
                    </div>
                    <div>
                      <span className="text-gray-500">PD:</span>{" "}
                      {new Date(item.dateOfPurchase).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-gray-500">ED:</span>{" "}
                      {item.expiryDate
                        ? new Date(item.expiryDate).toLocaleDateString()
                        : "-"}
                    </div>
                    {item.damage && (
                      <div>
                        <span className="text-gray-500">Damage:</span>{" "}
                        {item.damage}
                      </div>
                    )}
                  </div>
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

      {/* Add Edit Modal */}
      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
        }}
        item={editingItem}
        onItemUpdated={handleItemAdded}
      />
    </div>
  );
};

export { AdminCabinetItem };

const AddItemModal = ({ isOpen, onClose, selectedCabinetId, onItemAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    expiryDate: "",
    catalogueNumber: "",
    dateOfPurchase: "",
    brand: "",
    stock: "",
    damage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.quantity.trim()) return;

    try {
      setIsLoading(true);
      await addCabinateItem({
        ...formData,
        cabinetId: selectedCabinetId,
      });

      setFormData({
        title: "",
        quantity: "",
        expiryDate: "",
        catalogueNumber: "",
        dateOfPurchase: "",
        brand: "",
        stock: "",
        damage: "",
      });
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
      className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50 overflow-y-auto`}
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

        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter item title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity*
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter quantity"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catalogue Number
              </label>
              <input
                type="text"
                name="catalogueNumber"
                value={formData.catalogueNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter catalogue number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Purchase*
              </label>
              <input
                type="date"
                name="dateOfPurchase"
                value={formData.dateOfPurchase}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock*
              </label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter stock details"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Damage
              </label>
              <input
                type="text"
                name="damage"
                value={formData.damage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter damage details"
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

const EditItemModal = ({ isOpen, onClose, item, onItemUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    expiryDate: "",
    catalogueNumber: "",
    dateOfPurchase: "",
    brand: "",
    stock: "",
    damage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        quantity: item.quantity || "",
        expiryDate: item.expiryDate
          ? new Date(item.expiryDate).toISOString().split("T")[0]
          : "",
        catalogueNumber: item.catalogueNumber || "",
        dateOfPurchase: item.dateOfPurchase
          ? new Date(item.dateOfPurchase).toISOString().split("T")[0]
          : "",
        brand: item.brand || "",
        stock: item.stock || "",
        damage: item.damage || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.quantity.trim()) return;

    try {
      setIsLoading(true);
      await updateCabinateItem(item._id, formData);
      await onItemUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating cabinet item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50 overflow-y-auto`}
    >
      <div className="h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Edit Cabinet Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter item title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity*
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter quantity"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catalogue Number
              </label>
              <input
                type="text"
                name="catalogueNumber"
                value={formData.catalogueNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter catalogue number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Purchase*
              </label>
              <input
                type="date"
                name="dateOfPurchase"
                value={formData.dateOfPurchase}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock*
              </label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter stock details"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Damage
              </label>
              <input
                type="text"
                name="damage"
                value={formData.damage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter damage details"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
