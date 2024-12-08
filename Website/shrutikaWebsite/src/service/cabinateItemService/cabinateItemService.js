import { httpRequest } from "../network";

const getCabinateItemData = (cabinateId) => {
    return httpRequest({
        method: "GET",
        url: `/api/cabinet-item/get/${cabinateId}`,
        body: null,
    })
}

const updateCabinateItem = (itemId, data) => {
    return httpRequest({
        method: "PATCH",
        url: `/api/cabinet-item/patch/${itemId}`,
        body: data
    });
};

const addCabinateItem = (data) => {
    return httpRequest({
        method: "POST",
        url: "/api/cabinet-item/add",
        body: data
    });
};

const deleteCabinateItem = (itemId) => {
    return httpRequest({
        method: "DELETE",
        url: `/api/cabinet-item/delete/${itemId}`
    });
};

export { 
    getCabinateItemData, 
    addCabinateItem, 
    updateCabinateItem, 
    deleteCabinateItem 
};
