import { httpRequest } from "../network";
const getRoomData = () => {
  return httpRequest({
    method: "GET",
    url: "/api/room/get",
    body: null,
    params: null,
  });
};
const addRoomData = () => {
  return httpRequest({
    method: "POST",
    url: "/api/room/add",
    body: { title },
  });
};

export { getRoomData, addRoomData };
