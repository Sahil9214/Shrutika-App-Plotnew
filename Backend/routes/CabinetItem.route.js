import express from 'express';
import { Router } from 'express';
import mongoose from 'mongoose';
import { CabinateItem } from '../models/CabinateItem.models.js';
const CabinetItemRouter = Router();

// Get Cabinet Item Request
CabinetItemRouter.get("/api/cabinet-item/get/:cabinetId", async (req, res) => {
    const { cabinetId } = req.params;
    try {
        const cabinetItemData = await CabinateItem.find({ cabinetId });
        res.status(200).send({ data: cabinetItemData, message: "Cabinet item data retrieval successful" });
    } catch (error) {
        console.error("Error fetching cabinet item data:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Add Cabinet Item Request
CabinetItemRouter.post("/api/cabinet-item/add", async (req, res) => {
    try {
        const {
            cabinetId,
            title,
            quantity,
            expiryDate,
            catalogueNumber,
            dateOfPurchase,
            brand,
            stock,
            damage
        } = req.body;

        // Validate required fields
        if (!cabinetId || !title || !quantity || !dateOfPurchase || !stock) {
            return res.status(400).send({
                msg: "Cabinet ID, title, quantity, date of purchase, and stock are required"
            });
        }

        const newCabinetItem = new CabinateItem({
            cabinetId,
            title,
            quantity,
            expiryDate,
            catalogueNumber,
            dateOfPurchase,
            brand,
            stock,
            damage
        });

        await newCabinetItem.save();
        res.status(201).send({ data: newCabinetItem, message: "Cabinet item added successfully" });
    } catch (error) {
        console.error("Error adding cabinet item:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Delete Cabinet Item Request
CabinetItemRouter.delete("/api/cabinet-item/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid cabinet item ID" });
        }
        const cabinetItem = await CabinateItem.findByIdAndDelete(id);
        if (!cabinetItem) {
            return res.status(404).send({ msg: "Cabinet item not found" });
        }
        res.status(200).send({ data: cabinetItem, message: "Cabinet item deleted successfully" });
    } catch (error) {
        console.error("Error deleting cabinet item:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

// Patch Cabinet Item Request
CabinetItemRouter.patch("/api/cabinet-item/patch/:id", async (req, res) => {
    console.log("patch request received", req.params.id);
    console.log("patch request body", req.body);
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ msg: "Invalid cabinet item ID" });
        }
        const updatedCabinetItem = await CabinateItem.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCabinetItem) {
            return res.status(404).send({ msg: "Cabinet item not found" });
        }
        res.status(200).send({ data: updatedCabinetItem, message: "Cabinet item updated successfully" });
    } catch (error) {
        console.error("Error updating cabinet item:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});

export default CabinetItemRouter;