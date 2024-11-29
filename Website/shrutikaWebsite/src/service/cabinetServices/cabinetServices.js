import { httpRequest } from "../network";

const getCabinetData = (roomId) => {
    return httpRequest({
        method: "GET",
        url: `/api/cabinet/get/${roomId}`,
        body: null,

    });
};
const addCabinetData = (payload) => {
    console.log("*** room id ********** ADD    CABIENT ", payload);

    return httpRequest({
        method: "POST",
        url: `/api/cabinet/add/${payload.roomId}`,
        body: payload,
    });
};
const deleteCabinateData = (id) => {
    return httpRequest({
        method: "DELETE",
        url: `/api/cabinet/delete/${id}`,
        body: null,
    });
};
const updateCabinateData = (id, title) => {
    console.log("*** id *** , id", id, title)
    return httpRequest({
        method: "PATCH",
        url: `/api/cabinet/patch/${id}`,
        body: title,
    });
};
export { getCabinetData, addCabinetData, deleteCabinateData, updateCabinateData };
