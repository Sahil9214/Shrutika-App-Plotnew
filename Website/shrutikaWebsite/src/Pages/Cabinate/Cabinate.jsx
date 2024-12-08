import { useParams } from "react-router-dom";
import { getCabinateItemData } from "../../service/cabinateItemService/cabinateItemService";
import { useEffect, useState } from "react";

const Cabinate = () => {
  const [cabinateItemData, setCabinateItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCabinateItemData = async () => {
      try {
        const response = await getCabinateItemData(id);
        setCabinateItemData(response.data);
      } catch (error) {
        console.error("Error fetching cabinet item data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCabinateItemData();
    }
  }, [id]);

  const handleQuantityChange = async (itemId, change) => {
    // Here you would typically make your API call to update the quantity
    // For now, we'll just update the local state
    setCabinateItemData((prevData) =>
      prevData.map((item) =>
        item._id === itemId
          ? { ...item, quantity: String(Number(item.quantity) + change) }
          : item
      )
    );
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-500">Loading cabinet items...</div>
        </div>
      </div>
    );
  }

  if (!cabinateItemData || cabinateItemData.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Items Found
          </h3>
          <p className="text-gray-500 mb-6">
            There are no items added to this cabinet yet.
          </p>
          {/* You can add an "Add Item" button here if needed */}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cabinet Items</h1>
      <div className="space-y-4">
        {cabinateItemData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={Number(item.quantity) <= 0}
                    className="text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors p-1"
                    aria-label="Decrease quantity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-medium text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="text-gray-600 hover:text-green-600 transition-colors p-1"
                    aria-label="Increase quantity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Cabinate };
