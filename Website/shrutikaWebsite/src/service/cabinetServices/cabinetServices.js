import { httpRequest } from "../network";

const getCabinetData = (roomId) => {
    return httpRequest({
        method: "GET",
        url: `/api/cabinet/get/${roomId}`,
        body: null,

    });
};

export { getCabinetData };
