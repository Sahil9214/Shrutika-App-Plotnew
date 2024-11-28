import { httpRequest } from "../network";

const getCabinetData = (roomId) => {
    return httpRequest({
        method: "GET",
        url: `/api/room/get/${roomId}`,
        body: null,

    });
};

export { getCabinetData };
