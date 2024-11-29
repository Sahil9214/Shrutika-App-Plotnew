import { httpRequest } from "../network";

const getCabinateItemData = (cabinateId) => {
    return httpRequest({
        method: "GET",
        url: `/api/cabinet-item/get/${cabinateId}`,
        body: null,
    })
}

const updateCabinetItemQuantity = (itemId, quantity) => {
  return httpRequest({
    method: "PATCH",
    url: `/api/cabinet-item/patch/${itemId}`,
    body: { quantity: String(quantity) },
  });
};

export { getCabinateItemData, updateCabinetItemQuantity };
