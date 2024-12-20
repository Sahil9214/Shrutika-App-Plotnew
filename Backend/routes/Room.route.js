import { Router } from "express";
import mongoose from "mongoose";
import { Room } from "../models/Room.model.js";

const RoomRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: Name of the room
 */

/**
 * @swagger
 * /api/room/get:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of all rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Room'
 *                 message:
 *                   type: string
 *                 status:
 *                   type: boolean
 */

/**
 * @swagger
 * /api/room/add:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created successfully
 *       400:
 *         description: Title is required
 */

/**
 * @swagger
 * /api/room/delete/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       400:
 *         description: Invalid room ID
 *       404:
 *         description: Room not found
 *       500:
 *         description: Server error
 */
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
    console.log("*** DeleteId ********** ", req.params.id);
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid room ID" });
        }
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).send({ msg: "Room not found" });
        }
        res.status(200).send({ data: room, message: "Room successfully removed" });
    } catch (error) {
        console.error("Error removing room:", error);
        res.status(500).send({ message: "An error occurred" });
    }
});

//Patch Request
RoomRouter.patch("/api/room/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const findRoom = await Room.findByIdAndUpdate(id, { title }, { new: true });
        res.status(200).send({ data: findRoom, message: "Room updated successfully" });
    }
    catch (error) {
        console.error("Error updating room:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default RoomRouter;