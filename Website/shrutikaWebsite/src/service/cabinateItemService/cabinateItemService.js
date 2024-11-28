import { httpRequest } from "../network";

const getCabinateItemData = (cabinateId) => {
    return httpRequest({
        method: "GET",
        url: `/api/cabinet-item/get/${cabinateId}`,
        body: null,
    })
}

export { getCabinateItemData };
