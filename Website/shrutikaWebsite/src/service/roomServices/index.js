import { httpRequest } from "../network";
const getRoomData = () => {
  return httpRequest({
    method: "GET",
    url: "/api/room/get",
    body: null,
    params: null,
  });
};
const addRoomData = (title) => {
  return httpRequest({
    method: "POST",
    url: "/api/room/add",
    body: { title },
  });
};
const deleteRoom = (id) => {
  console.log("*** DeleteId ********** ", id);
  return httpRequest({
    method: "DELETE",
    url: `/api/room/delete/${id}`,
    body: null,
    params: null,
  });
};
const updateRoom = (id, title) => {

  return httpRequest({
    method: "PATCH",
    url: `/api/room/update/${id}`,
    body: { title },
  });
};
export { getRoomData, addRoomData, deleteRoom, updateRoom };


