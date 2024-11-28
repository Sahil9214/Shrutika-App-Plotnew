import { Router } from "express";
import mongoose from "mongoose";
import { Room } from "../models/Room.model.js";

const RoomRouter = Router();

// Get Room Data
RoomRouter.get("/api/room/get", async (req, res) => {
    try {
        const roomData = await Room.find();
        res.status(200).send({ data: roomData, message: "Room data retrieval successful", status: true });
    } catch (error) {
        console.error("Error fetching room data:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Add Room
RoomRouter.post("/api/room/add", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send({ msg: "Title is required" });
        }
        const newRoom = new Room({ title });
        await newRoom.save();
        res.status(201).send({ data: newRoom, message: "Room added successfully" });
    } catch (error) {
        console.error("Error adding room:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Delete Room
RoomRouter.delete("/api/room/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid room ID" });
        }
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).send({ msg: "Room not found" });
        }
        res.status(200).send({ data: room, message: "Room deleted successfully" });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default RoomRouter;