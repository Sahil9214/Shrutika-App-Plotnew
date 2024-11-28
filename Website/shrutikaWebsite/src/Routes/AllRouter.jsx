import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login/Login.jsx";
import Room from "../Pages/Room/Room.jsx";
import RoomID from "../Pages/RoomId/RoomID.jsx";
import { Cabinate } from "../Pages/Cabinate/Cabinate.jsx";

const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/room" element={<Room />} />
      <Route path="/room/:id" element={<RoomID />} />
      <Route path="/cabinate/:id" element={<Cabinate />} />
    </Routes>
  );
};

export default AllRouter;
