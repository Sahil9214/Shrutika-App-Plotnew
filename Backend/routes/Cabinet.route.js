import express from 'express';
import mongoose from 'mongoose';
import { Cabinet } from '../models/Cabinet.model.js';
import { Room } from '../models/Room.model.js';

const CabinetRouter = express.Router();

// Get Cabinet Request
CabinetRouter.get("/api/cabinet/get/:roomId", async (req, res) => {
    const { roomId } = req.params;
    try {
        const cabinetData = await Cabinet.find({ room: roomId });
        res.status(200).send({ data: cabinetData, message: "Cabinet data retrieval successful" });
    } catch (error) {
        console.error("Error fetching cabinet data:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Add Cabinet Request
CabinetRouter.post("/api/cabinet/add/:roomId", async (req, res) => {
    console.log("*** req.body ********** ", req.body);
    try {
        const { roomId, cabinetName } = req.body;
        console.log(roomId, cabinetName);
        if (!roomId || !cabinetName) {
            return res.status(400).send({ msg: "Room ID and cabinet name are required" });
        }
        const roomExists = await Room.findById(roomId);
        if (!roomExists) {
            return res.status(404).send({ msg: "Room not found" });
        }
        const newCabinet = new Cabinet({ room: roomId, cabinetName });
        await newCabinet.save();
        res.status(201).send({ data: newCabinet, message: "Cabinet added successfully" });
    } catch (error) {
        console.error("Error adding cabinet:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Delete Cabinet Request
CabinetRouter.delete("/api/cabinet/delete/:id", async (req, res) => {
    console.log("*** req.params ********** ", req);
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid cabinet ID" });
        }
        const cabinet = await Cabinet.findByIdAndDelete(id);
        if (!cabinet) {
            return res.status(404).send({ msg: "Cabinet not found" });
        }
        res.status(200).send({ data: cabinet, message: "Cabinet deleted successfully" });
    } catch (error) {
        console.error("Error deleting cabinet:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Patch Cabinet Request
CabinetRouter.patch("/api/cabinet/patch/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid cabinet ID" });
        }
        const updatedCabinet = await Cabinet.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCabinet) {
            return res.status(404).send({ msg: "Cabinet not found" });
        }
        res.status(200).send({ data: updatedCabinet, message: "Cabinet updated successfully" });
    } catch (error) {
        console.error("Error updating cabinet:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default CabinetRouter;